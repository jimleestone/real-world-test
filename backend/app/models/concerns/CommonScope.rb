module CommonScope
  extend ActiveSupport::Concern
  RECENT_LIMIT = 20

  included do
    scope :recent, -> { order(created_at: :desc).limit(RECENT_LIMIT) }
  end
end
