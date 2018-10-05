git checkout gh-pages
git merge master
gulp build
rm index.html
rm 404.html
cp _public/*.html ./
git add .
git commit -m 'deploy'
echo "I'll no longer pull and push for you, please push with causion on which remote you'd like to."
