module.exports = function (options) {
    const enrichedOptions = {
        ...options,
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