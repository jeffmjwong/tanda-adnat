class OrganisationsController < ApplicationController
  skip_before_action :verify_authenticity_token, except: %i[show shifts]

  before_action :check_user
  before_action :set_organisation, only: %i[show update destroy shifts]

  def show; end

  def create
    organisation = Organisation.new(organisation_params)

    if organisation.save
      current_user.update!(organisation: organisation)
      render json: { organisation: current_user.organisation }
    else
      render json: { errors: organisation.errors.full_messages }
    end
  end

  def update
    if @organisation.update(organisation_params)
      head :ok
    else
      render json: { errors: @organisation.errors.full_messages }
    end
  end

  def destroy
    if @organisation.destroy
      head :ok
    else
      render json: { errors: @organisation.errors.full_messages }
    end
  end

  def join
    organisation_membership = OrganisationMembership.find_or_initialize_by(
      organisation_id: params[:id],
      user_id: current_user.id
    )

    return render json: { errors: 'Already joined organisation!' } if organisation_membership.persisted?

    if organisation_membership.save
      render json: { user_organisations: current_user.organisations }
    else
      render json: { errors: organisation_membership.errors.full_messages }
    end
  end

  def shifts
    @shifts = Shift.by_organisation(params[:id])
  end

  private

  def check_user
    return redirect_to(new_user_session_path) if current_user.blank?
  end

  def set_organisation
    @organisation = Organisation.find(params[:id])
  end

  def organisation_params
    params.permit(:name, :hourly_rate)
  end
end
