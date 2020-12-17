module RenderHelper
  extend ActiveSupport::Concern

  include ErrorHandler

  module ClassMethods
    def before_initialize(**options)
      class_eval do
        before_action :before_initialize, options
      end
    end

    def after_serialize(**options)
      class_eval do
        after_action :after_serialize, options
      end
    end
  end

  def before_initialize
    @data = []
    @serialize_options = { except: %w[password password_digest] }
  end

  def after_serialize
    @reta = @data.as_json except: %w[password password_digest]
    p @data
  end

  def render_ok
    p 2
    render json: { code: 200, message: 'ok', timestamp: Time.now, data: @data }
  end

  def render_error(msg = 'error')
    render json: { code: 500, message: msg, data: nil, timestamp: Time.now }
  end
end
