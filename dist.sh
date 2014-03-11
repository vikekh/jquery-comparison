#!/bin/sh

cp src/css/jquery.comparison.css dist/css/jquery.comparison.css
java -jar yuicompressor.jar -o dist/css/jquery.comparison.min.css dist/css/jquery.comparison.css
cp src/js/jquery.comparison.js dist/js/jquery.comparison.js
java -jar yuicompressor.jar -o dist/js/jquery.comparison.min.js dist/js/jquery.comparison.js