import axios from 'axios';

const { hostname } = window.location;

export function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
}