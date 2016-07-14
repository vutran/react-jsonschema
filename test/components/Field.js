import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import sinon from 'sinon';

import types from '../../src/constants/types';
import Field from '../../src/components/Field';

test('renders a <TextField /> component', t => {
  const path = 'formData';
  const schema = { title: 'Name', type: types.STRING };
  const formData = 'Vu Tran';
  const wrapper = shallow(
    <Field
      path={path}
      schema={schema}
      formData={formData}
    />
  );
  const fieldProps = wrapper.find('TextField').props();
  t.is(fieldProps.name, path);
  t.is(fieldProps.floatingLabelText, schema.title);
  t.is(fieldProps.defaultValue, formData);
});

test('simulates a change event', t => {
  const path = 'formData';
  const schema = { type: types.STRING };
  const formData = 'Vu Tran';
  const handleChange = sinon.spy();
  const wrapper = shallow(
    <Field
      path={path}
      schema={schema}
      formData={formData}
      onChange={handleChange}
    />
  );
  wrapper.find('TextField').simulate('change', {
    target: {
      value: 'Tran, Vu',
    },
  });
  t.true(handleChange.calledOnce);
});
