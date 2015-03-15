require 'rails_helper'

RSpec.describe ArticlesController do

  include SessionsHelper

  before do
    user =  FactoryGirl.create :user
    sign_in(user)
  end

  describe 'get index page' do
    it 'should list all articles' do
      article = FactoryGirl.create :article
      get :index
      expect(assigns[:articles].size).to be > 0
    end
  end

  describe 'get show page' do
    it 'should prepare a article for show page' do
      article = FactoryGirl.create :article, :title => 'I am a test'
      get :show, :id => article.id
      expect(assigns[:article].title).to eql('I am a test')
    end
  end

  describe 'get new page' do
    it 'should return a new article' do
      article = FactoryGirl.create :article
      get :new
      expect(assigns[:article]).to be_a_new(Article)
    end
  end

  describe 'post create a article' do
    it 'should save a article and redirect to index page' do
      tag = FactoryGirl.create :tag
      post :create, :article => {:title => 'test', :content => 'test', :tags => ['1']}
      expect(response).to redirect_to(articles_path)
    end
  end

  describe 'delete a article' do
    it 'should delete a article and redirect to index page' do
      article = FactoryGirl.create :article
      delete :destroy, :id => article.id
      expect(response).to redirect_to(articles_path)
    end
  end

  describe 'put update a article' do
    it 'should save a article and redirect to index page' do
      article = FactoryGirl.create :article
      put :update, {:id => article.id,:article => {:title => 'update'}}
      expect(assigns[:article].title).to eql('update')
    end
  end

end