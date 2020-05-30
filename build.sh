#!/bin/bash
ROOTDIR=$(pwd)
OUTDIR=$ROOTDIR/out
EXPRESSDIR=$ROOTDIR/backend
REACTDIR=$ROOTDIR/ui

mkdir -p $OUTDIR

#Build React App
cd $REACTDIR
npm build
mv build $OUTDIR/ui

#Move Express App files to outdir
mv $EXPRESSDIR/* $OUTDIR

#Install the package required by Express App
cd $OUTDIR
npm install

#Bring backend and frontend together
mv $REACTDIR .

#Start server
npm serve
