const { src, dest } = require('gulp'),
    gulpSass = require('gulp-sass')(require('sass')),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');

const sass = function (serverProjectPath, files_sass) {
    return function () {
        console.log("concat sass ...")
        return src(files_sass)
            .pipe(gulpSass().on('error', gulpSass.logError))
            .pipe(concat('style.min.css'))
            //.pipe(dest('./dist/css'))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
            .pipe(dest(serverProjectPath + 'css'))
    }
};
console.log('done');
exports.sass = sass;
