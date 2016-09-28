import types from '../src/constants/types';
import {
  getInputType,
  getDefaultState,
} from '../src/utils';

it('retrieve the input types based on the given schema', () => {
  const schemaDefault = { type: types.OBJECT };
  const schemaBoolean = { type: types.BOOLEAN };
  const schemaInteger = { type: types.INTEGER };
  const schemaNumber = { type: types.NUMBER };
  const schemaString = { type: types.STRING };
  expect(getInputType(schemaDefault)).toBe('text');
  expect(getInputType(schemaBoolean)).toBe('checkbox');
  expect(getInputType(schemaNumber)).toBe('number');
  expect(getInputType(schemaInteger)).toBe('number');
  expect(getInputType(schemaString)).toBe('text');
});

it('retrieve the default state for an object', () => {
  const schema = {
    title: 'Object',
    type: types.OBJECT,
    properties: {
      prop_1: {
        type: types.STRING,
      },
      prop_2: {
        type: types.NUMBER,
      },
      prop_3: {
        type: types.INTEGER,
      },
      prop_4: {
        type: types.BOOLEAN,
      },
      prop_5: {
        type: types.NULL,
      },
      prop_6: {
        // default null
      },
      prop_7: {
        type: types.ARRAY,
        items: {
          type: types.STRING,
        },
      },
      prop_8: {
        type: types.ARRAY,
        items: {
          type: types.OBJECT,
          properties: {
            prop_8_child_1: {
              type: types.STRING,
            },
          },
        },
      },
    },
  };
  const expected = {
    prop_1: '',
    prop_2: 0,
    prop_3: 0,
    prop_4: false,
    prop_5: null,
    prop_6: null,
    prop_7: [''],
    prop_8: [{ prop_8_child_1: '' }],
  };
  expect(getDefaultState(schema)).toEqual(expected);
});

it('retrieve the default state for an array of strings', () => {
  const schema = {
    title: 'Array',
    type: types.ARRAY,
    items: {
      title: 'String',
      type: types.STRING,
    },
  };
  expect(getDefaultState(schema)).toEqual(['']);
});

it('retrieve the default state for a string', () => {
  const schema = {
    title: 'String',
    type: types.STRING,
  };
  expect(getDefaultState(schema)).toBe('');
});

it('retrieve the default state for a boolean', () => {
  const schema = {
    title: 'Boolean',
    type: types.BOOLEAN,
  };
  expect(getDefaultState(schema)).toBeFalsy();
});

it('retrieve the default state for a number', () => {
  const schema = {
    title: 'Number',
    type: types.NUMBER,
  };
  expect(getDefaultState(schema)).toBe(0);
});

it('retrieve the default state for an integer', () => {
  const schema = {
    title: 'Integer',
    type: types.INTEGER,
  };
  expect(getDefaultState(schema)).toBe(0);
});

it('retrieve the default state for null', () => {
  const schema = {
    title: 'Null',
    type: types.NULL,
  };
  expect(getDefaultState(schema)).toBeNull();
});

it('retrieve the default state for a complex object', () => {
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
  expect(getDefaultState(schema)).toEqual(expected);
});


it('retrieve the default state for a complex object with populated data', () => {
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
  expect(getDefaultState(schema, data)).toEqual(data);
});
