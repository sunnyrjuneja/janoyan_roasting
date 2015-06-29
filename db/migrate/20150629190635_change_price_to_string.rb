class ChangePriceToString < ActiveRecord::Migration
  def change
    change_column :coffee_products, :price, :string
  end
end
