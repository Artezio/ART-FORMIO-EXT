&nbsp;
# Clean up plugin for form.io
If you are not familiar with formio check it out [README](https://github.com/formio/formio).

### This plugin was created for validating form and omitting extra fields.

* The data will be validated
* Extra fields will be omitted in the response
* "Submit" field will be omitted in the response
* Nothing will be stored in the mongo database

## Usage

>POST     /:formPath/cleanUp

## Example
* *Example form path*: user/login
* *URL*: http://localhost:3001/user/login/cleanUp

Request body:
```
{
  "data": {
    "email": "admin@mail.com",
    "password": "admin",
    "submit": true,
    "extraField": "extra data"
  }
}
```
Response data:
```
{
  "data": {
      "email": "admin@mail.com"
  }
}
```




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
