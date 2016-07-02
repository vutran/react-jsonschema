
import React, { Component, PropTypes } from 'react';
import { getInputType } from '../utils';

class Field extends Component {
  handleChange(e) {
    const { schema, path } = this.props;
    this.props.onChange({
      schema,
      path,
      value: e.target.value,
    });
  }

  render() {
    const { schema, formData } = this.props;
    return (
      <div>
        <label>{schema.title}</label>
        <input
          type={getInputType(schema, formData)}
          value={formData}
          ref={c => { this.inputRef = c; }}
          onChange={::this.handleChange}
        />
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
