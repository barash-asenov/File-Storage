# spec/models/user_spec.rb
require 'rails_helper'

RSpec.describe User, type: :model do
  # Validation tests
  # Ensure name, username, email and password_digest are present before save
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password_digest) }
end
