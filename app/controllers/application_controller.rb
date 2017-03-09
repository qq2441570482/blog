class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  skip_before_action :verify_authenticity_token

  before_action :application_title

  def require_login
    redirect_to signin_path if session[:user_id].nil?
  end

  def application_title
    @title = '青春如同奔流的江河'
  end

end
