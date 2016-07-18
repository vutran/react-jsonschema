
import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { getInputType } from '../utils';
import types from '../constants/types';

class Field extends Component {
  getInputField(path, schema, formData) {
    switch (schema.type) {
      case types.STRING:
      case types.NUMBER:
      case types.INTEGER: {
        return (
          <TextField
            name={path}
            fullWidth={true}
            floatingLabelText={schema.title}
            defaultValue={formData}
            onChange={::this.handleChange}
          />
        );
      }
      default:
        return (
          <input
            type={getInputType(schema, formData)}
            value={formData}
            ref={c => { this.inputRef = c; }}
            onChange={::this.handleChange}
          />
        );
    }
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
      <div>
        {this.getInputField(path, schema, formData)}
      </div>
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
