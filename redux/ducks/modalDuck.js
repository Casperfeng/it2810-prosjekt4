// Actions
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

// Reducer
export default function modalReducer(state = {}, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...action.payload, show: true };
    case CLOSE_MODAL:
      return { ...action.payload, show: false };
    default:
      return state;
  }
}

// Action creator
export function openModal(
  pokemon = {
    id: 0,
    types: [],
    stats: [],
    name: ''
  }
) {
  return {
    type: OPEN_MODAL,
    payload: pokemon
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}
