Rails.application.routes.draw do
  devise_for :users
  root to: 'organisations#home'

  post '/authentication/submit_login', to: 'authentication#submit_login'
end
