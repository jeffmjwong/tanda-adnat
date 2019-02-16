class AuthenticationController < ApplicationController
  skip_before_action :verify_authenticity_token

  def login

  end

  def submit_login
    binding.pry
  end
end
