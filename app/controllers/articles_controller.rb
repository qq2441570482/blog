class ArticlesController < ApplicationController
  before_action :require_login, only: [:index,:new,:create,:edit]
  before_action :find_article, only: [:edit,:update,:destroy]
  before_action :new_article, only: [:new]
  before_action :all_articles, only: [:show]
  before_action :all_tags, only: [:edit, :new, :show, :index]


  def index
    @articles = Article.all.order(created_at: :desc).page(params[:page]).per(8)
    @counts = Article.all.count
  end

  def show
    Article.exists?(params[:id]) ? @article = Article.find(params[:id]) : @article = nil
  end


  def create
    article = Article.new(article_params)
    if article.save
      unless params[:article][:tags].nil?
        params[:article][:tags].each do |article_tag|
            ArticleTag.create(article_id: article.id, tag_id: article_tag.to_i )
        end
      end
      redirect_to articles_path
    else
      render :new
    end
  end

  def update
    article_tags = ArticleTag.where(article_id: params[:id].to_i)
    article_tags.each do |article_tag|
      article_tag.destroy
    end
    if @article.update(article_params)
      unless params[:article][:tags].nil?
        params[:article][:tags].each do |article_tag|
          ArticleTag.create(article_id: params[:id], tag_id: article_tag.to_i )
        end
      end
      redirect_to articles_path
    else
      render :new
    end
  end

  def destroy
    @article.destroy
    redirect_to articles_path
  end

  private
  def find_article
    @article = Article.find(params[:id])
  end

  def new_article
    @article = Article.new
  end

  def article_params
    params.require(:article).permit(:title, :content, :created_at, :tags)
  end

  def all_articles
    @articles = Article.all.order(created_at: :desc).page(params[:page]).per(10)
  end

  def all_tags
    @tags = Tag.all.sort_by {|tag| -tag.articles.count}
  end

end
