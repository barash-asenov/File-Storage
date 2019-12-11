# config/routes.rb
Rails.application.routes.draw do
  scope :api do
    # Users route
    resources :users, only: %i[show create update destroy], param: :username do
      resources :files, only: %i[index create destroy]
    end

    # Login route
    post 'auth/login', to: 'authentication#authenticate'
    # Get current user
    get 'auth/me', to: 'authentication#current'
  end
end
