Rails.application.routes.draw do
  devise_for :users
  root to: 'organisations#home'

  resources :organisations, only: %i[show update destroy] do
    collection do
      get 'home'
    end
  end

  resources :users, only: %i[] do
    member do
      post 'join_organisation'
    end
  end
end
