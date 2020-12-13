Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      # users api
      post 'login', to: 'users#login'
      get 'profile', to: 'users#profile'
      post 'follow/:other_user_id', to: 'users#follow'
      post 'unfollow/:other_user_id', to: 'users#unfollow'
      get 'followers', to: 'users#followers'
      get 'following', to: 'users#following'
    end
  end
end
