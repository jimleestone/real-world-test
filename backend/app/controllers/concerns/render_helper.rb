module RenderHelper
  extend ActiveSupport::Concern

  def render_ok(render_data: nil)
    render json: { code: 200, message: 'ok', timestamp: Time.now, data: render_data }
  end

  def render_error(msg: 'internal server error')
    render json: { code: 500, message: msg, data: nil, timestamp: Time.now }
  end
end
