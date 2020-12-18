module ErrorHandler
  extend ActiveSupport::Concern

  class Unauthenticated < ActionController::ActionControllerError; end

  included do
    rescue_from Exception, with: :handle_error
    rescue_from JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError, Unauthenticated, with: :unauthenticated

    def unauthenticated(e)
      @exception = e
      head :unauthorized
      # render json: { code: 401, message: @exception.message, data: nil, timestamp: Time.now }
    end

    def handle_error(e)
      @exception = e
      render_error @exception.message
    end
  end
end
