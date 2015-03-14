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


	private 
	def tag_params
		params.require(:tag).permit(:name)
  end

  def all_tags
    @tags = Tag.all
  end
end
