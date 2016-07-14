import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import Field from './Field';
import types from '../constants/types';

class SchemaField extends Component {
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
          <ListItem key={i}>
            <SchemaField
              key={i}
              path={`${pathPrefix}[${i}]`}
              schema={schema.items}
              formData={f}
              onChange={onChange}
              onAddItem={onAddItem}
              onDeleteItem={onDeleteItem}
            />
            <RaisedButton label="Remove" onClick={handleDeleteItem} />
          </ListItem>
        );
      });
      return (
        <div>
          <Divider />
          <Subheader>{schema.title}</Subheader>
          <List>{listItems}</List>
          {this.getButtons(schema)}
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
      return <RaisedButton label="Add" onClick={::this.handleAddItem} />;
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
