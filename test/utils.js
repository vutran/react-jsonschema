import test from 'ava';
import types from '../src/constants/types';
import {
  getDefaultState,
  addEmptyValue,
} from '../src/utils';

test('retrieve the default state for an object', t => {
  const schema = {
    title: 'Object',
    type: types.OBJECT,
    properties: {
      prop_1: {
        title: 'String',
        type: types.STRING,
      },
      prop_2: {
        title: 'Number',
        type: types.NUMBER,
      },
    },
  };
  const expected = {
    prop_1: '',
    prop_2: 0,
  };
  t.deepEqual(getDefaultState(schema), expected);
});

test('retrieve the default state for an array of strings', t => {
  const schema = {
    title: 'Array',
    type: types.ARRAY,
    items: {
      title: 'String',
      type: types.STRING,
    },
  };
  t.deepEqual(getDefaultState(schema), ['']);
});

test('retrieve the default state for a string', t => {
  const schema = {
    title: 'String',
    type: types.STRING,
  };
  t.is(getDefaultState(schema), '');
});

test('retrieve the default state for a boolean', t => {
  const schema = {
    title: 'Boolean',
    type: types.BOOLEAN,
  };
  t.is(getDefaultState(schema), false);
});

test('retrieve the default state for a number', t => {
  const schema = {
    title: 'Number',
    type: types.NUMBER,
  };
  t.is(getDefaultState(schema), 0);
});

test('retrieve the default state for an integer', t => {
  const schema = {
    title: 'Integer',
    type: types.INTEGER,
  };
  t.is(getDefaultState(schema), 0);
});

test('retrieve the default state for null', t => {
  const schema = {
    title: 'Null',
    type: types.NULL,
  };
  t.is(getDefaultState(schema), null);
});

test('retrieve the default state for a complex object', t => {
  const schema = {
    title: 'Person',
    type: types.OBJECT,
    properties: {
      firstName: {
        title: 'First Name',
        type: types.STRING,
        default: 'Vu',
      },
      lastName: {
        title: 'Last Name',
        type: types.STRING,
        default: 'Tran',
      },
      age: {
        title: 'Age',
        type: types.NUMBER,
        default: 28,
      },
      websites: {
        title: 'Websites',
        type: types.ARRAY,
        default: [
          'https://twitter.com/tranvu/',
          'https://github.com/vutran/',
        ],
        items: {
          title: 'Website',
          type: types.STRING,
        },
      },
    },
  };
  const expected = {
    firstName: 'Vu',
    lastName: 'Tran',
    age: 28,
    websites: [
      'https://twitter.com/tranvu/',
      'https://github.com/vutran/',
    ],
  };
  t.deepEqual(getDefaultState(schema), expected);
});


test('retrieve the default state for a complex object with populated data', t => {
  const schema = {
    title: 'Person',
    type: types.OBJECT,
    properties: {
      firstName: {
        title: 'First Name',
        type: types.STRING,
      },
      lastName: {
        title: 'Last Name',
        type: types.STRING,
      },
      age: {
        title: 'Age',
        type: types.NUMBER,
      },
      websites: {
        title: 'Websites',
        type: types.ARRAY,
        items: {
          title: 'Website',
          type: types.STRING,
        },
      },
    },
  };
  const data = {
    firstName: 'Vu',
    lastName: 'Tran',
    age: 28,
    websites: [
      'https://twitter.com/tranvu/',
      'https://github.com/vutran/',
    ],
  };
  t.deepEqual(getDefaultState(schema, data), data);
});

test('adds a new empty value to a simple array', t => {
  const schema = {
    title: 'Array',
    type: types.ARRAY,
    items: {
      title: 'String',
      type: types.STRING,
    },
  };
  const data = [
    'https://twitter.com/tranvu/',
    'https://github.com/vutran/',
  ];
  const expected = [
    'https://twitter.com/tranvu/',
    'https://github.com/vutran/',
    '',
  ];
  t.deepEqual(addEmptyValue(schema, data), expected);
});

test('adds a new empty value to a complex array', t => {
  const schema = {
    title: 'Array',
    type: types.ARRAY,
    items: {
      title: 'Person',
      type: types.OBJECT,
      properties: {
        firstName: {
          title: 'First Name',
          type: types.STRING,
        },
        lastName: {
          title: 'Last Name',
          type: types.STRING,
        },
      },
    },
  };
  const data = [
    {
      firstName: 'Vu',
      lastName: 'Tran',
    },
  ];
  const expected = [
    {
      firstName: 'Vu',
      lastName: 'Tran',
    },
    {
      firstName: '',
      lastName: '',
    },
  ];
  t.deepEqual(addEmptyValue(schema, data), expected);
});

test('deletes an existing value from a simple array', t => {
  t.fail();
});

test('deletes an existing value from a complex array', t => {
  t.fail();
});
