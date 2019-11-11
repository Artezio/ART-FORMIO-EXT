&nbsp;
# Clean up plugin for form.io
If you are not familiar with formio check it out [README](https://github.com/formio/formio).

### This plugin was created for validating form and omitting extra fields.

* The data will be validated
* Extra fields will be omitted in the response
* "Submit" field will be omitted in the response
* Nothing will be stored in the mongo database

## Prerequisites

* Formio server

## Usage

>POST     /:formPath/cleanUp

## Example
* *Example form path*: formPass
* *URL*: http://localhost:3001/formPass/cleanUp

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

1. In your formio server root folder rename file "server.js" to "server-origin.js";
2. Pull data from this repository.
3. Paste all files to you formio server root folder.
