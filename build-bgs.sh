#!/bin/sh

{
    echo 'let bgs = ['
    for f in bg/*.jpg; do
        echo "'$f',"
    done
    echo '];'
} > bgs.js
