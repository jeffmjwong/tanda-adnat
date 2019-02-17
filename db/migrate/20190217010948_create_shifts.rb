class CreateShifts < ActiveRecord::Migration[5.2]
  def change
    create_table :shifts do |t|
      t.references :user, foreign_key: true
      t.datetime :start, null: false
      t.datetime :finish, null: false
      t.integer :break_length, null: false, default: 0

      t.timestamps
    end
  end
end
