module.exports = function(opts) { // jshint ignore:line
    'use strict';

    const buildStylesheets =  (sheets, async) => {
        let output = '';

        if (!sheets) {
            return output;
        }

        if (typeof sheets === 'string') {
            sheets = [sheets];
        }

        sheets.forEach(function (sheet) {
            if (async) {
                output += `<link rel="stylesheet" href="${sheet}" media="none" onload="if(media!=='all')media='all'">\n`;
                return;
            }

            output += `<link rel="stylesheet" href="${sheet}">\n`;
        });

        return output;
    };

    const buildScripts = (scripts, isModule) => {
        let output = '';
        const validScripts = [];

        if (typeof scripts === 'string') {
            validScripts.push(scripts);
        }

        if (Array.isArray(scripts)) {
            validScripts.push(...scripts);
        }

        if (validScripts.length === 0) {
            return output;
        }

        validScripts.forEach((script) => {
            if (isModule) {
                output += `<script src="${script}" type="module"></script>\n`;
                return;
            }

            output += `<script src="${script}"></script>\n`;
        });

        return output;
    };

    const title = opts.title ? `<title>${opts.title}</title>` : '';

    let bodyScript = '';
    if (opts.script) {
        bodyScript += buildScripts(opts.script, false);
    }

    if (opts.scriptModules) {
        bodyScript += buildScripts(opts.scriptModules, true);
    }

    const favicon = opts.favicon ? `<link rel="icon" href="${opts.favicon}">` : '';
    const css = buildStylesheets(opts.css, opts.cssAsync);
    const lang = opts.lang || 'en';
    const dir = opts.dir || 'ltr';
    const head = opts.head || '';
    const body = opts.body || '';

    return `
        <!doctype html>
        <html lang="${lang}" dir="${dir}">
          <head>
              ${title}
              <meta charset="utf-8">
              ${favicon}
              ${head}
              ${css}
            </head>
          <body>
              ${body}
              ${bodyScript}
          </body>
        </html>
    `;
};
