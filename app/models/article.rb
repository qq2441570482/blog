class Article < ActiveRecord::Base
	require 'csv'

	validates :title, presence: true
	validates :content, presence: true

	has_many :article_tags, dependent: :destroy
	has_many :tags, through: :article_tags

	def self.to_csv
		## mac 中 office 中文乱码
		CSV.generate do |csv|
			csv << column_names

			all.each do |article|
				csv << article.attributes.values
			end
		end

	end


end
