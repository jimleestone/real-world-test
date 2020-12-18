class ApplicationController < ActionController::API
  include ErrorHandler
  include RenderHelper
  include JwtAuthenticator
end
