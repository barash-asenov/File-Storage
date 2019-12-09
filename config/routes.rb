Rails.application.routes.draw do
  scope :api do
    # Todos & Items route
    resources :todos do
      resources :items
    end

    # Users route
    resources :users, only: %i[index create update destroy]

    # Login route
    post 'auth/login', to: 'authentication#authenticate'
  end
end
