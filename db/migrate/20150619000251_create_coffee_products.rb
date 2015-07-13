class CreateCoffeeProducts < ActiveRecord::Migration
  def change
    create_table :coffee_products do |t|
      t.boolean :active
      t.string :name
      t.string :short_name
      t.string :description
      t.string :roast_range, array: true
      t.integer :price
      t.string :container
      t.string :categories, array: true
      t.string :location

      t.timestamps null: false
    end
  end
end
