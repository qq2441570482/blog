class SessionsController < ApplicationController
  before_action :new_user, only: [:new]

  def create
    user = User.find_by_username(params[:username])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to articles_path
    else
      render :new
    end
  end

  def destroy
    session.delete(:user_id)
    redirect_to root_path
  end

  private 
  def new_user
    @user = User.new
  end

end
