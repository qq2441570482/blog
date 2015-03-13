class SessionsController < ApplicationController

  def new
    unless session[:user_id].nil?
      session.delete(:user_id)
    end
    @user = User.new
  end

  def create
    user = User.find_by(username: params[:username])
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

end
