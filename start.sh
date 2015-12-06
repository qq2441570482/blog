#!/usr/bin/env bash

bundle install
RAILS_ENV=production bundle exec rake db:migrate

sudo service nginx restart


