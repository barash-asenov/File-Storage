# spec/requests/user_spec.rb
require 'rails_helper'

RSpec.describe 'Users API', type: :request do
  let(:user) { create(:user) }
  let(:headers) { valid_headers.except('Authorization') }
  let(:valid_auth_headers) { valid_headers }
  let(:invalid_auth_headers) { invalid_headers }
  let(:expired_auth_headers) { { 'Authorization' => expired_token_generator(user.id) } }
  let(:valid_attributes) do
    attributes_for(:user, password_confirmation: user.password)
  end

  # Get current user test suite
  describe 'GET /api/users' do
    context 'when valid request' do
      before { get '/api/users', params: {}, headers: valid_auth_headers }

      it 'returns status 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns user data' do
        expect(json).not_to be_nil
      end

      it 'response user name equals to user name' do
        expect(json['user']['name']).to eq(user.name)
      end

      it 'response user email equals to user email' do
        expect(json['user']['email']).to eq(user.email)
      end
    end

    context 'when request token has expired' do
      before { get '/api/users', params: {}, headers: expired_auth_headers }

      it 'returns status 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns failure message' do
        expect(json['message']).to match(/Signature has expired/)
      end
    end

    context 'when request is invalid' do
      before { get '/api/users', params: {}, headers: invalid_auth_headers }

      it 'returns status 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns failure message' do
        expect(json['message']).to match(/Missing token/)
      end
    end
  end

  # User update test suite
  describe 'PUT /api/users/:id' do
    let(:id) { user.id }

    context 'when valid request' do
      context 'tries to change name field' do
        let(:valid_attributes) { { name: 'Test Name' } }

        before { put "/api/users/#{id}", params: valid_attributes.to_json, headers: valid_auth_headers }

        it 'returns status code 204' do
          expect(response).to have_http_status(204)
        end

        it 'updates name field' do
          updated_user = User.find(id)
          # Name value should be changed
          expect(updated_user.name).to match(/Test Name/)
          # Old email should be the same
          expect(updated_user.email).to eq(user.email)
        end
      end

      context 'tries to change email field' do
        let(:valid_attributes) { { email: 'test@test.com' } }

        before { put "/api/users/#{id}", params: valid_attributes.to_json, headers: valid_auth_headers }

        it 'returns status code 204' do
          expect(response).to have_http_status(204)
        end

        it 'updates only email field' do
          updated_user = User.find(id)
          # Email value should be changed
          expect(updated_user.email).to match(/test@test.com/)
          # Name value should be same
          expect(updated_user.name).to eq(user.name)
        end
      end

      context 'tries to change password field' do
        let(:valid_attributes) { { password: 'newPassword_123' } }

        before { put "/api/users/#{id}", params: valid_attributes.to_json, headers: valid_auth_headers }

        it 'returns status code 204' do
          expect(response).to have_http_status(204)
        end

        it 'changes the password field' do
          changed_user = User.find(id)
          expect(changed_user.password_digest).not_to eq(user.password_digest)
        end
      end
    end
  end

  # User signup test suite
  describe 'POST /api/users' do
    context 'when valid request' do
      before { post '/api/users', params: valid_attributes.to_json, headers: headers }

      it 'creates a new user' do
        expect(response).to have_http_status(201)
      end

      it 'returns success message' do
        expect(json['message']).to match(/Account created successfully/)
      end

      it 'returns an authentication token' do
        expect(json['auth_token']).not_to be_nil
      end
    end

    context 'when invalid request' do
      before { post '/api/users', params: {}, headers: headers }

      it 'does not create a new user' do
        expect(response).to have_http_status(422)
      end

      it 'returns failure message' do
        expect(json['message'])
          .to match(/Validation failed: Password can't be blank, Name can't be blank, Email can't be blank, Password digest can't be blank/)
      end
    end
  end
end
