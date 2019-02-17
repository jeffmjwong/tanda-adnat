class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, except: %i[show]

  before_action :check_user

  def show; end

  def update
    user = User.find(params[:id])

    if user.update(user_update_params)
      head :ok
    else
      render json: { errors: user.errors.full_messages }
    end
  end

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

  def user_update_params
    if params[:password].present?
      params.permit(:name, :email, :password)
    else
      params.permit(:name, :email)
    end
  end
end
