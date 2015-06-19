class CoffeeProductsController < ApplicationController
  before_filter :authenticate

  def index
    @coffees = CoffeeProduct.all

    respond_to do |format|
      format.html
      format.json { render json: @coffees }
    end
  end

  def show
    @coffee = CoffeeProduct.find(params[:id])

    respond_to do |format|
      format.json { render json: @coffee }
    end
  end

  def new
    @coffee = CoffeeProduct.new
  end

  def create
    @coffee = CoffeeProduct.new(coffee_product_params)
    if @coffee.save
      flash[:success] = 'Created coffee successfully.'
      redirect_to coffee_products_path
    else
      flash.now[:danger] = @coffee.errors.full_messages.to_sentence
      render 'new'
    end
  end

  def edit
    @coffee = CoffeeProduct.find(params[:id])
  end

  def update
    @coffee = CoffeeProduct.find(params[:id])
    if @coffee.update(coffee_product_params)
      flash[:success] = 'Updated coffee successfully.'
      redirect_to edit_coffee_product_path(@coffee)
    else
      flash.now[:danger] = @coffee.errors.full_messages.to_sentence
      render 'edit'
    end
  end

  private

  def coffee_product_params
    params.require(:coffee_product)
      .permit(:active, :name, :short_name, :description, :price, :container,
              { categories: [], roast_range: [] })
  end

  def authenticate
    unless request.format == Mime::JSON
      authenticate_or_request_with_http_basic do |user, password|
        user == ENV['BASIC_AUTH_USERNAME'] && password == ENV['BASIC_AUTH_PASSWORD']
      end
    end
  end
end
