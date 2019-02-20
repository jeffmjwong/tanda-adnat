require 'rails_helper'

RSpec.describe Shift, type: :model do
  let(:user) { User.create!(name: 'user1', email: 'user1@example.com', password: 'qwerty') }
  let(:organisation) { Organisation.create!(name: 'company1', hourly_rate: 10.00) }
  let(:shift_1) do
    Shift.create!(
      user_id: user.id,
      organisation_id: organisation.id,
      start: '10-02-2019 21:00',
      finish: '11-02-2019 01:00',
      break_length: 120
    )
  end
  let(:shift_2) do
    Shift.create!(
      user_id: user.id,
      organisation_id: organisation.id,
      start: '10-02-2019 22:00',
      finish: '11-02-2019 03:00',
      break_length: 60
    )
  end
  let(:shift_3) do
    Shift.create!(
      user_id: user.id,
      organisation_id: organisation.id,
      start: '09-02-2019 20:00',
      finish: '10-02-2019 03:00',
      break_length: 60
    )
  end

  describe '#total_hours_worked' do
    it 'calculates the correct amount of total hours worked' do
      expect(shift_1.total_hours_worked).to eq 2
      expect(shift_2.total_hours_worked).to eq 4
      expect(shift_3.total_hours_worked).to eq 6
    end
  end

  describe '#detailed_hours_worked' do
    it 'returns a hash with correct amount of hours worked' do
      expect(shift_1.detailed_hours_worked).to include(normal: 0, sunday: 2)
      expect(shift_2.detailed_hours_worked).to include(normal: 2, sunday: 2)
      expect(shift_3.detailed_hours_worked).to include(normal: 4, sunday: 2)
    end
  end

  describe '#shift_cost' do
    it 'calculates the correct amount of shift cost' do
      expect(shift_1.shift_cost).to eq '$40.00'
      expect(shift_2.shift_cost).to eq '$60.00'
      expect(shift_3.shift_cost).to eq '$80.00'
    end
  end
end
