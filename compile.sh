#!/bin/bash

counter=1

if [ ! -h prod/style.css ] && [ -e style.css ] && [ ! -e style.scss ]
then
  if [ -e prod/style.css ]
  then
    mv prod/style.css prod/style.css.bak
  fi
  ln -s ../style.css prod/style.css
  echo "Symlinking style.css to prod/style.css"
fi

while [ true ]
do
  echo -ne "Call \033[0;34m$counter\033[0m: Compiling."
  jade -s -P -o prod index.jade
  if [ -e style.scss ]
  then
    echo -n "."
    sass style.scss prod/style.css
  fi
  echo -n "."
  babel script.js > prod/script.js
  echo -e ".\033[0;32mdone\033[0m"

  counter=$((counter+1))

  if [ $1 ]
  then
    sleep $1
  else
    break
  fi
done
