import React from 'react';
import { Form } from 'react-jsonschema'; // eslint-disable-line import/no-unresolved
import schema from './schema.json';
import formData from './defaultData.json';

const log = msg => console.log(msg); // eslint-disable-line no-console

const App = () => (
  <Form
    schema={schema}
    formData={formData}
    onError={e => { log(e); }}
    onSubmit={e => { log(e); }}
  />
);

export default App;
