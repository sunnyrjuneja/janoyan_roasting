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
