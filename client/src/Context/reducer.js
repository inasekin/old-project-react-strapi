

let user = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).user
  : '';
let token = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).jwt
  : '';

export const initialState = {
  userDetails: '' || user,
  token: '' || token,
  loading: false,
  errorMessage: null
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true
      };
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.jwt,
        loading: false
      };
    case 'REQUEST_SIGN_UP':
      return {
        ...initialState,
        loading: true
      };
    case 'SIGN_UP_SUCCESS':
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.jwt,
        loading: false
      };
    case 'LOGOUT':
      return {
        ...initialState,
        user: '',
        token: ''
      };
    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };
    case 'SIGN_UP_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};