const { src, dest } = require('gulp'),
    gulpSass = require('gulp-sass')(require('sass')),
    concat = require('gulp-concat')

const sass = function (serverProjectPath, files_sass) {
    return function () {
        console.log("concat sass ...")
        return src(files_sass)
            .pipe(gulpSass().on('error', gulpSass.logError))
            .pipe(concat('style.min.css'))
            //.pipe(dest('./dist/css'))
            .pipe(dest(serverProjectPath + 'css'))
    }
};
console.log('done');
exports.sass = sass;
