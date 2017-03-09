class InitializerGenerator < Rails::Generators::Base

  desc 'create file hello world'

  def create_initializer_file
    create_file 'config/initializers/initializer.rb'
  end
end
