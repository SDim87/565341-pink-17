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
  browserSync = require('browser-sync'),
  csso = require('gulp-csso'),
  rename = require('gulp-rename'),
  imagemin = require('gulp-imagemin'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  server = browserSync.create();

gulp.task('images', () => {
  return gulp.src('./source/img/**/*.{jpg,png,svg}')
    .pipe(imagemin([
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.svgo({
        removeViewBox: false,
      })
    ]))
    .pipe(gulp.dest('build/img'))
});

gulp.task('svgSprite', () => {
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
    .pipe(gulp.dest('./build/img/'));
  // .pipe(serverReload({stream: true}));
});

gulp.task('html', () => {
  return gulp.src('source/*.html')
    .pipe(posthtml())
    .pipe(gulp.dest('build'));
});

gulp.task('css', () => {
  return gulp.src('source/less/style.less')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('scripts', () => {
  return gulp.src('source/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('copy', () => {
  return gulp.src([
      'source/fonts/**/*{woff,woff2}',
      'source/img/**',
      'source/*.ico'
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', () => {
  return del('build');
});

gulp.task('refresh', (done) => {
  server.reload();
  done();
});

gulp.task('server', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('source/less/**/*.less', gulp.series('css'));
  gulp.watch('source/img/*.svg', gulp.series('svgSprite', 'html', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
});

gulp.task('build', gulp.series('clean', 'copy', 'css', 'scripts','svgSprite', 'html'));

gulp.task('start', gulp.series('build', 'server'));
