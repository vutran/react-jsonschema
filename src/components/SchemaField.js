import React, { Component, PropTypes } from 'react';
import { style } from 'glamor';
import Field from './Field';
import types from '../constants/types';

const olStyle = style({
  margin: 0,
  padding: 15,
  boxSizing: 'border-box',
});

const liStyle = style({
  listStyleType: 'none',
  margin: 15,
  boxSizing: 'border-box',
});

const btnStyle = style({
  border: 1,
  borderRadius: 2,
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  fontWeight: 500,
  fontSize: 14,
  padding: 0,
  margin: 0,
  outline: 0,
  height: 36,
  lineHeight: '36px',
  textAlign: 'center',
  textTransform: 'uppercase',
  boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
  minWidth: 88,
});

class SchemaField extends Component {
  constructor(props) {
    super(props);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  getFields(path, schema, formData) {
    const { onChange, onAddItem, onDeleteItem } = this.props;
    // set the prop id prefix to keep track of it's path
    const pathPrefix = path || 'formData';
    // Recursively generate child SchemaField for each property
    if (schema.type === types.OBJECT) {
      return Object.keys(schema.properties).map((p, i) => {
        const childSchema = schema.properties[p];
        const childFormData = formData ? formData[p] : '';
        return (
          <SchemaField
            key={i}
            path={`${pathPrefix}.${p}`}
            schema={childSchema}
            formData={childFormData}
            onChange={onChange}
            onAddItem={onAddItem}
            onDeleteItem={onDeleteItem}
          />
        );
      });
    } else if (schema.type === types.ARRAY) {
      const listItems = formData.map((f, i) => {
        /**
         * Deletes the existing item based on the given schema and
         * pushes an event up the component tree
         */
        const handleDeleteItem = () => {
          this.props.onDeleteItem({
            index: i,
            path: pathPrefix,
          });
        };
        return (
          <li {...liStyle} key={i}>
            <SchemaField
              key={i}
              path={`${pathPrefix}[${i}]`}
              schema={schema.items}
              formData={f}
              onChange={onChange}
              onAddItem={onAddItem}
              onDeleteItem={onDeleteItem}
            />
            <button {...btnStyle} onClick={handleDeleteItem}>Remove</button>
          </li>
        );
      });
      return (
        <div>
          <h2>{schema.title}</h2>
          <div>
            <ol {...olStyle}>{listItems}</ol>
          </div>
          <div>
            {this.getButtons(schema)}
          </div>
        </div>
      );
    }
    return (
      <Field
        path={path}
        schema={schema}
        formData={formData}
        onChange={onChange}
      />
    );
  }

  getButtons(schema) {
    if (schema.type === types.ARRAY) {
      return <button {...btnStyle} onClick={this.handleAddItem}>Add</button>;
    }
    return null;
  }

  /**
   * Creates a new empty value based on the current schema,
   * and the current formData.
   */
  handleAddItem() {
    const { path, schema } = this.props;
    this.props.onAddItem({
      path,
      schema,
    });
  }

  render() {
    const { path, schema, formData } = this.props;
    const style = {
      marginBottom: 15,
    };
    return (
      <div style={style}>
        {this.getFields(path, schema, formData)}
      </div>
    );
  }
}

SchemaField.propTypes = {
  id: PropTypes.string,
  path: PropTypes.string,
  schema: PropTypes.object,
  formData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func, // { path, schema, value }
  onAddItem: PropTypes.func, // { path, schema }
  onDeleteItem: PropTypes.func, // { index, path }
};

export default SchemaField;
