#!/usr/bin/env bash

git pull --rebase

rake db:migrate

sudo service nginx restart


