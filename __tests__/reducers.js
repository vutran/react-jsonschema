import types from '../src/constants/types';
import {
  addValueToState,
  deleteIndexFromState,
} from '../src/reducers';

it('adds a new empty value to a simple array', () => {
  const schema = {
    type: types.ARRAY,
    items: {
      type: types.STRING,
    },
  };
  const state = {
    websites: [
      'https://twitter.com/tranvu/',
      'https://github.com/vutran/',
    ],
  };
  const action = {
    path: 'websites',
    schema,
  };
  const expected = {
    websites: [
      'https://twitter.com/tranvu/',
      'https://github.com/vutran/',
      '',
    ],
  };
  expect(addValueToState(state, action)).toEqual(expected);
});

it('adds a new empty value to a complex array', () => {
  const schema = {
    type: types.ARRAY,
    items: {
      type: types.OBJECT,
      properties: {
        firstName: {
          type: types.STRING,
        },
        lastName: {
          type: types.STRING,
        },
      },
    },
  };
  const state = {
    contacts: [
      {
        firstName: 'Vu',
        lastName: 'Tran',
      },
    ],
  };
  const action = {
    path: 'contacts',
    schema,
  };
  const expected = {
    contacts: [
      {
        firstName: 'Vu',
        lastName: 'Tran',
      },
      {
        firstName: '',
        lastName: '',
      },
    ],
  };
  expect(addValueToState(state, action)).toEqual(expected);
});

it('delete a value from an array in the state', () => {
  const state = {
    formData: {
      websites: [
        'https://twitter.com/tranvu',
        'https://github.com/vutran',
        'https://google.com',
        'https://facebook.com',
      ],
    },
  };
  const action = {
    index: 2,
    path: 'formData.websites',
  };
  const expected = {
    formData: {
      websites: [
        'https://twitter.com/tranvu',
        'https://github.com/vutran',
        'https://facebook.com',
      ],
    },
  };
  expect(deleteIndexFromState(state, action)).toEqual(expected);
});
