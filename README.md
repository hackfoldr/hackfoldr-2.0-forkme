The New Hackfoldr
============

Organize gdoc and hackpad documents for project.

### Why?

We need a way to organize many dynamic documents for every projects.

The shared folder feature in Google Docs comes very close to what we want, but as every document is opened in edit mode, it soon becomes unusable.  It is also impossible to sort the items and we had to use numeric prefix to achieve that.

Hackpad collections are great too, but we also want to include spreadsheets as one of the item types.

So we build this small single-page static web application, that reads a list of url from an EtherCalc spreadsheet, rendering it in a way similar to a google docs folder.  If the document supports read-only mode, we use that by default when it is opened by the user, and provide an additional edit link.


### Supported document types

* Google Docs
* Google Spreadsheets
* Google Prensetation
* Google Drawing
* Hackpad
* EtherCalc
* Links


## Sample folder

http://folder.moztw.org/hackfolder_template


# Hosting your own Hackfoldr 
[Please follow the toturial](https://g0v.hackpad.com/Hackfoldr-2.0-forkme) to set up your own hackfoldr 2.0 instance


# Development

[![devDependency Status](https://david-dm.org/hackfoldr/hackfoldr-2.0/dev-status.svg?style=flat-square)](https://david-dm.org/hackfoldr/hackfoldr-2.0#info=devDependencies)

* development on master branch
* <del>deploy on gh-pages branch (It would auto deploy via travis-ci. You only commit on master branch and push.)</del>
^^^ temporary broken ^^^

### Developing with Fire.app

* development:
    * using Fire.app to watch .jade and .sass
    * using Github for Windows or git on linux to sync and commit

### Developing with Gulp.js

* pre-dev:
    * install: [node](http://nodejs.org/)
    * install: ruby 2.0.0 (use [rubyuinstaller](http://rubyinstaller.org) on windows, use `rvm install 2.0.0` on linux/mac)
    * install compass (`gem install compass`)
    * `npm i`
* devlopment:
    * `npm start`
    * open `http://localhost:3000/` to see the result.


# License

## CC0 1.0 Universal

http://creativecommons.org/publicdomain/zero/1.0

To the extent possible under law, the original author [Chia-liang Kao](https://github.com/clkao) has waived all copyright and related or neighboring rights to hackfoldr.

Thanks to all contributors for [Hackfoldr](https://github.com/hackfoldr/hackfoldr/graphs/contributors) and [Hackfoldr 2.0](https://github.com/hackfoldr/hackfoldr-2.0-forkme/graphs/contributors)

This work is published from Taiwan.
