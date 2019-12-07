Rails.application.routes.draw do
  resources :todos do
    resources :items
  end

  # Login route
  post 'auth/login', to: 'authentication#authenticate'

  # Signup route
  post 'signup', to: 'users#create'
end
