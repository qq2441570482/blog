require 'rails_helper'

RSpec.describe Tag do
  describe 'create a tag' do
    it 'should create a tag' do
      tag = FactoryGirl.create :tag , :name => 'jsp'
      expect(tag.name).to eql('jsp')
    end
  end
end
