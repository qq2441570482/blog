class ArticlesController < ApplicationController
  include Download

  before_action :require_login, only: [:index, :new, :create, :edit]
  before_action :find_article, only: [:edit, :update, :destroy]
  before_action :new_article, only: [:new]
  before_action :all_articles, only: [:show]
  before_action :all_tags, only: [:edit, :new, :show, :index]

  respond_to :html, :json, only: [:show]


  def index
    @articles = Article.all.order(created_at: :desc).page(params[:page]).per(8)
    @counts = Article.all.count

    respond_to do |format|
      format.html
      format.csv do
        send_data to_csv(Article.all.order(created_at: :desc)), :filename => 'my_all_articles.csv'
      end
    end
  end

  def show
    Article.exists?(params[:id]) ? @article = Article.find(params[:id]) : @article = nil

    index = find_index(params[:id])

    @previousArticle = Article.all.order(created_at: :desc)[index - 1] if index != 0
    @nextArticle = Article.all.order(created_at: :desc)[index + 1] if index != (Article.count -1)

    respond_with @article

  end

  def create_all
    articles = ActiveSupport::JSON.decode(params[:articles])
    articles.each do |article|
      newArticle = Article.create(title: article['title'], content: article['content'], created_at: article['created_at'], updated_at: article['updated_at'])
      unless article['tag'].nil?
        tag = Tag.find_or_create_by(name: article['tag'])
        ArticleTag.create(article_id: newArticle.id, tag_id: tag.id)
      end
    end
    redirect_to articles_path
  end

  def create
    article = Article.new(article_params)
    if article.save
      unless params[:article][:tags].nil?
        params[:article][:tags].each do |article_tag|
          ArticleTag.create(article_id: article.id, tag_id: article_tag.to_i)
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
          ArticleTag.create(article_id: params[:id], tag_id: article_tag.to_i)
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
    @tags = Tag.all.sort_by { |tag| -tag.articles.count }
  end

  def find_index(id)
    Article.all.order(created_at: :desc).each_with_index do |article, index|
      if (article.id == id.to_i)
        return index
      end
    end
  end

end
