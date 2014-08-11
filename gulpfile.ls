require! <[gulp gulp-util express connect-livereload tiny-lr gulp-livereload path gulp-compass gulp-jade]>

app = express!
lr = tiny-lr!

build_path = '_public'

gulp.task 'sass', ->
    gulp.src 'sass/*.sass'
        .pipe gulp-compass {sass: 'sass', css: "#{build_path}/css", sourcemap: 'ture'}
        .pipe gulp.dest "#{build_path}/css"
        .pipe gulp-livereload lr

gulp.task 'jade', ->
    gulp.src '*.jade'
        .pipe gulp-jade!
        .pipe gulp.dest "#{build_path}"
        .pipe gulp-livereload lr

gulp.task 'html', ->
    gulp.src '*.html'
        .pipe gulp.dest "#{build_path}"
        .pipe gulp-livereload lr

gulp.task 'assets', ->
    gulp.src 'assets/**/*'
        .pipe gulp.dest "#{build_path}/assets"
        .pipe gulp-livereload lr

gulp.task 'js', ->
    gulp.src 'js/*.js'
        .pipe gulp.dest "#{build_path}/js"
        .pipe gulp-livereload lr

gulp.task 'server', ->
    app.use connect-livereload!
    app.use express.static path.resolve "#{build_path}"
    app.listen 3000
    gulp-util.log 'listening on port 3000'

gulp.task 'watch', ->
    lr.listen 35729, ->
        return gulp-util.log it if it
    gulp.watch 'sass/*.sass', <[sass]>
    gulp.watch './*.jade', <[jade]>
    gulp.watch './*.html', <[html]>
    gulp.watch 'js/*js', <[js]>

gulp.task 'build', <[jade sass html js assets]>
gulp.task 'dev', <[build server watch]>
gulp.task 'default', <[build]>
