class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  before_action :get_title

  def require_login
    unless session[:user_id]
      redirect_to signin_path
    end
  end

  def get_title
    # quote = Quote.find(rand(Quote.all.size) + 1)
    # @title = Quote.first.title
    @title = '青春如同奔流的江河'
  end

end
