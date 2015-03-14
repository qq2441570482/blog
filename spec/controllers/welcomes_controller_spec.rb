require 'rails_helper'

RSpec.describe WelcomesController do

  describe 'get index page' do
    it 'should list all index_articles' do
      article = FactoryGirl.create :article
      get :index
      expect(assigns[:index_articles].size).to be > 0
    end

    it 'should list all tags' do
      tag = FactoryGirl.create :tag
      get :index
      expect(assigns[:tags].size).to be > 0
    end

    it 'should list recent articles' do
      article = FactoryGirl.create :article
      get :index
      expect(assigns[:articles].size).to be > 0
    end
  end

  describe 'get calculate page' do
    it 'should list all articles' do
      article = FactoryGirl.create :article
      get :calculate
      expect(assigns[:articles].size).to be > 0
    end

    it 'should list all tags' do
      tag = FactoryGirl.create :tag
      get :calculate
      expect(assigns[:tags].size).to be > 0
    end
  end

end
