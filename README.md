# Set of plugins for formio

If you don't familiar with [formio](https://github.com/formio/formio) check it out [README](https://github.com/formio/formio).

&nbsp;
# Clean up plugin

It's an alternative approach of using "/form/formId/submission";

## Usage
>/form/formPath/cleanUp

This API allow you to omit "Submit" field from submission data.

## Install instruction: 

To install this patch, follow the instructions below:

1. Rename file "server.js" to "server-origin.js";
2. Pull data from this repository. All you need is in the "cleanUp" folder.
3. Add file server.js to the root dir(near "server-origin.js");
4. Add file "cleanUpSubmissionResource.js" to src/resources;
5. Add file "cleanUpSubmissionHandler.js" to src/middleware;
6. Create folder extensions in src;
7. Add file replacePathWithId.js to extensions folder.

All files in "cleanUp" folder are in the same structure as in the root dir of formio, so you can simply merge "cleanUp" folder with formio folder, but don't forget about first step(rename server.js before merge).
