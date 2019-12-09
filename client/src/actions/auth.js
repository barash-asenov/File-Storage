import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CLEAR_PROFILE,
  SET_IS_SENDING_REQUEST
} from './types';

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/users');

    dispatch({
      type: USER_LOADED,
      payload: res.data.user
    });
  } catch (err) {

    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({ name, email, password, passwordConfirmation }) => async dispatch => {
  // Set isSendingRequest to true
  dispatch(setIsSendingRequest(true));

  const body = JSON.stringify({ name, email, password, passwordConfirmation });

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

    console.log(message);

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
  dispatch(setAlert('Logout success', 'primary'));
};


// Set Sending Request Status
export const setIsSendingRequest = (status) => dispatch => {
  dispatch({
    type: SET_IS_SENDING_REQUEST,
    payload: status
  });
};

