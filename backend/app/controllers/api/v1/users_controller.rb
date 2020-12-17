module Api
  module V1
    class UsersController < ProtectedController
      jwt_authenticate except: :login
      before_initialize
      after_serialize

      def index
        @data << User.order(created_at: :desc).limit(20)
        render_ok @data
      end

      def profile
        @data << @current_user
        render_ok
      end

      def login
        @current_user = User.find_by_username(params[:username])
        token
      end

      def follow
        @current_user.active_relationships.find_or_create_by(followed_id: params[:other_user_id])
        render_ok
      end

      def unfollow
        @current_user.active_relationships.find_by(followed_id: params[:other_user_id]).destroy
        render_ok
      end

      def followers
        @data << @current_user.followers.recent
        render_ok
      end

      def following
        @current_user.following.recent.each { |item| @data << item }
        render_ok
      end

      private

      def token
        raise Unauthenticated, 'error username or password' unless @current_user&.authenticate(params[:password])

        jwt_token = encode(@current_user.username)
        response.headers['X-Authentication-Token'] = jwt_token
        @data << @current_user
        render_ok @data
      end

      def user_params
        params.require(:user).permit(%i[username email password])
      end
    end
  end
end
