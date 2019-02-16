class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[join_organisation]

  before_action :check_user
  before_action :set_user
  # before_action :set_organisation, only: %i[show update destroy]

  def join_organisation
    organisation_params = params.permit(:organisation_id)

    if @user.update(organisation_params)
      head :ok
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  def organisation
    @organisation = @user.organisation
  end

  private

  def check_user
    return redirect_to(new_user_session_path) if current_user.blank?
  end

  def set_user
    @user = User.find(params[:id])
  end

  # def set_organisation
  #   @organisation = Organisation.find(params[:id])
  # end
end
