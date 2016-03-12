import gulp    from 'gulp';
import util    from 'gulp-util';
import express from 'express';
import connect from 'connect-livereload';
import refresh from 'gulp-refresh';
import path    from 'path';
import compass from 'gulp-compass';
import jade    from 'gulp-jade';
import plumber from 'gulp-plumber';

const app = express();

const build_path = '_public';

gulp.task('sass', () =>
  gulp.src('sass/*.sass')
    .pipe(plumber({errorHandler: (error) => util.log(util.colors.red, error.message)}))
    .pipe(compass({sass: 'sass', css: `${build_path}/css`, sourcemap: 'ture'}))
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

gulp.task('build', ['jade', 'sass', 'js', 'assets']);
gulp.task('dev', ['build', 'server', 'watch']);
gulp.task('default', ['build']);
