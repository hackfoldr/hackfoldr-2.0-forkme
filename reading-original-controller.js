var folderWhitelist, slice$ = [].slice, replace$ = ''.replace;
folderWhitelist = function(name){
  return true;
};
angular.module('app.controllers', ['ui.state', 'ngCookies']).controller({
  AppCtrl: ['$scope', '$window', '$state', '$rootScope', '$timeout'].concat(function($scope, $window, $state, $rootScope, $timeout){
    $scope.$watch('$state.current.name', function(it){
      if (it === 'irc') {
        return $scope.ircEnabled = true;
      }
    });
    window.addEventListener("load", function(){
      return $timeout(function(){
        return window.scrollTo(0, 1);
      }, 0);
    });
    return $timeout(function(){
      return $rootScope.hideGithubRibbon = true;
    }, 10 * 1000);
  })
}).controller({
  HackFolderCtrl: ['$scope', '$sce', '$window', '$state', '$cookies', 'HackFolder'].concat(function($scope, $sce, $window, $state, $cookies, HackFolder){
    var ref$, that;
    import$($scope, {
      hasViewMode: function(it){
        return it != null ? it.match(/g(doc|present|draw)/) : void 8;
      },
      sortableOptions: {
        update: function(){
          return typeof console != 'undefined' && console !== null ? console.log('notyetupdated') : void 8;
        }
      },
      iframes: HackFolder.iframes,
      docs: HackFolder.docs,
      tree: HackFolder.tree,
      godoc: function(doc){
        var ref$;
        if (((ref$ = doc.opts) != null ? ref$.target : void 8) === '_blank') {
          window.open(doc.url, doc.id);
          return true;
        } else if (doc.url.match(/(https?:)?\/\/[^/]*(github|facebook)\.com/)) {
          window.open(doc.url, doc.id);
          return true;
        } else {
          return $scope.go("/" + $scope.hackId + "/" + decodeURIComponent(doc.id));
        }
      },
      open: function(doc){
        window.open(doc.url, doc.id);
        return false;
      },
      activate: function(it){
        var doc;
        doc = HackFolder.activate(it);
        if ((doc != null ? doc.type : void 8) === 'hackfoldr') {
          return typeof console != 'undefined' && console !== null ? console.log('folder!!') : void 8;
        }
      },
      saveBtn: void 8,
      saveModalOpts: {
        dialogFade: true
      },
      showSaveModal: function(show, rm, e){
        $('.ui.modal.save').modal('toggle', show);
        if (e) {
          $scope.saveBtn = $(e.target);
        }
        if (rm) {
          $cookies.savebtn = 'consumed';
          if ($scope.saveBtn) {
            return $scope.saveBtn.fadeOut(1000);
          }
        }
      },
      showSaveBtn: function(){
        return $cookies.savebtn !== 'consumed';
      },
      HackFolder: HackFolder,
      barframeSrc: function(entry){
        var src;
        src = entry.opts.bar.replace(/\{(\w+)\}/g, function(){
          return entry[arguments[1]];
        });
        return $sce.trustAsResourceUrl(src);
      },
      iframeCallback: function(doc){
        doc == null && (doc = {});
        return function(status){
          return $scope.$apply(function(){
            if (typeof console != 'undefined' && console !== null) {
              console.log('iframecb', status, doc);
            }
            $state.current.title = doc.title;
            if (doc.title) {
              document.title = doc.title + " – hackfoldr";
            }
            if (status === 'fail') {
              doc.noiframe = true;
            } else {
              doc.noiframe = false;
            }
            if (status === 'unsure') {
              return doc.iframeunsure = true;
            }
          });
        };
      },
      debug: function(it){
        return typeof console != 'undefined' && console !== null ? console.log(it, this) : void 8;
      },
      reload: function(hackId){
        return HackFolder.getIndex(hackId, true, function(){});
      }
    });
    $scope.$watch('hackId', function(hackId){
      if (!folderWhitelist(hackId)) {
        return $window.location.href = "http://hackfoldr.org/" + $window.location.pathname;
      }
      return HackFolder.getIndex(hackId, false, function(){
        $scope.$watch('docId', function(docId){
          var that, ref$, doc;
          if (!docId) {
            if (that = (ref$ = HackFolder.docs[0]) != null ? ref$.id : void 8) {
              $scope.docId == null && ($scope.docId = that);
              return;
            }
          } else {
            if ($state.params.docId === ((ref$ = HackFolder.docs[0]) != null ? ref$.id : void 8)) {
              $state.transitionTo('hack.doc', {
                docId: null,
                hackId: $scope.hackId
              });
            }
          }
          if (docId) {
            doc = HackFolder.activate(docId);
          }
          if ((doc != null ? doc.type : void 8) === 'hackfoldr') {
            $scope.showIndex = true;
            return HackFolder.loadRemoteCsv(doc.id, function(folderTitle, docs, tree){
              var entry, ref$, ref1$;
              entry = (function(){
                var i$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = HackFolder.tree).length; i$ < len$; ++i$) {
                  entry = ref$[i$];
                  if (entry.id === docId) {
                    results$.push(entry);
                  }
                }
                return results$;
              }())[0];
              entry.tagFilter = (ref$ = entry.tags) != null ? (ref1$ = ref$[0]) != null ? ref1$.content : void 8 : void 8;
              if (!entry.children) {
                entry.children == null && (entry.children = tree != null ? tree[0].children : void 8);
                (ref$ = HackFolder.docs).splice.apply(ref$, [docs.length, 0].concat(slice$.call(docs)));
              }
              $scope.indexDocs = docs;
              return $scope.indexSearch = hackId.replace(/^g0v-/, '');
            });
          } else {
            return $scope.showIndex = false;
          }
        });
        $scope.showIndex = $state.current.name === 'hack.index';
        if ($scope.showIndex) {
          return;
        }
      });
    });
    $scope.collapsed = (ref$ = $cookies.collapsed) != null
      ? ref$
      : $window.innerWidth < 768;
    $scope.$watch('collapsed', function(it){
      if (it != null) {
        return $cookies.collapsed = it;
      }
    });
    $scope.hackId = (that = $state.params.hackId) ? that : 'congressoccupied';
    $scope.$watch('$state.params.docId', function(docId){
      if (docId) {
        return $scope.docId = encodeURIComponent(encodeURIComponent(docId));
      }
    });
    $scope.sidebar = false;
    return $scope.toggleSidebar = function(){
      $scope.collapsed = false;
      return $scope.sidebar = !$scope.sidebar;
    };
  })
}).directive('resize', ['$window'].concat(function($window){
  return function(scope, element, attrs){
    var refreshSize;
    refreshSize = function(){
      scope.width = $window.innerWidth;
      scope.height = $window.innerHeight;
      return scope.contentHeight = $window.innerHeight - $(element).offset().top;
    };
    angular.element($window).bind('resize', function(){
      return scope.$apply(refreshSize);
    });
    return refreshSize();
  };
})).directive('ngxIframe', ['$parse'].concat(function($parse){
  return {
    link: function($scope, element, attrs){
      var cb, dispatch, fail;
      cb = $parse(attrs.ngxIframe)($scope);
      dispatch = function(iframe, loading){
        var ok;
        ok = !(function(){
          try {
            return iframe.location == 'about:blank';
          } catch (e$) {}
        }());
        if (loading && $.browser.mozilla) {
          return cb('unsure');
        } else {
          return cb(ok ? 'ok' : 'fail');
        }
      };
      $(element).load(function(){
        clearTimeout(fail);
        return dispatch(this.contentWindow, true);
      });
      return fail = setTimeout(function(){
        return dispatch(element[0].contentWindow);
      }, 5000);
    }
  };
})).directive('ngxNoclick', function(){
  return function($scope, element, attrs){
    return $(element).click(function(it){
      it.preventDefault();
      return false;
    });
  };
}).directive('ngxClickMeta', ['$parse'].concat(function($parse){
  return {
    link: function($scope, element, attrs){
      var cb, isMeta;
      cb = $parse(attrs.ngxClickMeta);
      isMeta = navigator.appVersion.match(/(Win|X11)/)
        ? function(it){
          return it.ctrlKey;
        }
        : function(it){
          return it.metaKey;
        };
      return $(element).click(function(e){
        if (isMeta(e)) {
          if (!cb($scope)) {
            e.preventDefault();
            return false;
          }
        }
      });
    }
  };
})).directive('ngxFinal', function(){
  return function($scope, element, attrs){
    return $(element).click(function(it){
      return it.stopPropagation();
    });
  };
}).directive('scrollbar', ['$window'].concat(function($window){
  return function(scope, element, attrs){
    var hasScrollbar;
    hasScrollbar = function(){
      var $index;
      $index = $('.index');
      return scope.hasScrollbar = $index.get(0).scrollHeight > $window.innerHeight - $('.ui.menu').height();
    };
    angular.element($window).bind('resize', function(){
      return scope.$apply(hasScrollbar);
    });
    scope.$watch('docs', hasScrollbar);
    return hasScrollbar();
  };
})).factory({
  HackFolder: ['$http', '$sce'].concat(function($http, $sce){
    var iframes, docs, tree, hackId, self;
    iframes = {};
    docs = [];
    tree = [];
    return self = {
      iframes: iframes,
      docs: docs,
      tree: tree,
      activate: function(id, edit){
        var d, doc, type, i$, ref$, len$, t, that, ref1$, mode, src;
        edit == null && (edit = false);
        doc = (function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = docs).length; i$ < len$; ++i$) {
            d = ref$[i$];
            if (d.id === id) {
              results$.push(d);
            }
          }
          return results$;
        }())[0];
        type = doc != null ? doc.type : void 8;
        for (i$ = 0, len$ = (ref$ = tree).length; i$ < len$; ++i$) {
          t = ref$[i$];
          if (that = t != null ? (ref1$ = t.children) != null ? ref1$.map(fn$) : void 8 : void 8) {
            if (in$(id, that)) {
              t.expand = true;
            }
          }
        }
        mode = edit ? 'edit' : 'view';
        src = (function(){
          var ref$;
          switch (ref$ = [type], false) {
          case 'gdoc' !== ref$[0]:
            return "https://docs.google.com/document/d/" + id + "/" + mode + "?pli=1&overridemobile=true";
          case 'gsheet' !== ref$[0]:
            return "https://docs.google.com/spreadsheet/ccc?key=" + id;
          case 'gpresent' !== ref$[0]:
            return "https://docs.google.com/presentation/d/" + id + "/" + mode;
          case 'gdraw' !== ref$[0]:
            return "https://docs.google.com/drawings/d/" + id + "/" + mode;
          case 'gsheet' !== ref$[0]:
            return "https://docs.google.com/spreadsheet/ccc?key=" + id;
          case 'hackpad' !== ref$[0]:
            return "https://" + ((ref$ = doc.site) != null ? ref$ : '') + "hackpad.com/" + id;
          case 'ethercalc' !== ref$[0]:
            return "https://ethercalc.org/" + id;
          case 'video' !== ref$[0]:
            if (doc.provider === 'youtube') {
              return "https://www.youtube.com/embed/" + id;
            } else if (doc.provider === 'ustream') {
              return "http://www.ustream.tv/embed/" + id + "?v=3";
            }
            break;
          case 'url' !== ref$[0]:
            return decodeURIComponent(decodeURIComponent(id));
          default:
            return '';
          }
        }());
        if (doc != null && doc.hashtag) {
          src += doc != null ? doc.hashtag : void 8;
        }
        if (src) {
          src = $sce.trustAsResourceUrl(src);
        }
        if ((doc != null ? doc.type : void 8) === 'hackfoldr') {
          return doc;
        }
        if (that = iframes[id]) {
          that.src = src;
          that.mode = mode;
        } else {
          iframes[id] = {
            src: src,
            doc: doc,
            mode: mode
          };
        }
        return doc;
        function fn$(it){
          return it.id;
        }
      },
      getIndex: function(id, force, cb){
        var retry, doit, this$ = this;
        if (hackId === id && !force) {
          return cb(docs);
        }
        retry = 0;
        if (/^[-\w]{40}[-\w]*$/.exec(id)) {
          doit = function(){
            var callback;
            callback = function(it){
              var k, sheet, own$ = {}.hasOwnProperty;
              for (k in it) if (own$.call(it, k)) {
                sheet = it[k];
                docs.length = 0;
                hackId = id;
                this$.processCsv(sheet.toArray(), cb);
                return;
              }
            };
            return Tabletop.init({
              key: id,
              callback: callback,
              simpleSheet: false
            });
          };
        } else {
          doit = function(){
            return $http.get("https://www.ethercalc.org/_/" + id + "/csv").error(function(){
              if (++retry > 3) {
                return;
              }
              return setTimeout(doit, 1000);
            }).success(function(csv){
              hackId = id;
              docs.length = 0;
              return this$.processCsv(csv, cb);
            });
          };
        }
        return doit();
      },
      processCsv: function(csv, cb){
        return this.loadCsv(csv, docs, tree, function(folderTitle, docs){
          self.folderTitle = folderTitle;
          return cb(docs);
        });
      },
      loadRemoteCsv: function(id, cb){
        var this$ = this;
        return $http.get("https://www.ethercalc.org/_/" + id + "/csv").success(function(csv){
          var docs, tree;
          docs = [];
          tree = [];
          return this$.loadCsv(csv, docs, tree, function(folderTitle){
            return cb(folderTitle, docs, tree);
          });
        });
      },
      loadCsv: function(csv, docs, tree, cb){
        var data, folderTitle, folderOpts, entries, res$, i$, len$, line, url, title, opts, tags, summary, rest, ref$, _, prefix, hashtag, entry, that, ref1$, lastParent, nested, i, x$, y$;
        data = csv;
        if (typeof data === 'string') {
          csv = replace$.call(csv, /^\"?#.*\n/gm, '');
          data = CSV.parse(csv);
        }
        folderOpts = {};
        res$ = [];
        for (i$ = 0, len$ = data.length; i$ < len$; ++i$) {
          line = data[i$];
          if (line.length) {
            url = line[0], title = line[1], opts = line[2], tags = line[3], summary = line[4], rest = slice$.call(line, 5);
            if (!title) {
              continue;
            }
            title = replace$.call(title, /^"|"$/g, '');
            if (opts) {
              opts = replace$.call(opts, /^"|"$/g, '');
            }
            if (opts) {
              opts = (fn$());
            }
            opts == null && (opts = {});
            if (tags) {
              tags = replace$.call(tags, /^"|"$/g, '');
            }
            ref$ = url.match(/^"?(\s*)(\S+?)?(#\S+?)?\s*"?$/), _ = ref$[0], prefix = ref$[1], url = ref$[2], hashtag = ref$[3];
            entry = import$({
              summary: summary,
              hashtag: hashtag,
              url: url,
              title: title,
              indent: prefix.length,
              opts: import$(import$({}, folderOpts), opts)
            }, (fn1$()));
            if (entry.type === 'dummy' && !((ref$ = entry.title) != null && ref$.length)) {
              res$.push(null);
            } else {
              res$.push(import$(import$({
                icon: "/img/" + entry.type + ".png"
              }, entry), {
                tags: ((ref$ = (ref1$ = entry.opts) != null ? ref1$.tags : void 8) != null
                  ? ref$
                  : []).concat(((ref$ = tags != null ? tags.split(',') : void 8) != null
                  ? ref$
                  : []).filter(fn2$).map(fn3$))
              }));
            }
          }
        }
        entries = res$;
        entries.filter(function(it){
          return it != null ? it.url : void 8;
        }).map(function(it){
          var request, videoToken, videoId, this$ = this;
          if (it.type === 'video' && it.provider === 'youtube') {
            request = gapi.client.youtube.videos.list({
              'id': it.id,
              'part': 'snippet'
            });
            return request.execute(function(response){
              var ref$;
              if ('live' === ((ref$ = response.items) != null ? ref$[0].snippet.liveBroadcastContent : void 8)) {
                return it.tags = it.tags.concat({
                  'class': 'warning',
                  content: 'LIVE'
                });
              }
            });
          } else if (videoToken = it.url.match(/ustream.tv\/embed\/([^?]+)/)) {
            videoId = videoToken[1];
            return $.get("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fapi.ustream.tv%2Fjson%2Fchannel%2F" + videoId + "%2FgetValueOf%2Fstatus'&format=json&diagnostics=true&callback=", function(response){
              var ref$, ref1$;
              if ('live' === JSON.parse((ref$ = response.query) != null ? (ref1$ = ref$.results) != null ? (ref$ = ref1$.body) != null ? ref$.p : void 8 : void 8 : void 8).results) {
                return it.tags = it.tags.concat({
                  'class': 'warning',
                  content: 'LIVE'
                });
              }
            });
          }
        });
        docs.splice.apply(docs, [0, docs.length].concat(slice$.call(entries.filter(function(it){
          return it != null;
        }))));
        lastParent = 0;
        res$ = [];
        for (i$ = 0, len$ = docs.length; i$ < len$; ++i$) {
          i = i$;
          entry = docs[i$];
          if (i > 0 && entry.indent) {
            x$ = docs[lastParent];
            y$ = (ref$ = x$.children) != null
              ? ref$
              : x$.children = [];
            y$.push(entry);
            res$.push(null);
          } else {
            lastParent = i;
            res$.push(entry);
          }
        }
        nested = res$;
        nested = nested.filter(function(it){
          return it != null;
        });
        nested = nested.map(function(it){
          var ref$, ref1$;
          if (it.children) {
            it.expand = (ref$ = (ref1$ = it.opts) != null ? ref1$.expand : void 8) != null
              ? ref$
              : it.children.length < 5;
          }
          return it;
        });
        tree.splice.apply(tree, [0, tree.length].concat(slice$.call(nested)));
        return cb(folderTitle, docs);
        function fn$(){
          try {
            return JSON.parse(opts.replace(/""/g, '"'));
          } catch (e$) {}
        }
        function fn1$(){
          var ref$;
          switch (ref$ = [url], false) {
          case void 8 !== ref$[0]:
            if (!folderTitle) {
              if (title) {
                folderTitle = title;
                title = null;
              }
              if (opts) {
                folderOpts = opts;
              }
            }
            return {
              title: title,
              type: 'dummy',
              id: 'dummy'
            };
          case !(that = /^\/\/(.*?)(?:\#(.*))?$/.exec(ref$[0])):
            return {
              type: 'hackfoldr',
              id: that[1],
              tag: that[2]
            };
          case !(that = /^https?:\/\/www\.ethercalc\.(?:com|org)\/(.*)/.exec(ref$[0])):
            return {
              type: 'ethercalc',
              id: that[1]
            };
          case !(that = /https:\/\/docs\.google\.com\/document\/(?:d\/)?([^\/]+)\//.exec(ref$[0])):
            return {
              type: 'gdoc',
              id: that[1]
            };
          case !(that = /https:\/\/docs\.google\.com\/spreadsheet\/ccc\?key=([^\/?&]+)/.exec(ref$[0])):
            return {
              type: 'gsheet',
              id: that[1]
            };
          case !(that = /https:\/\/docs\.google\.com\/drawings\/(?:d\/)?([^\/]+)\//.exec(ref$[0])):
            return {
              type: 'gdraw',
              id: that[1]
            };
          case !(that = /https:\/\/docs\.google\.com\/presentation\/(?:d\/)?([^\/]+)\//.exec(ref$[0])):
            return {
              type: 'gpresent',
              id: that[1]
            };
          case !(that = /https?:\/\/(\w+\.)?hackpad\.com\/(?:.*?-)?([\w]+)(\#.*)?$/.exec(ref$[0])):
            return {
              type: 'hackpad',
              site: that[1],
              id: that[2]
            };
          case !(that = /https?:\/\/(?:youtu\.be\/|(?:www\.)?youtube\.com\/(?:embed\/|watch\?v=))([-\w]+)/.exec(ref$[0])):
            return {
              type: 'video',
              provider: 'youtube',
              id: that[1],
              icon: "http://g.etfv.co/" + url
            };
          case !(that = /https?:\/\/(?:www\.)?ustream\.tv\/(?:embed|channel)\/([-\w]+)/.exec(ref$[0])):
            return {
              type: 'video',
              provider: 'ustream',
              id: that[1],
              icon: "http://g.etfv.co/" + url
            };
          case !(that = /^(https?:\/\/[^\/]+)/.exec(ref$[0])):
            return {
              type: 'url',
              id: encodeURIComponent(encodeURIComponent(url)),
              icon: "http://g.etfv.co/" + that[1]
            };
          default:
            return typeof console != 'undefined' && console !== null ? console.log('unrecognized', url) : void 8;
          }
        }
        function fn2$(it){
          return it.length;
        }
        function fn3$(tag){
          var ref$, _, content, c, rest;
          ref$ = tag.match(/^(.*?)(?::(.*))?$/), _ = ref$[0], content = ref$[1], c = ref$[2], rest = slice$.call(ref$, 3);
          return {
            content: content,
            'class': c != null ? c : 'warning'
          };
        }
      }
    };
  })
}).directive('ngxTooltip', function(){
  return function($scope, element, attrs){
    return $(element).popup({
      position: "right center",
      duration: 1
    });
  };
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}