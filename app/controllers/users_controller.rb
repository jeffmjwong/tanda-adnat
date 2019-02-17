class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[join_organisation leave_organisation]

  before_action :check_user

  def join_organisation
    organisation_params = params.permit(:organisation_id)

    if current_user.update(organisation_params)
      render json: { organisation: current_user.organisation }
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  def leave_organisation
    organisation_params = params.permit(:organisation_id)

    if current_user.update(organisation_params)
      head :ok
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  private

  def check_user
    return redirect_to(new_user_session_path) if current_user.blank?
  end
end
