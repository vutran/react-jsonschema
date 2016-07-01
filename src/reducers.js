import { set, extend, result } from 'lodash';

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
  const newState = extend({}, state);
  const values = result(newState, action.path);
  const newArray = [
    ...values.slice(0, action.index),
    ...values.slice(action.index + 1),
  ];
  set(newState, action.path, newArray);
  return newArray;
}
