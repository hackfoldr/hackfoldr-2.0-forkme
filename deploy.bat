#!/bin/bat
git checkout gh-pages
git merge master
jade . -o . --pretty
git add .
git commit -m 'deploy'
git push
git checkout master
