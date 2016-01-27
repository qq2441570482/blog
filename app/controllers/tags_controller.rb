class TagsController < ApplicationController
  include Download

  before_action :all_tags, only: [:index, :new]
  before_action :all_articles, only: [:index]
  before_action :require_login

  def index
    @count = Tag.all.count

    respond_to do |format|
      format.html
      format.csv do
        send_data to_csv(Tag.all.order(created_at: :desc)), :filename => 'my_all_tags.csv'
      end
    end

  end

  def new
    @tag = Tag.new
  end

  def create
    if Tag.create(tag_params)
      redirect_to tags_path
    else
      render :new
    end
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy
    redirect_to tags_path
  end

  def destroy_multiple
    Tag.destroy(params[:tag_ids]) unless params[:tag_ids].nil?
    redirect_to tags_path
  end


  private
  def tag_params
    params.require(:tag).permit(:name)
  end

  def all_tags
    @tags = Tag.all.order(created_at: :desc).page(params[:page]).per(8)
  end

  def all_articles
    @articles = Article.all.order(created_at: :desc).page(params[:page]).per(10)
  end
end
