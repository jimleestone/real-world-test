module ErrorHandler
  extend ActiveSupport::Concern

  class Unauthenticated < ActionController::ActionControllerError; end

  included do
    rescue_from Unauthenticated, with: :unauthenticated

    def unauthenticated(e)
      @exception = e
      render json: { code: 401, message: @exception.message, data: nil, timestamp: Time.now }
    end
  end
end
