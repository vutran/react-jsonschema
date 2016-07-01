import test from 'ava';
import types from '../src/constants/types';
import {
  addValueToState,
  deleteIndexFromState,
} from '../src/reducers';

test('adds a new empty value to a simple array', t => {
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
  t.deepEqual(addValueToState(state, action), expected);
});

test('adds a new empty value to a complex array', t => {
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
  t.deepEqual(addValueToState(state, action), expected);
});

test('delete a value from an array in the state', t => {
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
  t.deepEqual(deleteIndexFromState(state, action), expected);
});
