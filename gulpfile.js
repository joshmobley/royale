var gulp        = require('gulp');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var uglify      = require('gulp-uglify');
var cleanCSS    = require('gulp-clean-css');
var typescript  = require('gulp-typescript');
var twig        = require('gulp-twig');

var paths = {
    styles: ['sass/screen.scss'],
    scripts: ['js/**/*.ts'],
    templates: ['templates/**/*.html'],
    images: ['img/*'],
};

gulp.task( 'styles', function(){

    return gulp.src(paths.styles)
        .pipe( sass().on('error', sass.logError) ) //compile sass
        .pipe( cleanCSS() ) //compress
        .pipe( gulp.dest('./css') ); //save to disk

});

gulp.task( 'scripts', function(){

    return gulp.src(paths.scripts)
        .pipe( typescript({ //compile typescript
            noImplicitAny: true,
            out: 'scripts.js'
        }))
        .pipe( uglify() ) //compress
        .pipe( gulp.dest('js/')) //save to disk

});

gulp.task( 'templates', function(){

    return gulp.src(paths.templates)
        .pipe( twig() )
        .pipe( gulp.dest('./'))

});

gulp.task( 'watch', function(){
    gulp.watch( paths.styles, ['styles'] );
    gulp.watch( paths.scripts, ['scripts'] );
    gulp.watch( paths.templates, ['templates'] );
});

gulp.task( 'default', ['styles', 'scripts', 'templates', 'watch'] );