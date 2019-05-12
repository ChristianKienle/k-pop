set -e

npm run docs:build

cd docs/.vuepress/dist

git init
git add -A
git config user.name "Christian Kienle"
git config user.email "kienle.christian@icloud.com"
git commit -m 'Manual Deploy'

git push --force --quiet git@github.com:ChristianKienle/k-pop.git master:gh-pages

cd -