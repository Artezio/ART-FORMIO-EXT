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
We have a form in our formio server with two fields: "email" and "password". This form has following path: "formPath".

Request URL:

http://localhost:3001/formPath/cleanUp

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

"password" field was removed from response due to another logic.


## Install instruction:

To install this patch, follow the instructions below:

1. In your formio server root folder rename file "server.js" to "server-origin.js";
2. Copy server.js file and src folder from ART-FORMIO-EXT and paste them into your formio server root folder.
