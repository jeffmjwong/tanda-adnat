class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :organisation_memberships, dependent: :destroy
  has_many :organisations, through: :organisation_memberships

  validates :name,
            presence: true,
            length: { minimum: 1 }
  validates :email,
            presence: true,
            uniqueness: { message: 'already existed!' },
            format: { with: /\A[^@\s]+@[^@\s]+\z/ } # same regex as devise
  validates :encrypted_password,
            presence: true,
            length: { in: 6..128 }
end
