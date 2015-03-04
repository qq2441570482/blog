class ArticlesController < ApplicationController
  before_action :require_login, only: [:index,:new,:create,:edit]
  before_action :find_article, only: [:show,:edit,:update]
  before_action :new_article, only: [:new]


  def index
    @articles = Article.all.order(created_at: :desc)
  end

  def create
    if Article.create(article_params)
      redirect_to articles_path
    else
      render :new
    end
  end

  def update
    if @article.update(article_params)
      redirect_to articles_path
    else
      render :new
    end
  end

  private
  def find_article
    @article = Article.find(params[:id])
  end

  def new_article
    @article = Article.new
  end

  def article_params
    params.require(:article).permit(:title, :content)
  end

end
