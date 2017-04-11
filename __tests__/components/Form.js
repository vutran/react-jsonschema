import React from 'react';
import renderer from 'react-test-renderer';
import types from '../../src/constants/types';
import Form from '../../src/components/Form';

it('should render a <Form /> component', () => {
  const schema = {
    type: types.OBJECT,
    properties: {
      firstName: {
        type: types.STRING,
      },
      lastName: {
        type: types.STRING,
      },
    },
  };
  const formData = {
    firstName: 'Vu',
    lastName: 'Tran',
  };
  const component = renderer.create(
    <Form
      schema={schema}
      formData={formData}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
