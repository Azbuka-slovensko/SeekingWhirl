var gulp = require('gulp'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass'), 
	csso = require('gulp-csso'),
	uglify = require('gulp-uglify'),
	webserver = require('gulp-webserver'),
	rigger = require('gulp-rigger');

gulp.task('sass', function () {
	gulp.src('./source/sass/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('pug', function() {
	gulp.src(['./source/template/**/*.pug', '!./source/template/**/_*.pug'])
		.pipe(pug({
			pretty: true
		}))
		.on('error', console.log)
	.pipe(gulp.dest('./'));
}); 

gulp.task('js', function() {
	gulp.src('./source/js/**/*.js')
		.pipe(rigger())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('images', function() {
	gulp.src('./source/img/**/*')
		.pipe(gulp.dest('./public/img'));
	
});

gulp.task('fonts', function() {
	gulp.src('./source/fonts/**/*')
		.pipe(gulp.dest('./public/fonts'));
});

gulp.task('http-server', function() {
	gulp.src('./')
		.pipe(webserver({
			host: "localhost",
			port: 9000,
			fallback: 'index.html',
			livereload: false
			
		}));
});

gulp.task('watch', function() {
	gulp.start('sass');
	gulp.start('pug');
	gulp.start('images');
	gulp.start('js');
	gulp.start('fonts');
	
	gulp.watch('source/sass/**/*.scss', function() {
		gulp.start('sass');
	});
	gulp.watch('source/template/**/*.pug', function() {
		gulp.start('pug');
	});
	gulp.watch('source/img/**/*', function() {
		gulp.start('images');
	});
	gulp.watch('source/js/**/*', function() {
		gulp.start('js');
	});
	gulp.start('http-server');
});

gulp.task('build', function() {
	gulp.src('./source/sass/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(csso())
		.pipe(gulp.dest('./public/css'));
	gulp.src(['./source/template/*.pug', '!./source/template/_*.pug'])
		.pipe(pug())
		.pipe(gulp.dest('./'));
	gulp.src('./source/js/**/*.js')
		.pipe(rigger())
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'));
	gulp.src('./source/img/**/*')
		.pipe(gulp.dest('./public/img'));
	gulp.src('./source/fonts/**/*')
		.pipe(gulp.dest('./public/fonts'));
});