export default function modalReducer(state, action ) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { open: true, dimmer: action.dimmer };
    case 'CLOSE_MODAL':
      return { open: false };
    case 'CLOSE_SIGN_UP_MODAL':
      return { open: false, toMainButton: true };
    default:
      throw new Error();
  }
}