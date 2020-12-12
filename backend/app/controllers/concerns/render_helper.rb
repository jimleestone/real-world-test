module RenderHelper
  extend ActiveSupport::Concern

  def render_ok(data)
    render json: { code: 200, message: 'ok', data: data, timestamp: Time.now }
  end

  def render_error(msg)
    render json: { code: 500, message: msg, data: nil, timestamp: Time.now }
  end
end
