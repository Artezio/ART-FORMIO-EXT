'use strict';

const express = require('express');
const cleanUpSubmissionResource = require('./src/resources/cleanUpSubmissionResource');
const replacePathWithId = require('./src/extensions/replacePathWithId');
const serverOrigin = require('./server-origin');

function getApp(options) {
    if (options && options.app && options.app.use) {
        return options.app;
    }
    else {
        return express();
    }
}

module.exports = function(options) {
    const app = getApp(options);
    app.use(replacePathWithId(app));

    const enrichedOptions = {
        ...options,
        app: app,
        hooks: {
            ...(options && options.hooks),
            alter: {
                ...(options && options.hooks && options.hooks.alter),
                resources: function(resources) {
                    resources.noValidateSubmission = cleanUpSubmissionResource(resources.submission.app);
                    return resources;
                }
            }
        }
    };
    return serverOrigin(enrichedOptions);
};
