
import React, { Component, PropTypes } from 'react';
import TextField from './TextField';

class Field extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { schema, path } = this.props;
    this.props.onChange({
      schema,
      path,
      value: e.target.value,
    });
  }

  render() {
    const { path, schema, formData } = this.props;
    return (
      <TextField
        schema={schema}
        formData={formData}
        name={path}
        label={schema.title}
        onChange={this.handleChange}
      />
    );
  }
}

Field.propTypes = {
  path: PropTypes.string,
  schema: PropTypes.object,
  formData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func, // { path, schema, value }
};

export default Field;
