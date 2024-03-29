module.exports = {
    localServerProjectPath : 'C:\\Users\\lacco\\source\\repos\\ReversiMvcApp\\ReversiMvcApp\\wwwroot\\',
    files: {
        js: [
            'js/**/*.js',
            'js/*.js',
        ],
        jsOrder: [
            //"js/feedbackWidget.js",
            "js/game.js",
            "js/game.data.js",
            "js/game.model.js",
            "js/game.reversi.js",
            "js/game.api.js",
        ],
        sass: [
            'css/*.scss',
        ],
        html: [
            'index.html',
        ],
        vendor: [
            'vendor/*.js'
        ],
        templateFiles: [
            'templates/**/[^_]*.hbs',
        ],
        partialFiles: [
            'templates/**/_*.hbs',
            'templates/_*.hbs',
        ],
    },
    voornaam: 'Jacco'
};
