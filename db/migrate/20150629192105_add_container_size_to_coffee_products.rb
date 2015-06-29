class AddContainerSizeToCoffeeProducts < ActiveRecord::Migration
  def change
    add_column :coffee_products, :container_size, :integer
  end
end
