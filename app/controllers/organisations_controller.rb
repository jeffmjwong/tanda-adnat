class OrganisationsController < ApplicationController
  skip_before_action :verify_authenticity_token, except: :show

  before_action :check_user
  before_action :set_organisation, only: %i[show update destroy]

  def show; end

  def create
    organisation = Organisation.create!(organisation_params)

    OrganisationMembership.create!(organisation_id: organisation.id, user_id: current_user.id)

    render json: { organisation: organisation, user_organisations: current_user.organisations }
  rescue => error
    render json: { errors: error.message }
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

  def leave
    organisation_membership = OrganisationMembership.find_by(
      organisation_id: params[:id],
      user_id: current_user.id
    )

    if organisation_membership.destroy
      render json: { user_organisations: current_user.organisations }
    else
      render json: { errors: organisation_membership.errors.full_messages }
    end
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
