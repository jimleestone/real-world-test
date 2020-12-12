Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post 'token', to: 'authentication#token'
      post 'follow/:other_user_id', to: 'users#follow'
      post 'unfollow/:other_user_id', to: 'users#unfollow'
      resources :users
    end
  end
end
