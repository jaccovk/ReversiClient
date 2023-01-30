Game.Template = (function () {
    const getTemplate = function (templateName) {
        let template = spa_templates.templates;
        const templateParts = templateName.split('.');
        for (let i = 0; i < templateParts.length; i++) {
            template = template[templateParts[i]];
        }
        return template;
    }

    const parseTemplate = (templateName, data) => {
        return getTemplate(templateName)(data);
    }
    return {
        parseTemplate,
        getTemplate
    }
})();
