module Api
  module V1
    class UsersController < ProtectedController
      jwt_authenticate

      def index
        users = User.order(created_at: :desc).limit(20)
        render_ok(users)
      end

      def show
        render json: { status: 'SUCCESS', message: 'Loaded the user', data: @user }
      end

      def create
        user = Post.create(user_params)
        if post.save
          render json: { status: 'SUCCESS', data: user }
        else
          render json: { status: 'ERROR', data: user.errors }
        end
      end

      def update
        if @user.update(user_params)
          render json: { status: 'SUCCESS', message: 'Updated the user', data: @user }
        else
          render json: { status: 'SUCCESS', message: 'Not updated', data: @user.errors }
        end
      end

      def follow
        @user.active_relationships.create(followed_id: params[:other_user_id])
      end

      def unfollow
        @user.active_relationships.find_by(followed_id: params[:other_user_id]).destroy
      end

      private

      def current_user
        @user = User.find_by_username('kirito')
      end

      def user_params
        params.require(:user).permit(%i[username email password])
      end
    end
  end
end
