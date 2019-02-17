class Shift < ApplicationRecord
  belongs_to :user

  validates_presence_of :user, :start, :finish

  validates :break_length,
            numericality: {
              greater_than_or_equal_to: 0,
              message: 'must be greater than or equal to 0!'
            }

  validate :finish_cannot_be_earlier_than_start

  scope :filter, lambda { |from_date:, to_date:|
    where('start > :from AND start < :to', from: from_date, to: to_date)
  }

  def self.by_organisation(organisation_id)
    where(user_id: Organisation.find(organisation_id).users.pluck(:id))
      .order('start DESC')
      .map(&:format_hash)
  end

  def format_hash
    {
      id: id,
      employee_name: user.name,
      shift_date: start.strftime('%d/%m/%Y'),
      start_time: start.strftime('%I:%M%P'),
      finish_time: finish.strftime('%I:%M%P'),
      break_length: break_length,
      hours_worked: hours_worked,
      shift_cost: shift_cost
    }
  end

  def hours_worked
    seconds_in_minute = 60
    minutes_in_hour = 60

    shift_length_in_minutes = (finish - start) / seconds_in_minute

    ((shift_length_in_minutes - break_length) / minutes_in_hour).round(2)
  end

  def shift_cost
    hourly_rate = user.organisation.hourly_rate

    format('$%.2f', hours_worked * hourly_rate)
  end

  private

  def finish_cannot_be_earlier_than_start
    errors.add(:finish, "can't be earlier than start time!") if finish < start
  end
end
