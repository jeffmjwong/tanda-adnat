class Organisation < ApplicationRecord
  validates :name,
            presence: true,
            uniqueness: { message: 'already existed!' },
            length: { minimum: 1 }
  validates :hourly_rate,
            numericality: {
              greater_than_or_equal_to: 0.00,
              allow_blank: true,
              message: 'must be greater than or equal to 0.00!'
            }
end
