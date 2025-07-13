const { SET_ALERT, REMOVE_ALERT } = require('../actions/types');

const initalState = [];

export default function alertReducer(state = initalState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
