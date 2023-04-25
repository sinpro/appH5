
var gulp = require('gulp'),

uglify = require('gulp-uglify-es').default,

babel = require('gulp-babel'),

output = 'dist'

gulp.task('copy', function () {
    return gulp.src(['**/*', '!**/*.js', '!node_modules', '!node_modules/**/*'])
    .pipe(gulp.dest(output))
})

gulp.task('jsmin', function () {

    return gulp.src(['**/*.js', '!node_modules/**/*.js'])

    .pipe(babel({
        presets: [
            ["@babel/preset-env", {
                useBuiltIns: "usage",
                modules: "commonjs",
                debug: false,
                corejs: "3",
                targets: {
                    node: true
                }
            }]
        ]
    }))

    .pipe(uglify())

    .pipe(gulp.dest(output))

})

gulp.task('default', gulp.series('copy', 'jsmin'))