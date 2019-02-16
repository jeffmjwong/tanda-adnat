Rails.application.routes.draw do
  root to: 'organisations#home'

  post '/authentication/submit_login', to: 'authentication#submit_login'
end
