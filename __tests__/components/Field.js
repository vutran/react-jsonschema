/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer from 'react-test-renderer';
import types from '../../src/constants/types';
import Field from '../../src/components/Field';

describe('<Field />', () => {
  it('should render a <Field /> component', () => {
    const path = 'formData';
    const schema = { title: 'Name', type: types.STRING };
    const formData = 'Vu Tran';
    const component = renderer.create(
      <Field
        path={path}
        schema={schema}
        formData={formData}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
