# app/models/user.rb
class User < ApplicationRecord
  # Encrypt password
  has_secure_password

  def to_param
    username
  end

  # Model associations
  has_many :todos, foreign_key: :created_by
  has_many_attached :files

  # Validations
  validates :name, presence: true
  validates :username, presence: true, uniqueness: true, format: { with: /\A[a-zA-Z0-9]+\Z/ }
  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: true
end
