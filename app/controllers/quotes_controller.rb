class QuotesController < ApplicationController
  before_action :require_login
  def index
    @quotes = Quote.all
  end
end
