class ArticlesController < ApplicationController
  before_action :require_login, only: [:new,:create,:destroy]
  def index
    @articles = Article.all.order(created_at: :desc)
  end

  def show
    @article = Article.find(params[:id])
  end

  def new
    @article = Article.new
  end

  def create
    article = Article.new
    article.title = params[:article][:title]
    article.content = params[:article][:content]
    if article.save
      redirect_to articles_path
    else
      render :new
    end
  end

end
