#! /usr/bin/env sh

set -e

npm run build

cd dist

git init

git add .
git commit -m 'New deployment'
git push -f git@github.com:vigandika/wc-predictor.git develop:gh-pages

cd -