import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';

import types from '../../src/constants/types';
import Form from '../../src/components/Form';
import SchemaField from '../../src/components/SchemaField';

test('renders a <Form /> component', t => {
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
  const wrapper = shallow(
    <Form
      schema={schema}
      formData={formData}
    />
  );
  t.true(wrapper.find('form').length >= 1);
  t.true(wrapper.find(SchemaField).length >= 1);
  t.deepEqual(wrapper.state().formData, formData);
});
