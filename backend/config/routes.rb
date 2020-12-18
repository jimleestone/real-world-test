Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      # authentication api
      post 'login', to: 'authentication#login'

      # users api
      get 'profile', to: 'users#profile'

      # follows api
      post 'follow/:other_user_id', to: 'follows#follow'
      post 'unfollow/:other_user_id', to: 'follows#unfollow'
      get 'followers', to: 'follows#followers'
      get 'following', to: 'follows#following'
    end
  end
end
