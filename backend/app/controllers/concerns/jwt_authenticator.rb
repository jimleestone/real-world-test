module JwtAuthenticator
  require 'jwt'
  extend ActiveSupport::Concern

  JWT_SECRET_KEY = Rails.application.secrets.secret_key_base
  JWT_VALID_HOURS = 6

  module ClassMethods
    def jwt_authenticate(**options)
      class_eval do
        before_action :jwt_authenticate!, options
      end
    end
  end

  def jwt_authenticate!
    raise ErrorHandler::Unauthenticated, 'token is blank' if request.headers['Authorization'].blank?

    encoded_token = request.headers['Authorization'].split('Bearer ').last
    payload = decode(encoded_token)
    @current_user = User.find_by_username(payload['sub'])

    raise ErrorHandler::Unauthenticated, 'check token error' if @current_user.blank?

    @current_user
  end

  def encode(username)
    expires_in = JWT_VALID_HOURS.hour.from_now.to_i
    preload = { sub: username, exp: expires_in }
    JWT.encode(preload, JWT_SECRET_KEY, 'HS256')
  end

  def decode(encoded_token)
    decoded_dwt = JWT.decode(encoded_token, JWT_SECRET_KEY, true, algorithm: 'HS256')
    decoded_dwt.first
  end
end
