class Organisation < ApplicationRecord
  has_many :organisation_memberships, dependent: :destroy
  has_many :users, through: :organisation_memberships

  validates :name,
            presence: true,
            uniqueness: { case_sensitive: false },
            length: { minimum: 1 }
  validates :hourly_rate,
            numericality: {
              greater_than_or_equal_to: 0.00,
              message: 'must be greater than or equal to 0.00!'
            }
end
