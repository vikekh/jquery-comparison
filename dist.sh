#!/bin/sh

# https://gist.github.com/cjus/1047794
function jsonval {
	echo $1 | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w $2| cut -d":" -f2| sed -e 's/^ *//g' -e 's/ *$//g'
	echo ${temp##*|}
}

json=`cat comparison.jquery.json`
version=`jsonval "$json" version`
info="/* jQuery Comparison v$version */"

cp src/css/jquery.comparison.css dist/css/jquery.comparison.css
echo "$info" > dist/css/jquery.comparison.min.css
java -jar yuicompressor.jar dist/css/jquery.comparison.css >> dist/css/jquery.comparison.min.css

cp src/js/jquery.comparison.js dist/js/jquery.comparison.js
echo "$info" > dist/js/jquery.comparison.min.js
java -jar yuicompressor.jar dist/js/jquery.comparison.js >> dist/js/jquery.comparison.min.js

git commit -a "v$version"
git push

git tag "v$version"
git push origin --tags