/*eslint-disable*/
'use strict';

var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  sourcemap = require('gulp-sourcemaps'),
  less = require('gulp-less'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  posthtml = require('gulp-posthtml'),
  svgSprite = require('gulp-svg-sprite'),
  del = require('del'),
  browserSync = require("browser-sync"),
  server = browserSync.create(),
  serverReload = browserSync.reload;

gulp.task('delSprite', function () {
  return del(['source/img/sprite.svg']);
});

gulp.task('svgSprite', function () {
  return gulp.src('source/img/*.svg') // svg files for sprite
    .pipe(svgSprite({
      mode: {
        render: {
          less: true,
        },
        stack: {
          sprite: '../sprite.svg', //sprite file name
        }
      },
    }))
    .pipe(gulp.dest('./source/img/'));
    // .pipe(serverReload({stream: true}));
});

gulp.task('css', function () {
  return gulp.src('source/less/style.less')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(posthtml()) // timing
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('source/css'))
    .pipe(server.stream());
});

gulp.task('server', function () {
  server.init({
    server: 'source/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/less/**/*.less', gulp.series('css'));
  gulp.watch('source/*.html').on('change', server.reload);
});

gulp.task('start', gulp.series('delSprite', 'svgSprite', 'css', 'server'));
