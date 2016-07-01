import test from 'ava';
import {
  deleteIndexFromState,
} from '../src/reducers';

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
  const expected = [
    'https://twitter.com/tranvu',
    'https://github.com/vutran',
    'https://facebook.com',
  ];
  t.deepEqual(deleteIndexFromState(state, action), expected);
});
