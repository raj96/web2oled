#!/bin/bash
ROOTDIR=$(pwd)
OUTDIR=$ROOTDIR/out
REACTDIR=$ROOTDIR/ui

cd $REACTDIR
npm install
npm run build
mv build $OUTDIR/ui