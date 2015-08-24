class TagsController < ApplicationController
  before_action :all_tags, only: [:index, :new]

  before_action :require_login

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
    @tags = Tag.all.(created_at: :desc).page(params[:page]).per(5);
  end
end
