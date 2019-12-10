# app/controller/authentication_controller.rb
class AuthenticationController < ApplicationController
  skip_before_action :authorize_request, only: :authenticate
  # Return auth token once user is authenticated
  def authenticate
    auth_token =
      AuthenticateUser.new(auth_params[:email], auth_params[:password]).call
    json_response(auth_token: auth_token)
  end

  def current
    user = {
      name: current_user.name,
      username: current_user.username,
      email: current_user.email
    }
    json_response(user: user)
  end

  private

  def auth_params
    params.permit(:email, :password)
  end
end
