class SessionsController < ApplicationController

  include SessionsHelper

  def new
    unless session[:user_id].nil?
      session.delete(:user_id)
    end
    @user = User.new
  end

  def create
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      sign_in(user)
      redirect_to articles_path
    else
      render :new
    end
  end

  def destroy
    log_out
    redirect_to root_path
  end

end
