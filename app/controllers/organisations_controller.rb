class OrganisationsController < ApplicationController
  def home
    return redirect_to(new_user_session_path) if current_user.blank?
  end
end
