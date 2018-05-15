/* jshint node: true */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var exec = require('child_process').exec;

gulp.task('sass', function() {
	return gulp.src('kss_styleguide/scheibo-template/kss-assets/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(uncss({
			html: ['kss_styleguide/scheibo-template/**/*.html'],
			ignore: ['.kss-guides-mode .kss-modifier__example']
		}))
		.pipe(gulp.dest('kss_styleguide/scheibo-template/kss-assets/'));
});

gulp.task('kss', function(cb) {
	exec('node node_modules/kss/bin/kss --config kss-scheibo.json', function(err) {
		cb(err);
	});
});

gulp.task('watch', ['sass', 'kss'], function() {
	gulp.watch('kss_styleguide/scheibo-template/kss-assets/**/*.scss', ['sass']);
	gulp.watch('kss-scheibo/**/**', ['kss']);
});