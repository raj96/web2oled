#!/bin/bash

ROOTDIR=$(pwd)
OUTDIR=$ROOTDIR/out
EXPRESSDIR=$ROOTDIR/backend

mkdir -p $OUTDIR

cp -r $EXPRESSDIR/* $OUTDIR
cd $ROOTDIR

bash build-react.sh