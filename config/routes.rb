Rails.application.routes.draw do
  devise_for :users
  root to: 'organisations#home'

  resources :organisations, only: %i[show create update destroy] do
    collection do
      get 'home'
    end
  end

  resources :users, only: %i[] do
    collection do
      put 'join_organisation'
      put 'leave_organisation'
      get 'organisation'
    end
  end
end
