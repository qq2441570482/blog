class AddItemToQuote < ActiveRecord::Migration
  def change
    Quote.create(title: '电子竞技没有睡觉')
  end
end
