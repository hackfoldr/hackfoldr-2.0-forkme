git checkout gh-pages
git merge master
gulp deploy
git add index.html 
git add 404.html
git commit -m 'deploy'
echo "I'll no longer pull and push for you, please push with causion on which remote you'd like to."
