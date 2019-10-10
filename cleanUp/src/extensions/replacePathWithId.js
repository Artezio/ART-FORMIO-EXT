'use strict';

const debug = require('debug')('formio:alias');

module.exports = function (router) {
    const urlPattern = /(\/form\/)(.+)(\/cleanup.*)/i;

    function getAlias(url) {
        return url.match(urlPattern)[2];
    }

    function replacePathWithId(url, id) {
        return url.replace(urlPattern, `$1${id}$3`);
    }

    return function (req, res, next) {
        if (urlPattern.test(req.url) && router.formio) {
            const alias = getAlias(req.url);

            router.formio.cache.loadFormByAlias(req, alias, function (error, form) {
                if (error) {
                    debug(`Error: ${error}`);
                    return res.status(400).send('Invalid alias');
                }
                if (!form) {
                    return res.status(404).send('Form not found.');
                }
                req.formId = form._id.toString();
                req.url = replacePathWithId(req.url, form._id);
                next();
            })
        } else {
            next();
        }
    }
}