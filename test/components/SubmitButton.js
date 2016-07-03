import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import sinon from 'sinon';

import SubmitButton from '../../src/components/SubmitButton';
import Button from '../../src/components/Button';

test('renders a <Button /> component with type: submit', t => {
  const wrapper = shallow(<SubmitButton />);
  const btns = wrapper.find(Button);
  // Pass only if a Button component is found
  if (btns.length > 0) {
    t.pass();
  } else {
    t.fail();
  }
  t.is(btns.props().type, 'submit');
});

test('renders a <Button /> with children', t => {
  const wrapper = shallow(<SubmitButton />);
  t.true(wrapper.find(Button).contains('Submit'));
});

test('simulates click events', t => {
  const handleClick = sinon.spy();
  const wrapper = shallow(<SubmitButton onClick={handleClick} />);
  wrapper.find(Button).simulate('click');
  t.true(handleClick.calledOnce);
});
