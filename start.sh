#!/usr/bin/env bash

bundle install
RAILS_ENV=production rake db:migrate

sudo service nginx restart


