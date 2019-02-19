class RemoveOrganisationFromUsers < ActiveRecord::Migration[5.2]
  def change
    remove_reference :users, :organisation, foreign_key: true
  end
end
