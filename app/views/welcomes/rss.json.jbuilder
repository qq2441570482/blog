json.array! @articles do |article|
  json.extract! article, :title, :content, :created_at, :updated_at
  json.tag(article.tags[0].name)
end