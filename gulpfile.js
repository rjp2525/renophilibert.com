var $ = require('gulp-load-plugins')(),
    browserify = require('browserify'),
    browserSync = require('browser-sync'),
    glob = require('glob'),
    gulp = require('gulp'),
    production = false,
    reload = browserSync.reload,
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    $ = require('gulp-load-plugins')();

var globs = {
    html: 'src/**/*.html',
    css: 'src/css/**/*.scss',
    js: 'src/js/**/*.js',
    img: 'src/img/**/*.{png,jpg,jpeg,gif,svg}',
    other: 'src/**/*.{eot,ttf,woff,woff2}'
};

gulp.task('html', function() {
    // HTML
    return gulp.src(globs.html)
        .pipe($.if(production, $.htmlmin({collapseWhitespace: true})))
        .pipe($.if(!production, reload({stream: true})))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', ['html'], function() {
    // CSS
    return gulp.src('src/css/style.scss')
        .pipe($.sass())
        .pipe($.autoprefixer('last 3 versions'))
        .pipe($.if(production, $.uncss({html: glob.sync('dist/**/*.html')})))
        .pipe($.if(production, $.minifyCss()))
        .pipe($.if(!production, reload({stream: true})))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
    // JS
    var bundle = browserify({
        insertGlobals: true,
        debug: !production
    });

    bundle.require('src/js/reno.js', {entry: true});

    return bundle.bundle()
        .pipe(source('reno.js'))
        .pipe($.if(production, buffer()))
        .pipe($.if(production, $.uglify()))
        .pipe($.if(!production, reload({stream: true})))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('img', function() {
    // Images
    return gulp.src(globs.img)
        .pipe($.if(production, $.imagemin({progressive: true})))
        .pipe($.if(!production, reload({stream: true})))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('other', function() {
    // Other
    return gulp.src('src/**/*.{eot,ttf,woff,woff2}')
        .pipe($.if(!production, reload({stream: true})))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    // Watch
    for(var key in globs) {
        gulp.watch(globs[key], [key]);
    }
});

gulp.task('browser', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('minify', function() {
    production = true;
});

gulp.task('preview', ['watch', 'browser']);
gulp.task('production', ['minify', 'default']);
gulp.task('default', ['html', 'css', 'js', 'img', 'other']);