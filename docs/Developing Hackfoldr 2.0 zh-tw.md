Developing Hackfoldr 2.0
===

## 使用 master branch 開發

如果你想要用 jade、sass 以比較有效率的方式編輯源碼，可回 master branch，但就需要另外設定開發環境。有兩種環境同時都可以作用

### 前製作業

不管使用以下哪種開發環境，都要安裝 [node.js](http://nodejs.org/)

### 開發環境

#### fire.app

可參考 [Fire.app Jade Windows](https://g0v.hackpad.com/FK7eBR4BdAj) 

1. 安裝 fire.app
2. 安裝 jade

#### gulp.js

1. 安裝 ruby

   - mac / linux

         rvm install 2.0.0

   - windows

     [rubyuinstaller](    rubyuinstaller)

2. 安裝 compass

       gem install compass

3. 安裝其他專案需要的東西

       npm i

4. 啟動 local server

       npm start

5. 預覽

   http://localhost:3000/


### 自動 deploy

在 master 開發完後需要 deploy 到 gh-pages 才會生效。

deploy 的方法有兩種：

1. 在 master 產生出 .html .css 後，手動下 git 指令 merge 到 gh-pages（it works，但不推薦）

2. 讓程式自動幫我們跑 deploy 指令（it works smart，推薦）


兩種 deploy 方式中，自動 deploy 又分兩種：

1. 半自動 deploy script

2. 全自動 travis ci

目前 hackfoldr 2.0 是採用 travis ci 做全自動 deploy，但筆者不會用，所以只介紹半自動 script ...

#### 半自動 deploy script

- windows

      deploy.bat

- mac

      deploy.sh

#### 全自動 travis ci

想要使用 travis ci 的話，repo 裡的 travis ci 的 key 要改成你自己的才會生效。替你的 repo 設定 travis ci 需要做以下步驟：

參考 comment 生成 key
https://github.com/hackfoldr/hackfoldr-2.0/blob/master/.travis/after_success.sh

( [Lee](https://g0v.hackpad.com/ep/profile/v6ozRKwVLwr) 待補)
