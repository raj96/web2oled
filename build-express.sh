#!/bin/bash

ROOTDIR=$(pwd)
OUTDIR=$ROOTDIR/out
EXPRESSDIR=$ROOTDIR/backend

echo "Trying to create ${OUTDIR}"
mkdir $OUTDIR
echo "$? return of mkdir"

cp -r $EXPRESSDIR/* $OUTDIR
cd $ROOTDIR

bash build-react.sh