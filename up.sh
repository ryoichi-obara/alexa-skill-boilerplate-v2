#/bin/sh

# function for setting local.
function main() {
  local S3="【S3バケット名】"
  local ZIP="index.zip"
  #local PROF="【AWSプロファイル】"
  local FUNC="【Lambda名】"

  npm run make
  # 再度npm iが必要ない場合はこちらを使ってもよい
  rm ./build/Release/index.zip
  # npm run quick

  aws s3 cp ./build/Release/index.zip s3://$S3/$ZIP
  aws lambda update-function-code --function-name $FUNC --s3-bucket $S3 --s3-key $ZIP --publish
}

main
