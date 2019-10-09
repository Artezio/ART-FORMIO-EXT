const express = require('express');
const debug = require('debug')('formio:alias');

function identifyFormAlias(app) {
    app.use((req, res, next) => {
        const urlRegexp = /^\/form\/.+\/cleanup/i;
        
        if (urlRegexp.test(req.url) && app.formio) {
            const queryParamsMatcher = req.url.match(/\?.*/);
            const queryParams = Array.isArray(queryParamsMatcher) && queryParamsMatcher[0];
            const cutUrl = req.url.substr(6);
            const name = cutUrl.substring(0, cutUrl.match(/\/cleanup/i).index);

            app.formio.cache.loadFormByAlias(req, name, function (error, form) {
                if (error) {
                    debug(`Error: ${error}`);
                    return res.status(400).send('Invalid alias');
                }
                if (!form) {
                    return res.status(404).send('Form not found.');
                }
                req.formId = form._id.toString();
                req.url = `/form/${form._id}/cleanUp${queryParams ? queryParams : ''}`;
                next();
            })
        } else {
            next();
        }
    })
}

module.exports = function (options) {
    let app;
    if (options && options.app && options.app.use) {
        app = options.app;
    } else {
        app = express();
    }
    identifyFormAlias(app);

    const enrichedOptions = {
        ...options,
        app: app,
        hooks: {
            ...(options && options.hooks),
            alter: {
                ...(options && options.hooks && options.hooks.alter),
                resources: function (resources) {
                    resources.noValidateSubmission = require('./src/resources/cleanUpSubmissionResource')(resources.submission.app);
                    return resources;
                }
            }
        }
    }
    return require('./server-origin')(enrichedOptions);
}