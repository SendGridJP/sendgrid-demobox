DemoBox
=============

## CentOS 7.0

### 前提条件

- SendGridアカウント
- Ruby 2.0.0
- Git
- インバウンドポート（TCP 4567）

### セットアップ手順

- 環境の確認
```bash
# ruby -v
ruby 2.0.0p353 (2013-11-22 [x86_64-linux])
# git --version
git version 1.8.3.1
```

- ソースコード取得
```bash
# git clone https://github.com/SendGridJP/sendgrid-demobox.git
# cd sendgrid-demobox
```

- 環境構築
```bash
# yum -y install ruby-devel gcc gcc-c++
# gem install bundler
# bundle install
```

- アプリケーション設定
```bash
# cp .env.example .env
# vi .env
SENDGRID_USERNAME=**sendgrid username**
SENDGRID_PASSWORD=**sendgrid password**
APP_URL=http://**server host name**
PARSE_HOST=demobox.**sendgrid username**.bymail.in
BASIC_AUTH_USERNAME=admin
BASIC_AUTH_PASSWORD=password
TOS=**address1@domain.com**,**address2@domain.com**,**address3@domain.com**
FROM=**your.address@domain.com**
BCC=
MONGO_URL=
```
各パラメータ詳細  

|パラメータ           |詳細                          |
|:--------------------|:------------------------------------|
|**SENDGRID_USERNAME**|SendGridのユーザ名              |
|**SENDGRID_PASSWORD**|SendGridのパスワード              |
|**APP_URL**          |アプリケーションのURL            |
|**PARSE_HOST**       |メールを受信するドメイン名。例：demobox.**sendgridのユーザ名**.bymail.in        |
|**BASIC_AUTH_USERNAME**|基本認証のユーザ名（空白可）             |
|**BASIC_AUTH_PASSWORD**|基本認証のパスワード             |
|**TOS**              |メール送信機能の宛先デフォルト値    |
|**FROM**              |メール送信機能の送信元デフォルト値    |
|**BCC**              |メール送信機能のBCCデフォルト値（空白可）    |
|**MONGO_URL**        |受信メールのストア先（空白可）    |

- アプリケーション起動
```bash
# rackup -p 4567
```

- アプリケーションへのアクセス  
ブラウザで以下のURLにアクセス。
```text
http://x.x.x.x:4567
```
