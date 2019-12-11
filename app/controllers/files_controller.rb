# app/controllers/files_controller.rb
class FilesController < ApplicationController
  include Rails.application.routes.url_helpers

  before_action :set_user
  before_action :set_file, only: :destroy

  # GET /api/users/:username/files
  def index
    files = @user.files.map do |k|
      {
        id: k.id,
        name: k.filename,
        byte_size: k.byte_size,
        host: request.host,
        content_type: k.content_type,
        download_url: "#{request.env['HTTP_HOST']}#{rails_blob_path(k, disposition: "attachment")}",
        preview_url: "#{request.env['HTTP_HOST']}#{rails_blob_path(k, disposition: "preview")}"
      }
    end
    json_response(files)
  end

  # DELETE /api/users/:username/files/:id
  def destroy
    @file.purge
    head :no_content
  end

  # POST /api/users/:username/files
  def create
    @user.files.attach(params[:files])
    head :no_content
  end


  private

  def set_user
    @user = User.find_by(username: params[:user_username])
  end

  def set_file
    user = User.find_by(username: params[:user_username])
    user_files = user.files
    @file = user_files.find(params[:id])
  end
end
