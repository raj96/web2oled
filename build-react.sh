#!/bin/bash
ROOTDIR=$(pwd)
REACTDIR=$ROOTDIR/ui

cd $REACTDIR
npm install
npm run build