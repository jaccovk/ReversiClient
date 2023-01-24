const handlebars = require('gulp-handlebars');
const declare = require("gulp-declare");
const concat = require('gulp-concat');
const { src, dest } = require('gulp');
const wrap = require('gulp-wrap');


const templates = function (templateFiles, serverProjectPath) {
    return src(templateFiles, serverProjectPath)
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'spa_templates',
            noRedeclare: true, // Avoid duplicate declarations
            processName: function (filePath) {
                return declare.processNameByPath(filePath.replace('<parent_map>/templates/', ''));
            }
        }))
        .pipe(concat('templates.js'))
        .pipe(dest('./dist/js'));
        //.pipe(dest(serverProjectPath + 'js'));
}

exports.templates = templates;
