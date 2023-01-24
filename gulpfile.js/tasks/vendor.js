const { src, dest } = require('gulp'),
    concat = require('gulp-concat')


const vendor = function(vendorFiles){
    return function() {
        return src(vendorFiles)
            .pipe(concat('vendor.js'))
            .pipe(dest('dist/js'));
    }
}

exports.vendor = vendor;
