# Set of plugins for formio

If you are not familiar with [formio](https://github.com/formio/formio) check it out [README](https://github.com/formio/formio).

&nbsp;
# Clean up plugin
Validate data and omit extra fields. Data will not be saved into mongoDB

## Usage

>POST     /form/formPath/cleanUp

## Example
* *Form path*: user/login
* *URL*: http://localhost:3001/form/user/login/cleanUp

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
Response:
```
{
  "_id": "5d9df42196ea0532f4c0832c",
  "owner": "5d9df42196ea0532f4c0832c",
  "roles": [
      "5d9df40296ea0532f4c0831e"
  ],
  "form": "5d9df40296ea0532f4c08322",
  "data": {
      "email": "admin@mail.com"
  },
  "access": [],
  "externalIds": [],
  "created": "2019-10-09T14:52:17.131Z",
  "modified": "2019-10-09T14:52:17.132Z"
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
