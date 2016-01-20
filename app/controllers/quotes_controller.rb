class QuotesController < ApplicationController
  before_action :require_login
  before_action :find_a_quote, only: [:destroy, :edit, :update]

  def index
    @quotes = Quote.all.order(created_at: :desc)
  end

  def new
    @quote = Quote.new
  end

  def create
    quote = Quote.new(quote_params)
    if quote.save
      redirect_to quotes_path
    else
      render :new
    end
  end

  def destroy
    @quote.destroy
    redirect_to quotes_path
  end
  
  def update
    @quote.update(quote_params)
    redirect_to quotes_path
  end


  private
  def quote_params
    params.require(:quote).permit(:title)
  end

  def find_a_quote
    @quote = Quote.find(params[:id])
  end
end
