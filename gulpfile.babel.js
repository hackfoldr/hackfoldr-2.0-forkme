import gulp    from 'gulp';
import util    from 'gulp-util';
import express from 'express';
import connect from 'connect-livereload';
import refresh from 'gulp-refresh';
import path    from 'path';
import sass    from 'gulp-sass';
import jade    from 'gulp-jade';
import plumber from 'gulp-plumber';
import inlinesource from 'gulp-inline-source';
import debug   from 'gulp-debug-streams';
import replace from 'gulp-replace';

const app = express();

const build_path = '_public';
const deploy_path = './';

gulp.task('sass', () =>
  gulp.src('sass/*.sass')
    .pipe(plumber({errorHandler: (error) => util.log(util.colors.red, error.message)}))
    .pipe(sass({includePaths: 'node_modules/compass-mixins/lib'})
      .on('error', sass.logError))
    .pipe(gulp.dest(`${build_path}/css`))
    .pipe(refresh())
);

gulp.task('jade', () =>
  gulp.src(['views/index.jade', 'views/404.jade'])
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(`${build_path}`))
    .pipe(refresh())
);

gulp.task('assets', () =>
  gulp.src('assets/**/*')
    .pipe(gulp.dest(`${build_path}/assets`))
    .pipe(refresh())
);

gulp.task('js',() =>
  gulp.src('js/*.js')
    .pipe(gulp.dest(`${build_path}/js`))
    .pipe(refresh())
);

gulp.task('server', () => {
  app.use(connect());
  app.use(express.static(path.resolve(`${build_path}`)));
  app.get('/*', (req, res) => res.sendFile(path.resolve(`${build_path}/index.html`)));
  app.listen(3000);
  util.log('listening on port 3000');
});

gulp.task('watch', () => {
  refresh.listen({start: true});

  gulp.watch('sass/*.sass', ['sass']);
  gulp.watch('views/*.jade', ['jade']);
  gulp.watch('js/*js', ['js']);
});

gulp.task('inlinesource', function () {
  return gulp.src([`${build_path}/index.html`, `${build_path}/404.html`])
    // .pipe(debug(path.resolve(`${build_path}`)))
    .pipe(replace(/<script type="text\/javascript" src="\/(js\/index.js)"><\/script>/g, '<div id="script"><script inline type="text/javascript" src="$1"></script></div>'))
    /* // uncommand to inline all scripts / css 
      .pipe(replace(/<script type="text\/javascript" src="\/(.*?.js)">/g, '<script inline type="text/javascript" src="$1">'))
      .pipe(replace(/<link rel="stylesheet" (type="text\/css" )??href="\/(.*?.css)">/g, '<link inline rel="stylesheet" type="text/css" href="$2">'))
    */
    /* // for debug 
      .pipe(replace(/<link rel="stylesheet" (type="text\/css" )??href="\/(.*?.css)">/g, function(match, p1, offset, string) { console.log(match); }))
      .pipe(replace(/<script type="text\/javascript" src="\/(.*?.js)">/g, function(match, p1, offset, string) { console.log(match); }))
    */
    .pipe(inlinesource({
      compress: false,
      rootpath: path.resolve(`${build_path}`)
    }))
    .pipe(gulp.dest(`${deploy_path}`));
});

gulp.task('build', ['jade', 'sass', 'js', 'assets']);
gulp.task('dev', ['build', 'server', 'watch']);
gulp.task('deploy', ['build', 'inlinesource']);

gulp.task('default', ['build']);
