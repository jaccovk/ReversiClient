const handlebars = require('gulp-handlebars');
const declare = require("gulp-declare");
const concat = require('gulp-concat');
const { src, dest } = require('gulp');
const wrap = require('gulp-wrap');
const path = require("path");
const merge = require("merge-stream");


const templates = function (templateFiles, serverProjectPath, partialFiles) {
    return function() {
        const templates = src(templateFiles, serverProjectPath)
            .pipe(handlebars())
            .pipe(wrap('Handlebars.template(<%= contents %>)'))
            .pipe(declare({
                namespace: 'spa_templates',
                noRedeclare: true,
                processName: function (filePath) {
                    return declare.processNameByPath(filePath.replace('<parent_map>/templates/', ''));
                }
            }))
/*            .pipe(concat('templates.js'))
            .pipe(dest('./dist/js/'));*/

        const partials = src(partialFiles, {allowEmpty: true})
            .pipe(handlebars())
            .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
                imports: {
                    processPartialName: function (fileName) {
                        return JSON.stringify(path.basename(fileName, '.js').substr(1));
                    }
                }
            }));
        return merge(partials, templates)
            .pipe(concat('templates.js'))
            .pipe(dest('dist/js/'))
            .pipe(dest(serverProjectPath + '/js'));
    }
}

exports.templates = templates;
