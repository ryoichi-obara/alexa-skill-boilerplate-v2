#/bin/sh

npm run make

# 再度npm iが必要ない場合はこちらを使ってもよい
# rm ./build/Release/index.zip
# npm run quick

aws s3 cp ./build/Release/index.zip s3://【S3バケット名】/
aws lambda update-function-code --function-name 【Lambda名】 --s3-bucket 【S3バケット名】 --s3-key index.zip --publish
