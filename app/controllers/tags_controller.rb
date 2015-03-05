class TagsController < ApplicationController
	def index
		@tags = Tag.all
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


	private 
	def tag_params
		params.require(:tag).permit(:name)
	end

end
