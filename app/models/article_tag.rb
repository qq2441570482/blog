class ArticleTag < ActiveRecord::Base
  belongs_to :article
  belongs_to :tag

  validates :article, presence: true
  validates :tag, presence: true
end
