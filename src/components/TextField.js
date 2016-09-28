import React, { Component, PropTypes } from 'react';
import { style } from 'glamor';
import { getInputType } from '../utils';

const TextField = class extends Component {
  render() {
    const { schema, formData, label, name, onChange } = this.props;

    const baseStyle = style({
      marginBottom: 15,
    });

    const labelStyle = style({
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 10,
      fontSize: 11,
      boxSizing: 'border-box',
      color: '#00bcd4',
    });

    const inputStyle = style({
      width: '100%',
      fontSize: 14,
      boxSizing: 'border-box',
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      outline: 0,
    });

    return (
      <div {...baseStyle}>
        <label {...labelStyle} htmlFor={name}>{label}</label>
        <input
          {...inputStyle}
          type={getInputType(schema, formData)}
          name={name}
          value={formData}
          onChange={onChange}
          ref={(c) => { this.c = c; }}
        />
      </div>
    );
  }
};

TextField.propTypes = {
  schema: PropTypes.object,
  formData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default TextField;
