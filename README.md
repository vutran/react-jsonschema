# React JSONSchema

[![Build Status](https://travis-ci.org/vutran/react-jsonschema.svg?branch=develop)](https://travis-ci.org/vutran/react-jsonschema) [![Coverage Status](https://coveralls.io/repos/github/vutran/react-jsonschema/badge.svg?branch=develop)](https://coveralls.io/github/vutran/react-jsonschema?branch=develop) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)]()

> Create beautiful forms with [JSONSchema](http://json-schema.org)
> Inspired by [react-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form) from Mozilla.

![](screenshot.png?raw=true)

## Installation

````bash
$ npm install --save react-jsonschema
````

## Usage

````js
import Form from 'react-jsonschema';

const schema = {
  "title": "Basic Demo",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First Name",
    },
    "lastName": {
      "type": "string",
      "title": "Last Name",
    },
    "age": {
      "type": "integer",
      "title": "Age",
      "description": "Age in years",
    },
  },
};

const formData = {
  firstName: '',
  lastName: '',
  age: '',
};

ReactDOM.render(
  <Form
    schema={schema}
    formData={formData}
    onError={errors => {
      console.log(errors);
    }}
    onSubmit={data => {
      console.log(data);
    }}
  />,
  document.getElementById('app'),
);
````

## Contributing

1. Clone the repository
2. Install dependencies

  **With `npm`:**

  ```bash
  $ npm install
  ```

  **With [`yarn`](https://github.com/yarnpkg/yarn):**

  ```bash
  $ yarn
  ```
3. Run tests: `npm t`

## References

- [JSON Schema](http://json-schema.org/)

## Support

Like what you see? [Become a Patron](https://www.patreon.com/vutran) and support me via a monthly donation.

## License

MIT © [Vu Tran](https://github.com/vutran/)
