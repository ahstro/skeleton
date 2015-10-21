var gulp = require('gulp')
var jade = require('gulp-jade')
var sass = require('gulp-sass')
var gutil = require('gulp-util')
var source = require('vinyl-source-stream')
var connect = require('gulp-connect')
var babelify = require('babelify')
var watchify = require('watchify')
var browserify = require('browserify')

var clientRoot = 'public'
var paths = {
  src: {
    jade: 'jade/*',
    scss: 'scss/*',
    js: 'js/*'
  },
  dst: {
    html: `${clientRoot}`,
    css: `${clientRoot}/css`,
    js: `${clientRoot}/js`
  }
}

gulp.task('jade', () => {
  gulp.src(paths.src.jade)
    .pipe(jade())
    .pipe(gulp.dest(paths.dst.html))
})

gulp.task('scss', () => {
  gulp.src(paths.src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dst.css))
})

var bundler = browserify({
  entries: ['js/main'],
  transform: [babelify],
  extensions: ['.js', '.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
})

gulp.task('js', () => {
  bundler
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify error'))
    .pipe(source('app.js'))
    .pipe(gulp.dest(paths.dst.js))
})

gulp.task('watch', () => {
  gulp.watch(paths.src.jade, ['jade'])
  gulp.watch(paths.src.scss, ['scss'])

  var wundler = watchify(bundler, {poll: 100})

  function build (file) {
    if (file) gutil.log('Recompiling ' + file)
    wundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify error'))
      .pipe(source('app.js'))
      .pipe(gulp.dest(paths.dst.js))
  }

  build()
  wundler.on('update', build)
})

gulp.task('build', [
  'jade',
  'scss',
  'js'
])

gulp.task('webserver', () => {
  connect.server({
    root: clientRoot,
    port: 8000
  })
})

gulp.task('default', [
  'build',
  'watch',
  'webserver'
])
