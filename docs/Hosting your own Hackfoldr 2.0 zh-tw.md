Hackfoldr 2.0 教學 - 架設自己的 Hackfoldr
===

*In other languages:*

- [English tutorial](http://g0v.hackpad.com/Hackfoldr-2.0-forkme)


## 白牌打包


只要
- 擁有一個頂層網址
- 擁有一個 github 帳號

就可以 fork 屬於自己的 hackfoldr。

自架 hackfoldr 的好處：
- 可自訂首頁打開的預設 foldr
- 可打開隱藏的快捷選單，把常用連結內建到 hackfoldr 導覽列
- 可自訂關聯的 hackpad 站台

## 步驟 ##

### fork github repo

到 https://github.com/hackfoldr/hackfoldr-2.0-forkme 按右上角 Fork 按鈕


### 切換到 gh-pages branch

以下都在 `gh-pages` Branch 內操作才有效
![](https://hackpad-attachments.imgix.net/g0v.hackpad.com_G7idRJqbG3I_p.41199_1455509979648_Screen%20Shot%202016-02-15%20at%2012.18.21%20PM.png?fit=max&w=882 "title")

### 修改 CNAME 檔案

內容改成你想使用的網址，範例： https://github.com/hackfoldr/hackfoldr-2.0/blob/gh-pages/CNAME


### 使用域名管理服務 (DNS) 設定網址

- 例如 amazon 的 router 53

        name: hack.etblue.tw.
        type: CNAME
        value: etblue.github.io
        evaluate target: -
        health check id: -
        ttl: 300

- 假若是 cloudflare

  [Cloudflare guide]( http://blog.cloudflare.com/introducing-pagerules-url-forwarding/)

  - 設定 `Cname` 到 `etblue.github.io`
  - 設定 `Page Rule`，
    `http://etblue.github.io/+` forward到 `http://etblue.github.io`


### 等待域名生效

一般來說不會太久，十分鐘之類的，除非 TTL 設定成超長時間

### 等待期間，可先自訂你的 hackfoldr

1. 複製 [ethercalc 範例表單](https://ethercalc.org/hackfolder_template) 到一個你喜歡的新網址去

2. 打開你的 repo，切換到 gh-pages branch

3. 打開 `index.html` 檔案，按鉛筆按鈕編輯，畫面會類似這樣： https://github.com/hackfoldr/hackfoldr-2.0/blob/gh-pages/index.html

4. 依樣畫葫蘆做這幾件事情

    - 設定你的 [defult foldr id 指向到新的 etherpad 網址](https://github.com/moztw/hackfoldr-moztw/commit/73f712e028f7dd446750dde4aa9e90cda4a48bda)

      **重要！** 請務必要設定自己的預設 folder，不要直接把 welcome-to-hackfoldr 這份 ethercalc 的資料改掉，不然大家都沒有教學文件可以看啦 >_<

    - 設定你的 [Github repo issue 回報處](https://github.com/moztw/hackfoldr-moztw/commit/a08f238e2e32b61273827943b1d3b4f5f21c67ab)

    - 設定[預設使用的 hackpad 站台](https://github.com/moztw/hackfoldr-moztw/commit/ccb57c3541c2ba370161bae7a3683a99a861dfe4)

    - [將剛才在 index.html 的修改全數複製到 404.html](https://github.com/moztw/hackfoldr-moztw/commit/dba706726b0cb0004e74ad9ff5cf9a816367deb8)（直接整份檔案複製貼上即可）

注意這裡是用 github 的 project page 而不是 user page 或organization page，所以顯示成 page 的是 gh-pages 而不是 master


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


### 開發時使用自動 deploy

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

