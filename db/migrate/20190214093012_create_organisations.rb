class CreateOrganisations < ActiveRecord::Migration[5.2]
  def change
    create_table :organisations do |t|
      t.string :name, null: false, index: { unique: true }
      t.decimal :hourly_rate, precision: 10, scale: 2, default: 0.00

      t.timestamps
    end
  end
end
