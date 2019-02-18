class ShiftsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :check_user

  def create
    shift = Shift.new(shift_params)

    if shift.save
      render json: { shifts: Shift.by_organisation(params[:organisation_id]) }
    else
      render json: { errors: shift.errors.full_messages }
    end
  rescue => error
    render json: { errors: error.message }
  end

  def destroy
    shift = Shift.find(params[:id])

    if shift.destroy
      head :ok
    else
      render json: { errors: shift.errors.full_messages }
    end
  end

  def filter
    shifts = Shift.filter_by_date(
      from_date: Time.zone.parse(params[:filter_from]),
      to_date: Time.zone.parse(params[:filter_to]).next_day
    ).by_organisation(params[:organisation_id])

    render json: { shifts: shifts }
  rescue ArgumentError
    render json: { shifts: [] }
  end

  private

  def check_user
    return redirect_to(new_user_session_path) if current_user.blank?
  end

  def shift_params
    if start_date_time.blank? || finish_date_time.blank?
      raise(InvalidDateError, 'Date format is invalid or incomplete!')
    end

    params.permit(:break_length).merge(
      start: start_date_time,
      finish: finish_date_time,
      user_id: current_user.id
    )
  end

  def start_date_time
    Time.zone.parse("#{params[:shift_date]} #{params[:start_time]}")
  end

  def finish_date_time
    finish_time = Time.zone.parse("#{params[:shift_date]} #{params[:finish_time]}")

    if finish_time < start_date_time
      next_day = Time.zone.parse(params[:shift_date]).next_day.strftime('%d/%m/%Y')
      Time.zone.parse("#{next_day} #{params[:finish_time]}")
    else
      finish_time
    end
  end
end

class InvalidDateError < StandardError; end
