var gulp = require('gulp'),
    debug = require('gulp-debug'),
    bower = require('gulp-bower'),
    sass = require('gulp-sass'),
    mainBowerFiles = require('main-bower-files'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    htmlreplace = require('gulp-html-replace'),
    rename = require('gulp-rename'),
    gulpFilter = require('gulp-filter'),
    templateCache = require('gulp-angular-templatecache'),
    webserver = require('gulp-webserver');



//paths

var base_path = './src/main/webapp/',
    dist_path = base_path + 'dist/';

gulp.task('app:sass', function () {
    gulp.src([base_path + 'styles/**/**.scss'])
        .pipe(debug())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('sdscreen.css'))
        .pipe(gulp.dest(base_path + '/styles/css/'))
})

gulp.task('dist:appcss', function () {
    gulp.src([base_path + 'styles/css/sdscreen.css'])
        .pipe(debug())
        .pipe(minifycss())
        .pipe(rename({
            basename: 'app',
            suffix: ".min"
        }))
        .pipe(gulp.dest(dist_path + '/css/'))
})


gulp.task('bower', function () {
    var jsFilter = gulpFilter('*.js', {
        restore: true
    });
    var cssFilter = gulpFilter('*.css', {
        restore: true
    });
    var fontFilter = gulpFilter(['*.eot', '*.woff', '*.woff2', '*.svg', '*.ttf'], {
        restore: true
    });

    return gulp.src(mainBowerFiles({
            paths: {
                bowerDirectory: base_path + 'bower_components',
                bowerrc: '/.bowerrc',
                bowerJson: './bower.json'
            },
            options: {
                debugging: true,

            },
            overrides: {
                "fontawesome": {
                    "main": [
                            "./css/font-awesome.css",
                            "fonts/fontawesome-webfont.eot",
                            "fonts/fontawesome-webfont.woff",
                            "fonts/fontawesome-webfont.woff2",
                            "fonts/fontawesome-webfont.ttf",
                            "fonts/fontawesome-webfont.svg"
                            ]
                },
                "bootstrap": {
                    "main": ["dist/css/bootstrap.css",
            "dist/js/bootstrap.js"]
                },
                "angular-ui-router": {
                    "main": ["release/angular-ui-router.min.js"]
                },
            }
        }))
        .pipe(jsFilter)
        .pipe(debug())
        // .pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(base_path + '/assets/js/'))
        .pipe(gulp.dest(dist_path + 'js/'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(debug())
        .pipe(concat('bower'))
        .pipe(rename({
            suffix: ".min.css"
        }))

    .pipe(gulp.dest(base_path + 'styles/css/'))
        //.pipe(minifycss())
        .pipe(gulp.dest(dist_path + 'css/'))
        .pipe(cssFilter.restore)
        .pipe(fontFilter)
        .pipe(debug())
        .pipe(gulp.dest(base_path + '/styles/fonts/'))
        .pipe(gulp.dest(dist_path + 'fonts/'))

});

gulp.task('serve', function () {
    gulp.src('./')
        .pipe(webserver({
            path: '/',
            livereload: true,
            directoryListing: false,
            open: true
        }));
});



gulp.task('dist:js', function () {
    gulp.src([
        base_path + '/app/templates/templates.module.js',
        base_path + '/app/templates/templates.js',
        base_path + '/app/components/screen/screen.js',
        base_path + '/app/components/screen/screen.directive.js',
        base_path + '/app/components/screen/screen.service.js',
        base_path + '/app/components/screen/screen.controller.js',
        base_path + '/app/components/screen/services/*.js',
        base_path + '/app/components/screen/sub-components/**/*.js',
        base_path + '/app/*.js',

        base_path + '/app/home/**/*.js',
        base_path + '/app/common/**/*.js',





    ])
        .pipe(debug())
        .pipe(concat('app.all.min.js'))
        // .pipe(uglify({mangle:flase,compress:false}))
        .pipe(gulp.dest(dist_path + '/js/'))
})




gulp.task('minjs', function () {
    gulp.src([dist_path + '/js/utilities.js', dist_path + '/js/components.js', dist_path + '/app.js'])
        .pipe(debug())
        .pipe(concat('all.min.js'))

    /*  .pipe(uglify({
          mangle: false,

      }))*/
    .pipe(gulp.dest(dist_path + 'js/'));
})

gulp.task('templates', function () {
    return gulp.src([base_path + '/**/*.html',
                     '!' + base_path + '/bower_components/**/*.html',
                    '!' + base_path + '/dist/**/*.html',
                     '!' + base_path + '/*.html'
                    ])
        .pipe(debug())
        .pipe(templateCache('templates.js'))
        .pipe(gulp.dest(base_path + '/app/templates'));
});


gulp.task('index', function () {
    gulp.src(base_path + '/index.html')
        .pipe(htmlreplace({
            'app': ['js/app.all.min.js'],
            'vendor': 'js/vendor.min.js',
            'app-css': 'css/app.min.css',
            'bower-css': 'css/bower.min.css',

        }))
        .pipe(gulp.dest(dist_path));
});


gulp.task('copy:images', function () {
    gulp.src(base_path + '/img/*.*')

    .pipe(gulp.dest(dist_path + '/img/'));
    gulp.src(base_path + '/*.ico')
        .pipe(gulp.dest(dist_path));
})



gulp.task('build', function () {
    return gulp.start('bower', 'app:sass', 'templates', 'dist:appcss', 'dist:js', 'index', 'copy:images')

})


gulp.task('watch', function () {

    gulp.watch(base_path + '/img//**/*.{jpg,jpeg,png,gif}', ['copy:images']);
    gulp.watch(base_path + '/**/*.scss', ['app:sass']);
    gulp.watch(base_path + '/app/**/*.html', ['templates']);
});
