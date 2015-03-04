class WelcomeController < ApplicationController
  def index
    if params[:condition].nil?
      @articles = Article.all.order(created_at: :desc)
    else
      @articles = Article.where('title like ?', '%'+ params[:condition] +'%').order(created_at: :desc)
    end
  end

end
