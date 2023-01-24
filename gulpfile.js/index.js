const config = require('./config');
const gulp = require("gulp");
const js = require("./tasks/js").js(config.files.js, config.files.jsOrder, config.localServerProjectPath);
js.displayName = 'js';
const sass = require("./tasks/sass").sass(config.localServerProjectPath, config.files.sass);
sass.displayName = 'sass';
const html = require('./tasks/html').html(config.localServerProjectPath);
html.displayName = 'html';
const vendor = require("./tasks/vendor").vendor(config.files.vendor, config.localServerProjectPath);
vendor.displayName = 'vendor';
const templates = require("./tasks/templates").templates(config.files.templateFiles, config.localServerProjectPath);
templates.displayName = 'templates';

const all = function (done) {
    exports.js();
    exports.sass();
    exports.html();
    exports.vendor();
    console.log('starting ...');
    exports.watch();
    done();
}
const watchFiles = () => {
    console.log("watching files ....");
    gulp.watch(['./js/**/*.js'], gulp.series(js));
    gulp.watch(['./css/**/*.scss'], gulp.series(sass));
    gulp.watch(['./index.html'], gulp.series(html));
    gulp.watch(['./vendor/*.js'], gulp.series(vendor));
    console.log("done");
};

exports.default = all;
exports.js = js;
exports.sass = sass;
exports.html = html;
exports.vendor = vendor;
exports.watch = watchFiles;

