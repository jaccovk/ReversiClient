const {src, dest} = require("gulp");
const min = require('gulp-htmlmin');
const rename = require('gulp-rename');

const html = function (localServerProjectPath) {
    return function () {
        return src(['index.html'])
            .pipe(min({
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
                removeComments: true
            }))

            .pipe(rename(function (path) {
                path.dirname += "/";
                path.basename = 'index';
                path.extname = ".html";
            }))

            //.pipe(dest('./dist/html'))
        .pipe(dest(localServerProjectPath + '/js'));
    }
}

exports.html = html;