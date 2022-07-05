const config = require('./config');
const gulp = require("gulp");
const js = require("./tasks/js").js(config.files.js, config.files.jsOrder, config.localServerProjectPath);
js.displayName = 'js';
const sass = require("./tasks/sass").sass(config.localServerProjectPath, config.files.sass);
sass.displayName = 'sass';

const all = function (done) {
    exports.js();
    exports.sass();
    console.log('starting ...');
    exports.watch();
    done();
}
const watchFiles = () => {
    console.log("watching files ....");
    gulp.watch(['./js/**/*.js'], gulp.series(js));
    gulp.watch(['./css/**/*.scss'], gulp.series(sass));
    console.log("done");
};

exports.default = all;
exports.js = js;
exports.sass = sass;
exports.watch = watchFiles
