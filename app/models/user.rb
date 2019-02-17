class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  belongs_to :organisation, optional: true

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
