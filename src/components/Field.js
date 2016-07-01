
import React, { Component, PropTypes } from 'react';
import { getInputType } from '../utils';

class Field extends Component {
  handleChange(e) {
    const { schema, propId } = this.props;
    this.props.onChange({
      schema,
      propId,
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
  propId: PropTypes.string,
  schema: PropTypes.object,
  formData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func, // { propId, schema, value }
};

export default Field;
