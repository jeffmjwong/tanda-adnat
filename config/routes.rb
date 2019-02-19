Rails.application.routes.draw do
  devise_for :users
  root to: 'users#home'

  resources :organisations, only: %i[show create update destroy] do
    member do
      post 'join'
      post 'leave'
      get 'shifts'
    end
  end

  resources :users, only: %i[show update] do
    collection do
      get 'home'
      get 'organisation'
    end
  end

  resources :shifts, only: %i[create destroy] do
    collection do
      post 'filter'
    end
  end
end
