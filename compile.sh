#!/bin/bash

echo "Compile Started"
filename=$1
file_dest=$2
domain=$3
image_location=$4
app_name=$5
sendto=$6
all_built=platforms/android/ant-build/*.apk

echo "Creating cordova project"

cordova create $filename $domain $app_name
cd $filename

##Code to Compile for android
cordova platform add android
echo "Unzipping file..."
unzip ../$file_dest www/
cordova build
mkdir built
echo "Built directory completed"
cp $all_built built
cd built
##Code to mail
echo "Sending Email"
cp ../../mail.py .
python mail.py CordovaApp-debug.apk sendto

# cd ../..
# rm -Rf $filename
echo "Compile done!"