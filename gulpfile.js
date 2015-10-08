var gulp = require('gulp')
var jade = require('gulp-jade')
var sass = require('gulp-sass')
var babl = require('gulp-babel')
var cnct = require('gulp-connect')

var clientRoot = 'public'
var paths = {
  src: {
    jade: 'jade/*.jade',
    scss: 'scss/*.scss',
    js: 'js/*.js'
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

gulp.task('es6', () => {
  gulp.src(paths.src.js)
    .pipe(babl())
    .pipe(gulp.dest(paths.dst.js))
})

gulp.task('build', [
  'jade',
  'scss',
  'es6'
])

gulp.task('watch', () => {
  gulp.watch(paths.src.jade, ['jade'])
  gulp.watch(paths.src.scss, ['scss'])
  gulp.watch(paths.src.js, ['es6'])
})

gulp.task('webserver', () => {
  cnct.server({
    root: clientRoot,
    port: 8000
  })
})

gulp.task('default', [
  'build',
  'watch',
  'webserver'
])
