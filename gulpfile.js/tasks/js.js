const { src, dest } = require('gulp');
const concat = require("gulp-concat");
const order = require("gulp-order");
const babel = require("gulp-babel");


const js = function (filesJs, filesJsOrder, serverPath) {
    return function () {
        console.log("concat files: ", filesJs);
        return src(filesJs)
            .pipe(order(filesJsOrder, { base: './' }))
            .pipe(concat('app.js'))
            .pipe(dest(serverPath + '/js'))
            .pipe(babel({
                presets: ['@babel/preset-env'],
                "plugins": ['@babel/plugin-transform-runtime',{ regenerator: true }]
            }))
            //.pipe(dest('./dist/js'))
            .pipe(dest(serverPath + 'js'));
    }
};

exports.js = js;