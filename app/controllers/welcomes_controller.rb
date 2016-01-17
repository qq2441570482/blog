class WelcomesController < ApplicationController
  before_action :all_articles, only: [:index, :tag, :archive, :tags]
  before_action :all_tags, only: [:index, :tag, :archive]

  def index
    @index_articles = Article.all.order(created_at: :desc).page(params[:page]).per(5)
    if params[:condition].present?
      @index_articles = @index_articles.search(:title_cont => params[:condition]).result
    end
  end

  def archive
    @articles = Article.all.order(created_at: :desc).group_by { |m| m.created_at.beginning_of_month }
  end

  def about
  end

  def relax

  end

  def shuoshuo
    @quotes = Quote.all.order(created_at: :desc)
  end

  def data
    @tags = Tag.all.sort_by { |tag| -tag.articles.count }
    @articles = Article.all.order(created_at: :desc).group_by { |m| m.created_at.beginning_of_month }
  end

  def tag
    @tag = Tag.exists?(params[:id]) ? Tag.find(params[:id]) : nil
    @index_articles = @tag.articles.page(params[:page]).per(12)
  end

  def tags
    @tags = Tag.all.sort_by { |tag| -tag.articles.count }
  end

  def rss
    @articles = Article.all.order(created_at: :desc)
  end

  private
  def all_articles
    @articles = Article.all.order(created_at: :desc).limit(10)
  end

  def all_tags
    @tags = Tag.all
  end
end
