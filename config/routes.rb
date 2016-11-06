Rails.application.routes.draw do
  root to: 'welcomes#index'

  get 'welcomes/tag/:id' => 'welcomes#tag', :as => 'welcome_tag'

  get 'articles/new_use_json'

  post 'articles/create_all'

  resources :welcomes, only: [] do
    get 'data', on: :collection
    post 'index', on: :collection
    get 'archive', on: :collection
    get 'tags', on: :collection
  end

  resources :articles

  resources :sessions , only: [:create, :destroy]

  get '/signin' => 'sessions#new'

  resources :tags, only: [:index, :create, :new, :destroy] do
    delete 'destroy_multiple', on: :collection
  end

end
