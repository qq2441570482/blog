class WelcomeController < ApplicationController
  before_action :all_articles, only: [:index,:tag]
  def index
     @tags = Tag.all
     @index_articles = Article.all.order(created_at: :desc)
     if params[:condition].present?
     	@index_articles = @articles.where('title like ?', '%'+ params[:condition]+ '%')
     end

  end

  def about

  end

  def tag
    @tag = Tag.exists?(params[:id]) ? Tag.find(params[:id]) : nil
  end

  private
  def all_articles
    @articles = Article.all.order(created_at: :desc).limit(10)
  end
end
