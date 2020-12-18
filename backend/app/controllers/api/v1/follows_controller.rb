module Api
  module V1
    class FollowsController < ApplicationController
      jwt_authenticate

      def follow
        if @current_user.id != params[:other_user_id]
          @current_user.active_relationships.find_or_create_by(followed_id: params[:other_user_id])
        end
        render_ok
      end

      def unfollow
        if @current_user.id != params[:other_user_id]
          @current_user.active_relationships.find_by(followed_id: params[:other_user_id]).destroy
        end
        render_ok
      end

      def followers
        render_ok @current_user.followers.recent
      end

      def following
        render_ok @current_user.following.recent
      end
    end
  end
end
