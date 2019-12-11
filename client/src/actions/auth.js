import axios from 'axios';
import { setAlert } from './alert';
import { clearFiles } from './files';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CLEAR_PROFILE,
  SET_IS_SENDING_REQUEST,
  CHANGE_USER_CREDENTIALS,
} from './types';

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/auth/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data.user
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });

    dispatch(clearFiles());
  }
};

// Register User
export const register = ({ name, username, email, password, passwordConfirmation }) => async dispatch => {
  // Set isSendingRequest to true
  dispatch(setIsSendingRequest(true));

  const body = JSON.stringify({ name, username, email, password, passwordConfirmation });

  try {
    const res = await axios.post('/api/users', body);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    // Load user
    dispatch(loadUser());

    // Register success alert
    dispatch(setAlert('Successfully registered', 'primary'));

    // Set isSending Request to false
    dispatch(setIsSendingRequest(false));
  } catch (error) {
    const { message } = error.data;

    dispatch(setAlert(message, 'danger'));

    dispatch({
      type: REGISTER_FAIL
    });

    // Set isSending Request to false
    dispatch(setIsSendingRequest(false));
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  // Set sending request true for showing loading indicator
  dispatch(setIsSendingRequest(true));

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth/login', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    // Load user
    dispatch(loadUser());

    // Set alert
    dispatch(setAlert('Login Success', 'primary'));

    // Set is sending request
    dispatch(setIsSendingRequest(false));
  } catch (error) {
    const { message } = error.data;

    dispatch(setAlert(message, 'danger'));

    dispatch({
      type: LOGIN_FAILED
    });

    // Set is sending request
    dispatch(setIsSendingRequest(false));
  }
};

// Logout
export const logout = () => dispatch => {
  // Also clear the profile.
  dispatch({
    type: CLEAR_PROFILE
  });
  dispatch({
    type: LOGOUT
  });
  dispatch(clearFiles());
  dispatch(setAlert('Logout success', 'primary'));
};


// Set Sending Request Status
export const setIsSendingRequest = (status) => dispatch => {
  dispatch({
    type: SET_IS_SENDING_REQUEST,
    payload: status
  });
};

// Change user credentials
export const changeUserCredentials = ({ name, email, username }) => async dispatch => {
  try {
    await axios.put(`/api/users/${username}`, { name, email });

    dispatch({
      type: CHANGE_USER_CREDENTIALS,
      payload: {
        name,
        email
      }
    });

    dispatch(setAlert('Credentials has been changed!', 'primary'));
  } catch (error) {
    dispatch(setAlert('Could not change credentials', 'danger'));
  }
};

export const changeUserPassword = ({ password, username }) => async dispatch => {
  try {
    await axios.put(`/api/users/${username}`, { password });

    dispatch(setAlert('Password has been changed!', 'primary'));
  } catch (error) {
    dispatch(setAlert('Could not change password', 'danger'));
  }
};

export const removeAccount = (username) => async dispatch => {
  try {
    await axios.delete(`/api/users/${username}`);

    dispatch(setAlert('User deleted!', 'primary'));

    dispatch(logout())
  } catch (error) {
    dispatch(setAlert('Could not delete user', 'danger'));
  }
};


