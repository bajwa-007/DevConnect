const { SET_ALERT, REMOVE_ALERT } = require('../actions/types');

const initalState = [
  {
    id: 1,
    msg: 'Please log in',
    alertType: 'info',
  },
];

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
