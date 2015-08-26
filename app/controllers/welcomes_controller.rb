class WelcomesController < ApplicationController
  before_action :all_articles, only: [:index,:tag]
  before_action :all_tags, only: [:index, :tag, :calculate]

  before_action :require_login, only: [:calculate]

  def index
     @index_articles = Article.all.order(created_at: :desc).page(params[:page]).per(5)
     if params[:condition].present?
     	@index_articles = @index_articles.where('title like ?', '%'+ params[:condition]+ '%')
     end
  end

  def about
  end

  def tag
    @tag = Tag.exists?(params[:id]) ? Tag.find(params[:id]) : nil
  end


  def calculate
    @articles = Article.all
  end

  private
  def all_articles
    @articles = Article.all.order(created_at: :desc).limit(10)
  end

  def all_tags
    @tags = Tag.all.sort{|tag| tag.articles.count}
  end
end
