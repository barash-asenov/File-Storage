# app/controllers/users_controller.rb
class UsersController < ApplicationController
  skip_before_action :authorize_request, only: :create
  before_action :set_user, only: %i[]
  # POST /signup
  # Return authenticated token upon signup
  def create
    user = User.create!(user_params)
    auth_token = AuthenticateUser.new(user.email, user.password).call
    response = { message: Message.account_created, auth_token: auth_token }
    json_response(response, :created)
  end

  # GET /users
  # Get current_user corresponds to auth token
  def index
    user = {
      name: current_user.name,
      email: current_user.email
    }
    response = { user: user }
    json_response(response)
  end

  # PUT /users/:id
  def update
    current_user.update(user_params)
    head :no_content
  end

  private

  def user_params
    params.permit(
      :name,
      :email,
      :password,
      :password_confirmation
    )
  end

  def set_user
    @user = User.find[params[:id]]
  end
end
