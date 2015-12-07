# config valid only for current version of Capistrano
lock '3.4.0'
require 'rvm/capistrano'
# set :rvm_ruby_string, '2.1.4'
# set :rvm_type, :user

set :application, 'blog'
set :repo_url, 'git@github.com:qq2441570482/blog.git'
server 'ec2-52-24-20-199.us-west-2.compute.amazonaws.com', user: 'ubuntu'

set :pty, true

set :ssh_options, {
    forward_agent: true,
    auth_methods: ["publickey"],
    keys: ["~/yanqing.pem"]
}

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/home/ubuntu'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: '$PATH:/home/ubuntu/.rvm/gems/ruby-2.1.4/bin/'}

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do

    task :restart do
      on roles :all do
        execute 'cd current && ./start.sh'
      end
    end

    task :bundle_cmd do
      on roles :all do
        execute 'echo $HOME'
        execute 'source $HOME/.bash_profile && cd current && bundle'
      end
    end

    task :rake_cmd do
      on roles :all do
        execute 'source $HOME/.bash_profile && cd current && RAILS_ENV=production bundle exec rake db:migrate'
        execute 'source $HOME/.bash_profile && cd current && rake assets:precompile RAILS_ENV=production'
      end
    end

    after :finishing, :bundle_cmd
    # after :bundle_cmd, :rake_cmd
    after :bundle_cmd, :restart
  # after :restart, :clear_cache do
    # on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
      # run "echo 'hello world'"
      # run './start.sh'
    # end
  # end
end




