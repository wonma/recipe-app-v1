var gulp = require('gulp'),
	watch = require('gulp-watch'),
	webpack = require('webpack'),
	webpackConfig = require('./webpack.config.js'),
	webpackDevMiddleware = require('webpack-dev-middleware'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssvars = require('postcss-simple-vars'),
	nested = require('postcss-nested'),
	cssImport = require('postcss-import'),
	hexrgba = require('postcss-hexrgba'),
	calc = require('postcss-calc'),
	browserSync = require('browser-sync').create();


gulp.task('watch', function() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: "./public"
		},
		middleware: webpackDevMiddleware(webpack(webpackConfig))
	});
	
	watch('./public/index.html', function() {
		browserSync.reload();
	});
	watch('./src/styles/**/*.css', function() {
		gulp.start('cssInject');
	});
	watch('./src/scripts/**/*.js', function() {
		browserSync.reload();
	});
});

	
gulp.task('styles',function(){
	return gulp.src('./src/styles/styles.css')
	.pipe(postcss([cssImport, calc, cssvars, nested, hexrgba, autoprefixer]))
	.on('error', function(errorInfo){
		console.log(errorInfo.toString());
		this.emit('end');
	})
	.pipe(gulp.dest('./public/styles'));
});

// gulp.task('scripts', () => {
//     return 
//     	.pipe(gulp.dest('./public/scripts'))
// });


gulp.task('cssInject', ['styles'] , function(){
	return gulp.src('./public/styles/styles.css')
	.pipe(browserSync.stream());
});

// gulp.task('scriptsRefresh', ['scripts'], function(){
// 	browserSync.reload();
// })
