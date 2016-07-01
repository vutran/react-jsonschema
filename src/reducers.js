import { cloneDeep, set, result } from 'lodash';
import types from './constants/types';
import { getDefaultState } from './utils';

/**
 * Takes a current state, and adds a new value in the state array.
 *
 * @param {Array} state - The current state to modify
 * @param {Object} action - The action payload
 * @param {String} action.path - The path to the array in the state object
 * @param {Object} action.schema - The schema to parse against
 * @return {Array} The new state
 */
export function addValueToState(state, action) {
  const newState = cloneDeep(state);
  const newArray = result(newState, action.path);
  switch (action.schema.type) {
    case types.ARRAY:
      newArray.push(getDefaultState(action.schema.items));
      break;
    default:
      // do nothing
  }
  set(newState, action.path, newArray);
  return newState;
}

/**
 * Takes a current state, and removes a value specified at the given
 * index and path to the array in the state object.
 *
 * @param {Object} state - The current state to modify
 * @param {Object} action - The action payload
 * @param {Number} action.index - The index of the value to remove
 * @param {String} action.path - The path to the array in the state object
 * @return {Object} The new state
 */
export function deleteIndexFromState(state, action) {
  const newState = cloneDeep(state);
  const values = result(newState, action.path);
  const newArray = [
    ...values.slice(0, action.index),
    ...values.slice(action.index + 1),
  ];
  set(newState, action.path, newArray);
  return newState;
}
