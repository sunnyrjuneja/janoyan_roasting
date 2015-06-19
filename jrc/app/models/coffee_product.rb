class CoffeeProduct < ActiveRecord::Base
  ROAST_RANGE_OPTIONS = [
    'City',
    'City Plus',
    'Full City',
    'Full City Plus',
    'French'
  ]

  CONTAINER_OPTIONS = [
    'bag',
    'liquid container'
  ]

  CATEGORY_OPTIONS = [
    'Iced',
    'Single Origin',
    'Blends',
    'Espresso',
    'Decaf'
  ]

  validates_inclusion_of :active, in: [true, false]
  validates_presence_of :name, :short_name, :description, :roast_range, :price, :container, :categories
  validates_length_of :name, maximum: 46
  validates_length_of :short_name, maximum: 27

  def as_json(*args)
    super.tap  { |h| h['valid'] = h.delete 'active' }
  end

  class << self
    def roast_range_options
      ROAST_RANGE_OPTIONS
    end

    def container_options
      CONTAINER_OPTIONS
    end

    def category_options
      CATEGORY_OPTIONS
    end
  end
end