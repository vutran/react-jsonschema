import React from 'react';
import { shallow } from 'enzyme';
import types from '../../src/constants/types';
import Field from '../../src/components/Field';

describe('<Field onChange={} />', () => {
  it('should simulate a change event', () => {
    const path = 'formData';
    const schema = { type: types.STRING };
    const formData = 'Vu Tran';
    const handleChange = jest.fn();
    const component = shallow(
      <Field
        path={path}
        schema={schema}
        formData={formData}
        onChange={handleChange}
      />
    );
    // simulate a change
    const fakeEvent = {
      target: {
        value: 'Tran, Vu',
      },
    };
    component.find('[name="formData"]').simulate('change', fakeEvent);
    expect(handleChange).toBeCalled();
  });
});
