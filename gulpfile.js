var path = require('path')
var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css')
var cssWrap = require('gulp-css-wrap')
var less = require('gulp-less')
var LessAutoprefix = require('less-plugin-autoprefix')
var autoprefix = new LessAutoprefix({
  browsers: ['ie > 9', 'last 2 versions'],
})
const cssmin = require('gulp-cssmin')
var customThemeName = '.ue4-theme'

gulp.task('less', function () {
  return gulp
    .src('./src/**/*.less')
    .pipe(
      less({
        plugins: [autoprefix],
      })
    )
    .pipe(cssmin())
    .pipe(gulp.dest('./theme'))
})

gulp.task('css-wrap', function () {
  return (
    gulp
      .src(path.resolve('./theme/index.css'))
      .pipe(cssWrap({ selector: customThemeName }))
      .pipe(cleanCSS())
      .pipe(gulp.dest('dist'))
  )
})

gulp.task('move-var', function () {
  return gulp.src('./src/var.less').pipe(gulp.dest('./dist'))
})

gulp.task(
  'default',
  gulp.series('less', 'css-wrap', 'move-var', function () {
    console.log('运行成功--')
  })
)
