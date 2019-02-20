class AddOrganisationToShifts < ActiveRecord::Migration[5.2]
  def change
    add_reference :shifts, :organisation, foreign_key: true
  end
end
