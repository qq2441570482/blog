class ChangeTitleTypeInQuote < ActiveRecord::Migration
  def change
    change_column :quotes, :title, :text
  end
end
