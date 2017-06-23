var gulp = require('gulp'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    options = require('minimist')(process.argv.slice(2));

//paths

var ressources = './AppBundle/Ressources/';
var sassDir = ressources+ 'sass/';
var jsDir = ressources+'js/self/';


gulp.task('test',function () {
    return gutil.log(gutil.colors.yellow('Prod a été demandé si la valeur est vraie : '+options.dev));
});


gulp.task('styles',function () {
    return gulp.src(sassDir+'main.scss')
        .pipe(sass(
            {
                outputStyle: (options.prod ? 'compressed':'nested')
            }
        )).on('error',sass.logError)
        .pipe(autoprefixer('last 3 versions'))
        .pipe(options.prod ? minifyCss(): gutil.noop())
        .pipe(gulp.dest('./web/css/'))
        .pipe(livereload());
});

gulp.task('scripts',function () {
   return gulp.src(
       [
           ressources+'/bower_components/jquery/dist/jquery.min.js',
           ressources+'/bower_components/bootstraps-sass/assets/javascripts/bootstrap.js',
           ressources+'/js/**/*.js'
       ]
   )
       .pipe(concat('main.js'))
       .pipe(uglify())
       .pipe(gulp.dest('./web/js/'))
       .pipe(livereload());
});

gulp.task('html',function () {
    var opts = {
        conditionals: true,
        spare: true
    };

    return gulp.src(ressources+'/views/**/*.html')
        .pipe(minifyHtml(opts))
        .pipe(gulp.dest('./web/'));
});

gulp.task('icons',function () {
    return gulp.src(ressources+'bower_components/bootstrap-sass/assets/fonts/bootstrap/**.*')
        .pipe(gulp.dest('./web/fonts'));
});

gulp.task('watch',function () {
   livereload.listen();
    gulp.watch([sassDir+'/*.scss',sassDir+'/*.sass'],['styles'])
    gulp.watch([jsDir+'/*.js'],['scripts'])
});

gulp.task('img',['del:img'],function () {
    return gulp.src(ressources+'img/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./web/img'));
});

gulp.task('del:img',function () {
    return del(['./web/img/**/*']);
});

gulp.task('prod',function () {
   gulp.start('styles','html','icons','scripts');
});