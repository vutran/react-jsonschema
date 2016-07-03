import React from 'react';
import { shallow, mount } from 'enzyme';
import test from 'ava';
import sinon from 'sinon';
import { jsdom } from 'jsdom';

import types from '../../src/constants/types';
import Field from '../../src/components/Field';

test('renders an <input /> component', t => {
  const path = 'formData';
  const schema = { type: types.STRING };
  const formData = 'Vu Tran';
  const wrapper = shallow(
    <Field
      path={path}
      schema={schema}
      formData={formData}
    />
  );
  const inputProps = wrapper.find('input').props();
  t.is(inputProps.type, 'text');
  t.is(inputProps.value, formData);
});

test('find the ref of a mounted component', t => {
  global.document = jsdom('<html>');
  global.window = document.defaultView;
  const path = 'formData';
  const schema = { type: types.STRING };
  const formData = 'Vu Tran';
  const wrapper = mount(
    <Field
      path={path}
      schema={schema}
      formData={formData}
    />
  );
  const inputRef = wrapper.find(Field).first().node.inputRef;
  t.is(inputRef.type, 'text');
  t.is(inputRef.value, formData);
});

test('simulates a click event', t => {
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
  wrapper.find('input').simulate('change', {
    target: {
      value: 'Tran, Vu',
    },
  });
  t.true(handleChange.calledOnce);
});
