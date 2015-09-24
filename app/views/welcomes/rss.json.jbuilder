json.array! @articles do |article|
  json.extract! article, :title, :content, :created_at, :updated_at, article.tags
end