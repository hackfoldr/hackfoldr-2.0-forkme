for %%X in (git.exe) do (set FOUND=%%~$PATH:X)
if not defined FOUND goto NOGIT

git checkout gh-pages
git merge master
jade . -o . --pretty
git add .
git commit -m 'deploy'
git push
git checkout master
exit 0
 
:NOGIT
echo Can't find Git!
exit 1