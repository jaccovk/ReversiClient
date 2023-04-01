const { src, dest } = require('gulp'),
    concat = require('gulp-concat')


const vendor = function(vendorFiles, serverProjectPath) {
    return function() {
        return src(vendorFiles)
            .pipe(concat('vendor.js'))
            .pipe(dest('dist/js'))
            .pipe(dest(serverProjectPath + '/js'));
    }
}

exports.vendor = vendor;
