import React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import sinon from 'sinon';

import Button from '../../src/components/Button';

test('renders a <button /> element with type: button', t => {
  const wrapper = shallow(<Button />);
  const btns = wrapper.find('button');
  // Pass only if a Button component is found
  if (btns.length > 0) {
    t.pass();
  } else {
    t.fail();
  }
  t.is(btns.props().type, 'button');
});

test('simulates click events', t => {
  const handleClick = sinon.spy();
  const wrapper = shallow(<Button onClick={handleClick} />);
  wrapper.find('button').simulate('click');
  t.true(handleClick.calledOnce);
});
