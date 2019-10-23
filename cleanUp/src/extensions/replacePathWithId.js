'use strict';

const debug = require('debug')('formio:alias');

module.exports = function (router) {
    const urlPattern = /\/(.+)(\/cleanup.*)/i;

    function getAlias(url) {
        return url.match(urlPattern)[1];
    }

    function replacePathWithId(url, id) {
        return url.replace(urlPattern, `/${id}$2`);
    }

    function enrichPathWithFormPrefix(url) {
        return '/form' + url;
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
                req.url = enrichPathWithFormPrefix(req.url);
                next();
            })
        } else {
            next();
        }
    }
}