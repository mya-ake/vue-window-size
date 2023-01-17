#!/bin/sh

packages="composition-api plugin mixin"

for package in $packages
do
  rm -rf ./$package
  mkdir $package
  cp ./packages/$package/package.json ./$package/package.json
  cp -r ./packages/$package/dist ./$package/dist
done
