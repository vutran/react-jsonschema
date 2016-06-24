import React, { Component } from 'react';
import { Form } from 'react-jsonschema';
import schema from './schema.json';
import formData from './defaultData.json';

export default class App extends Component {
  render() {
    return (
      <Form
        schema={schema}
        formData={formData}
        onError={e => { console.log(e); } }
        onSubmit={e => { console.log(e); } }
      />
    );
  }
}
