class QuotesController < ApplicationController
  include Download

  before_action :require_login
  before_action :find_a_quote, only: [:destroy, :edit, :update]

  def index
    @count = Quote.all.count
    @quotes = Quote.all.order(created_at: :desc).page(params[:page]).per(8)

    respond_to do |format|
      format.html
      format.csv do
        send_data to_csv(Quote.all.order(created_at: :desc)), :filename => 'my_all_quotes.csv'
      end
    end
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
