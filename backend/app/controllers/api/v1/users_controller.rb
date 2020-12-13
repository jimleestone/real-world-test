module Api
  module V1
    class UsersController < ProtectedController
      jwt_authenticate except: :login

      def index
        users = User.order(created_at: :desc).limit(20)
        render_ok(render_data: users)
      end

      def profile
        render_ok(render_data: @current_user)
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
        render_ok(render_data: @current_user.followers.order(created_at: :desc).limit(20))
      end

      def following
        render_ok(render_data: @current_user.following.order(created_at: :desc).limit(20))
      end

      private

      def token
        raise Unauthenticated, 'error username or password' unless @current_user&.authenticate(params[:password])

        jwt_token = encode(@current_user.username)
        response.headers['X-Authentication-Token'] = jwt_token
        @current_user = self_serialize(@current_user)
        render_ok(render_data: @current_user)
      end

      def self_serialize(user)
        user.serializable_hash(except: %w[password_digest created_at updated_at])
      end

      def user_params
        params.require(:user).permit(%i[username email password])
      end
    end
  end
end
