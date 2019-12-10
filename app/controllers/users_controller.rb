# app/controllers/users_controller.rb
class UsersController < ApplicationController
  skip_before_action :authorize_request, only: :create
  before_action :set_user, only: %i[show update files]
  # POST /signup
  # Return authenticated token upon signup
  def create
    user = User.create!(user_params)
    auth_token = AuthenticateUser.new(user.email, user.password).call
    response = { message: Message.account_created, auth_token: auth_token }
    json_response(response, :created)
  end

  # GET /users/:username
  def show
    user = {
      name: @user.name,
      username: @user.username,
      email: @user.email
    }
    response = { user: user }
    json_response(response)
  end

  # PUT /users/:username
  def update
    @user.update(user_params)
    head :no_content
  end

  private

  def user_params
    params.permit(
      :name,
      :username,
      :email,
      :password,
      :password_confirmation,
      files: []
    )
  end

  def set_user
    @user = User.find_by(username: params[:username])
  end
end
