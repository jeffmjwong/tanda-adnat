Rails.application.routes.draw do
  devise_for :users
  root to: 'users#home'

  resources :organisations, only: %i[show create update destroy] do
    member do
      post 'join'
      get 'shifts'
    end
  end

  resources :users, only: %i[show update] do
    collection do
      get 'home'
      put 'leave_organisation'
      get 'organisation'
    end
  end

  resources :shifts, only: %i[create destroy] do
    collection do
      post 'filter'
    end
  end
end
