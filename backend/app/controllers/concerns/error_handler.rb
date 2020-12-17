module ErrorHandler
  extend ActiveSupport::Concern

  class Unauthenticated < ActionController::ActionControllerError; end

  included do
    rescue_from Exception, with: :handle_error
    rescue_from Unauthenticated, with: :unauthenticated

    def unauthenticated(e)
      @exception = e
      render json: { code: 401, message: @exception.message, data: nil, timestamp: Time.now }
    end

    def handle_error(e)
      @exception = e
      p @exception.message
      render_error @exception.message
    end
  end
end
