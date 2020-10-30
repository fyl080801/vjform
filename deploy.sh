#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'polish: docs'
git push --force --quiet "https://${GITHUB_TOKEN}@${GITHUB_REF}" master:gh-pages

cd -
