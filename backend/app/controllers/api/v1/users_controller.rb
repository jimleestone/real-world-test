module Api
  module V1
    class UsersController < ApplicationController
      jwt_authenticate

      def profile
        render_ok @current_user.as_json
      end
    end
  end
end
