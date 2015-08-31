class WelcomesController < ApplicationController
  before_action :all_articles, only: [:index,:tag, :archive]
  before_action :all_tags, only: [:index, :tag, :calculate, :archive]

  before_action :require_login, only: [:calculate]

  def index
     @index_articles = Article.all.order(created_at: :desc).page(params[:page]).per(5)
     if params[:condition].present?
     	@index_articles = @index_articles.where('title like ?', '%'+ params[:condition]+ '%')
     end
  end

  def archive
    @articles = Article.all.group_by{|m| m.created_at.beginning_of_month}
  end

  def about
  end

  def tag
    @tag = Tag.exists?(params[:id]) ? Tag.find(params[:id]) : nil
  end

  def tags
    @tags = Tag.all.sort_by {|tag| -tag.articles.count}
  end


  def calculate
    @articles = Article.all
  end

  private
  def all_articles
    @articles = Article.all.order(created_at: :desc).limit(10)
  end

  def all_tags
    @tags = Tag.all.sort_by {|tag| -tag.articles.count}
  end
end
