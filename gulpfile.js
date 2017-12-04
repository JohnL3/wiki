var gulp = require('gulp'),
	browserSync = require('browser-sync');

gulp.task('browser', function() {
var files =[
	'./dev/*.html',
	'./dev/*.css',
	'./dev/*.js'
	];
	browserSync.init(files, {
	  	server:{
			baseDir:'dev'
		},
	
	});
});

	gulp.task('default', ['browser']);