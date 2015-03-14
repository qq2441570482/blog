require 'rails_helper'

RSpec.describe TagsController do

  include SessionsHelper

  before do
    user = FactoryGirl.create :user
    sign_in(user)
  end

  describe 'get index page' do
    it 'should list all tags' do
      tag = FactoryGirl.create :tag
      get :index
      expect(assigns[:tags].size).to be > 0
    end
  end

  describe 'get new page' do
    it 'should init a new tag' do
      get :new
      expect(assigns[:tag]).to be_a_new(Tag)
    end
  end

  describe 'post create a tag' do
    it 'should save a tag and redirect to index page' do
      post :create, :tag => {:name => 'java'}
      expect(response).to redirect_to(tags_path)
    end
  end

  describe 'delete a tag' do
    it 'should delete a tag and redirect to index page' do
      tag = FactoryGirl.create :tag
      delete :destroy, :id => tag.id
      expect(response).to redirect_to(tags_path)
    end
  end

end
