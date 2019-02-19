class CreateOrganisationMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :organisation_memberships do |t|
      t.references :organisation, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
