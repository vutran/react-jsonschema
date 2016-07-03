import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import sinon from 'sinon';

import DeleteButton from '../../src/components/DeleteButton';
import Button from '../../src/components/Button';

test('renders a <Button /> component with type: button', t => {
  const wrapper = shallow(<DeleteButton />);
  const btns = wrapper.find(Button);
  // Pass only if a Button component is found
  if (btns.length > 0) {
    t.pass();
  } else {
    t.fail();
  }
  t.is(btns.props().type, 'button');
});

test('renders a <Button /> with children', t => {
  const wrapper = shallow(<DeleteButton />);
  t.true(wrapper.find(Button).contains('Delete'));
});

test('simulates click events', t => {
  const handleClick = sinon.spy();
  const wrapper = shallow(<DeleteButton onClick={handleClick} />);
  wrapper.find(Button).simulate('click');
  t.true(handleClick.calledOnce);
});
