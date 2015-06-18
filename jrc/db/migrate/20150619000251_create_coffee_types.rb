class CreateCoffeeTypes < ActiveRecord::Migration
  def change
    create_table :coffee_types do |t|
      t.boolean :valid
      t.string :name
      t.string :short_name
      t.string :description
      t.string :roast_range
      t.integer :price
      t.string :container
      t.string :categories
      t.string :location

      t.timestamps null: false
    end
  end
end
