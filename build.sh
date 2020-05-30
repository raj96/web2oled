#!/bin/bash
ROOTDIR=$(pwd)
OUTDIR=$ROOTDIR/out
EXPRESSDIR=$ROOTDIR/backend
REACTDIR=$ROOTDIR/ui

mkdir -p $OUTDIR

#Build React App and move to out directory
cd $REACTDIR
npm install
npm run build
mv build $OUTDIR/ui

#Copy Express App files to outdir
cp -r $EXPRESSDIR/* $OUTDIR

#Install the package required by Express App
cd $OUTDIR
npm install

#Start server
npm run serve
