#!/bin/bash
ROOTDIR=$(pwd)
OUTDIR=$ROOTDIR/out
EXPRESSDIR=$ROOTDIR/backend
REACTDIR=$ROOTDIR/ui

mkdir -p $OUTDIR

cd $REACTDIR
npm install
npm build
mv build $OUTDIR