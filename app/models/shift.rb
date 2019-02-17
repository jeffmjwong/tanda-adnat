class Shift < ApplicationRecord
  belongs_to :user

  validates_presence_of :user, :start, :finish

  validates :break_length,
            numericality: {
              greater_than_or_equal_to: 0,
              message: 'must be greater than or equal to 0!'
            }

  validate :finish_cannot_be_earlier_than_start

  private

  def finish_cannot_be_earlier_than_start
    errors.add(:finish, "can't be earlier than start time!") if finish < start
  end
end
