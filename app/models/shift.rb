class Shift < ApplicationRecord
  belongs_to :user
  belongs_to :organisation

  validates_presence_of :user, :organisation, :start, :finish

  validates :break_length,
            numericality: {
              greater_than_or_equal_to: 0,
              message: 'must be greater than or equal to 0!'
            }

  validate :finish_cannot_be_earlier_than_start

  scope :for_organisation, ->(id) { where(organisation_id: id).order('start DESC').map(&:format_hash) }

  scope :filter_by_date, lambda { |from_date:, to_date:|
    where('start > :from AND start < :to', from: from_date, to: to_date)
  }

  def format_hash
    {
      id: id,
      employee_name: user.name,
      shift_date: start.strftime('%d/%m/%Y'),
      start_time: start.strftime('%I:%M%P'),
      finish_time: finish.strftime('%I:%M%P'),
      break_length: break_length,
      hours_worked: total_hours_worked,
      shift_cost: shift_cost
    }
  end

  def total_hours_worked
    seconds_in_minute = 60
    minutes_in_hour = 60

    shift_length_in_minutes = (finish - start) / seconds_in_minute

    ((shift_length_in_minutes - break_length) / minutes_in_hour).round(2)
  end

  def detailed_hours_worked
    hours_worked = total_hours_worked

    return { normal: hours_worked, sunday: 0 } if !start.sunday? && !finish.sunday?

    hours_to_midnight = (start.next_day.midnight - start) / 3600

    if start.sunday?
      return { normal: 0, sunday: hours_worked } if hours_worked < hours_to_midnight

      { normal: hours_worked - hours_to_midnight, sunday: hours_to_midnight }
    else
      return { normal: hours_worked, sunday: 0 } if hours_worked < hours_to_midnight

      { normal: hours_to_midnight, sunday: hours_worked - hours_to_midnight }
    end
  end

  def shift_cost
    normal_hourly_rate = organisation.hourly_rate
    sunday_hourly_rate = normal_hourly_rate * 2

    hours = detailed_hours_worked
    total_cost = hours[:normal] * normal_hourly_rate + hours[:sunday] * sunday_hourly_rate

    format('$%.2f', total_cost)
  end

  private

  def finish_cannot_be_earlier_than_start
    errors.add(:finish, "can't be earlier than start time!") if finish < start
  end
end
