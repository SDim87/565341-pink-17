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
  minify = require('gulp-minify'),
  // uglify = require('gulp-uglify'),
  server = browserSync.create(),
  serverReload = browserSync.reload;


gulp.task('images', () => { // yes
  return gulp.src('./source/img/**/*.{jpg,png,svg}')
    .pipe(imagemin([
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(gulp.dest('source/img'))
});

gulp.task('delSprite', () => {
  return del(['source/img/sprite.svg']);
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
    .pipe(gulp.dest('./source/img/'));
  // .pipe(serverReload({stream: true}));
});

gulp.task('html', () => {
  return gulp.src('source/*.html')
    .pipe(posthtml())
    .pipe(gulp.dest('source'))
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
    .pipe(gulp.dest('source/css'))
    // .pipe(server.stream());
});

gulp.task('scripts', () => {
  return gulp.src('source/scripts/*.js')
    .pipe(concat('scripts-all.js'))
    .pipe(minify({compress: true,}))
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('build/scripts'));
});

gulp.task('copy', () => {
  return gulp.src([
      'source/fonts/**/*{woff,woff2}',
      'source/img/**',
      'source/js/**',
      'source/*.ico'
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('server', () => {
  server.init({
    server: 'source/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/less/**/*.less', gulp.series('css'));
  gulp.watch('source/*.html').on('change', server.reload);
  gulp.watch('source/img/sprite.svg').on('change', server.reload);
});

gulp.task('start', gulp.series('delSprite', 'svgSprite', 'css', 'html', 'server'));

// gulp.task('build', gulp.series('csso'));

// copy, html, css, scripts, images, delSprite, svgSprite, server
