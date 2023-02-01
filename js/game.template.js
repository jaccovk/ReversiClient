Game.Template = (function () {
    const getTemplate = function (templateName) {
        let template = spa_templates.templates;
        const templateParts = templateName.split('.');
        for (let templatePart of templateParts) {
            template = template[templatePart];
        }
        return template;
    }

    const parseTemplate = (templateName, data) => {
        return getTemplate(templateName)(data);
    }
    return {
        parseTemplate: parseTemplate
    }
})();
