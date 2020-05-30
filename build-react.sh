#!/bin/bash
ROOTDIR=$(pwd)
OUTDIR=$ROOTDIR/out
REACTDIR=$ROOTDIR/ui

cd $REACTDIR
npm install
npm build
mv build $OUTDIR/ui