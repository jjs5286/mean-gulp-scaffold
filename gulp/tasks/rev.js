(function() {
  'use strict';

  var gulp = require('gulp'),
    gutil = require('gulp-util'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    cfg = require('../config.json');

  gulp.task('rev', ['clean', 'scripts', 'less'], function() {
    if(gutil.env.env != 'qa' && gutil.env.env != 'prod') {
      return false;
    }
    return gulp.src(['client/dist/**/*.css', 'client/dist/**/*.js'])
      .pipe(rev())
      .pipe(gulp.dest('client/dist'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('client/dist'));
  });

  gulp.task('revreplace', ['rev'], function () {
    // if(gutil.env.env != 'qa' && gutil.env.env != 'prod') {
    //   return false;
    // }
    var manifest = gulp.src('client/dist/rev-manifest.json');
    return gulp.src("server/views/index.html")
      .pipe(revReplace({manifest: manifest}))
      .pipe(gulp.dest("server/views/dist"));
  });
}());
