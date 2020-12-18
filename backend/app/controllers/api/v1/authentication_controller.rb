module Api
  module V1
    class AuthenticationController < ApplicationController
      def login
        @current_user = User.find_by_username(params[:username])
        token!
      end

      private

      def token!
        raise Unauthenticated, 'error username or password' unless @current_user&.authenticate(params[:password])

        jwt_token = encode(@current_user.username)
        response.headers['X-Authentication-Token'] = jwt_token
        render_ok @current_user.as_json(only: %w[username email])
      end

      def login_params
        params.require(:user).permit(%i[email password])
      end
    end
  end
end
