import React from 'react';
import { Form } from 'react-jsonschema'; // eslint-disable-line import/no-unresolved
import Paper from 'material-ui/Paper';
import schema from './schema.json';
import formData from './defaultData.json';
const log = msg => console.log(msg); // eslint-disable-line no-console

const style = {
  margin: 20,
  padding: 20,
};

const App = () => (
  <Paper style={style}>
    <Form
      schema={schema}
      formData={formData}
      onError={e => { log(e); }}
      onSubmit={e => { log(e); }}
    />
  </Paper>
);

export default App;
