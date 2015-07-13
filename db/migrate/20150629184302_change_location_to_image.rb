class ChangeLocationToImage < ActiveRecord::Migration
  def change
    rename_column :coffee_products, :location, :image
  end
end
