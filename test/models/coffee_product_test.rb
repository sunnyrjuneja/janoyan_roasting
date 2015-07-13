require 'test_helper'

class CoffeeProductTest < ActiveSupport::TestCase
  images_path = Rails.root.join('public', 'img')
  preview_path = images_path.join('previews')
  modal_path = images_path.join('modals')

  test 'saves as downcase' do
    coffee = coffee_products(:coffee)
    coffee.name = 'Tasty Coffee'
    coffee.short_name = 'Coffee'
    coffee.save
    coffee.reload
    assert_equal coffee.name, 'tasty coffee'
    assert_equal coffee.short_name, 'coffee'
  end
  test 'correct number of images' do
    assert_equal CoffeeProduct.image_options.size, Dir[preview_path.to_s + '/*'].length
    assert_equal CoffeeProduct.image_options.size, Dir[modal_path.to_s + '/*'].length
  end

  CoffeeProduct.image_options.each do |image|
    test "#{image} preview" do
      assert preview_path.join(image + '-preview.jpg').exist?
    end

    test "#{image} modal " do
      assert modal_path.join(image + '-modal.jpg').exist?
    end
  end
end
