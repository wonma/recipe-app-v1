var gulp = require('gulp'),
	watch = require('gulp-watch'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssvars = require('postcss-simple-vars'),
	nested = require('postcss-nested'),
	cssImport = require('postcss-import'),
	browserSync = require('browser-sync').create();


gulp.task('watch', function() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: "./public"
		}
	});
	watch('./public/index.html', function() {
		browserSync.reload();
	});
	watch('./public/styles/**/*.css', function() {
		browserSync.reload();
	});
	watch('./public/scripts/**/*.js', function() {
		browserSync.reload();
	});
});
