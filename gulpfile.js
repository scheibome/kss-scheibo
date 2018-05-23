/* jshint node: true */
'use strict';

let fs = require('fs');
let gulp = require('gulp');
let sass = require('gulp-sass');
let postcss = require('gulp-postcss');
let uncss = require('postcss-uncss');
let exec = require('child_process').exec;
let settings = JSON.parse(fs.readFileSync('./kss-scheibo.json'));

gulp.task('sass', function() {
	let plugins = [
		uncss({
			html: ['docs/**/*.html'],
			ignore: ['.kss-guides-mode .kss-modifier__example']
		}),
	];

	return gulp.src('kss_styleguide/scheibo-template/kss-assets/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(gulp.dest('kss_styleguide/scheibo-template/kss-assets/'));
});

gulp.task('demo-sass', function() {
	return gulp.src(settings.source + '/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('docs/kss-assets/'));
});

gulp.task('kss', function(cb) {
	exec('node node_modules/kss/bin/kss --config kss-scheibo.json', function(err) {
		cb(err);
	});
});

gulp.task('watch', ['kss', 'sass', 'demo-sass'], function() {
	gulp.watch(['kss_styleguide/**/**', 'lib/**/**'], ['kss']);
	gulp.watch('kss_styleguide/scheibo-template/kss-assets/**/*.scss', ['sass']);
	gulp.watch(settings.source + '/**/*.scss', ['demo-sass', 'kss']);
});
