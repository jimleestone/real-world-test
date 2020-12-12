class ProtectedController < ApplicationController
  include JwtAuthenticator
end
