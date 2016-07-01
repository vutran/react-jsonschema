import React, { Component, PropTypes } from 'react';
import Field from './Field';
import AddButton from './AddButton';
import DeleteButton from './DeleteButton';
import types from '../constants/types';

class SchemaField extends Component {
  getFields(propId, schema, formData) {
    const { onChange, onAddItem, onDeleteItem } = this.props;
    // set the prop id prefix to keep track of it's path
    const propIdPrefix = propId || 'formData';
    // Recursively generate child SchemaField for each property
    if (schema.type === types.OBJECT) {
      return Object.keys(schema.properties).map((p, i) => {
        const childSchema = schema.properties[p];
        const childFormData = formData ? formData[p] : '';
        return (
          <SchemaField
            key={i}
            propId={`${propIdPrefix}.${p}`}
            schema={childSchema}
            formData={childFormData}
            onChange={onChange}
            onAddItem={onAddItem}
            onDeleteItem={onDeleteItem}
          />
        );
      });
    } else if (schema.type === types.ARRAY) {
      return formData.map((f, i) => {
        /**
         * Deletes the existing item based on the given schema and
         * pushes an event up the component tree
         */
        const handleDeleteItem = () => {
          this.props.onDeleteItem({
            index: i,
            path: propIdPrefix,
          });
        };
        return (
          <div key={i}>
            <SchemaField
              key={i}
              propId={`${propIdPrefix}[${i}]`}
              schema={schema.items}
              formData={f}
              onChange={onChange}
              onAddItem={onAddItem}
              onDeleteItem={onDeleteItem}
            />
            <DeleteButton onClick={handleDeleteItem} />
          </div>
        );
      });
    }
    return (
      <Field
        propId={propId}
        schema={schema}
        formData={formData}
        onChange={onChange}
      />
    );
  }

  getButtons(schema) {
    if (schema.type === types.ARRAY) {
      return <AddButton onClick={::this.handleAddItem} />;
    }
    return null;
  }

  /**
   * Creates a new empty value based on the current schema,
   * and the current formData.
   */
  handleAddItem() {
    const { propId, schema } = this.props;
    this.props.onAddItem({
      path: propId,
      schema,
    });
  }

  render() {
    const { propId, schema, formData } = this.props;
    return (
      <div>
        <div>{this.getFields(propId, schema, formData)}</div>
        {this.getButtons(schema)}
      </div>
    );
  }
}

SchemaField.propTypes = {
  id: PropTypes.string,
  propId: PropTypes.string,
  schema: PropTypes.object,
  formData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func, // { propId, schema, value }
  onAddItem: PropTypes.func, // { path, schema }
  onDeleteItem: PropTypes.func, // { index, path }
};

export default SchemaField;
