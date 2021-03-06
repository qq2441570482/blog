class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  skip_before_action :verify_authenticity_token

  before_action :get_title

  def require_login
    unless session[:user_id]
      redirect_to signin_path
    end
  end

  def get_title
    @title = '青春如同奔流的江河'
  end

end
