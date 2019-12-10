# config/routes.rb
Rails.application.routes.draw do
  scope :api do
    # Todos & Items route
    resources :todos do
      resources :items
    end

    # Users route
    resources :users, only: %i[show create update destroy], param: :username do
      resources :files, only: %i[index create]
    end

    # Login route
    post 'auth/login', to: 'authentication#authenticate'
    # Get current user
    get 'auth/me', to: 'authentication#current'
  end
end
