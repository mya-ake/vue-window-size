#!/bin/sh

LIBS_DIR=libs

rm -rf $LIBS_DIR
mkdir $LIBS_DIR

LIBS="composition-api plugin mixin"

for lib in $LIBS
do
  mkdir $LIBS_DIR/$lib
  cp packages/$lib/package.json $LIBS_DIR/$lib/package.json
  cp -r packages/$lib/dist $LIBS_DIR/$lib/dist
done
