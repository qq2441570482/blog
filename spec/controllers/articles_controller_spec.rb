require 'rails_helper'

RSpec.describe ArticlesController do

  let(:user) { FactoryGirl.create :user, username: "yqwang", password: '123456', password_confirmation: '123456' }

  describe 'get index page' do

    it 'should list all articles' do
      FactoryGirl.create :article
      get :index
      expect(assigns[:articles]).not_to eq(nil)
    end
  end

end