The New Hackfoldr for MozTW
============

Using:
* Sass
* Compass
* Semantic UI
* Jade
* jQuery
* Handlebars
* Tabletop
* Fire.app

Development
------------

* development on master branch
* deploy on gh-pages branch

###Windows

#### Fire.app
* development:
    * using Fire.app to watch .jade and .sass
    * using Github for Windows to sync and commit
* ~~deploy: .\deploy.bat (on master)~~ It would auto deploy via travis-ci. You only commit on master branch and push.

#### Gulp.js
* pre-dev:
    * install: [node](http://nodejs.org/)
    * install: [ruby 2.0.0](rubyinstaller.org)
    * install sass (`gem install sass --version "3.3.3"`)
    * install compass (`gem install compass --version "1.0.0.alpha.19"`)
    * `npm i`
* devlopment:
    * `npm run build` (1st time to create `_public` folder)
    * `npm start`

###Mac / Linux

#### Fire.app
* development: using Fire.app to watch .jade and .sass
* deploy: .\deploy.sh (on master) (probably, not tested)

#### Gulp.js
* pre-dev:
    * install: [node](http://nodejs.org/)
    * install: ruby 2.0.0(`rvm install 2.0.0`)
    * install sass (`gem install sass --version "3.3.3"`)
    * install compass (`gem install compass --version "1.0.0.alpha.19"`)
    * `npm i`
* devlopment:
    * `npm run build` (1st time to create `_public` folder)
    * `npm start`


Mockup / Prototype
------------

http://hack.etblue.tw/

License
------------

Same as hackfoldr
