# Alexaスキルのテンプレート (alexa-skill-boilerplate-v2)

Alexa Skills Kit (ASK) SDK for Node.js バージョン2 用のテンプレート.

Alexaスキルのテンプレートです。  
起動して、メイン処理を呼ぶという簡単なスキルのテンプレートです。  

## 準備

```
git clone git@github.com:ryoichi-obara/alexa-skill-boilerplate-v2.git 【スキル名】
cd 【スキル名】

npm i
```

## 設定変更箇所

* ``package.json``
  - name
  - description
* ``up.sh``
  - 【S3バケット名】
  - 【Lambda名】

## 実装

``src/index.js`` に実装をします。  
``// TODO``の部分を主に書き換えます。  

## テスト

``npm run test``

## Lambdaの入れ替え

```
npm run make

aws s3 cp ./build/Release/index.zip s3://【S3バケット名】/
aws lambda update-function-code --function-name 【Lambda名】 --s3-bucket 【S3バケット名】 --s3-key index.zip --publish
```

または

```
./up.sh
```
