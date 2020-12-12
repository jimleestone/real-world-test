module Api
  module V1
    class AuthenticationController < ProtectedController
      def token
        @current_user = User.find_by_username(params[:username])
        raise Unauthenticated, 'error username or password' unless @current_user&.authenticate(params[:password])

        jwt_token = encode(@current_user.username)
        response.headers['X-Authentication-Token'] = jwt_token
        render_ok(@current_user)
      end
    end
  end
end
