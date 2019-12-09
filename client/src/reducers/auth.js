import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  SET_IS_SENDING_REQUEST
} from '../actions/types';

const initialState = {
  authToken: '',
  isAuthenticated: false,
  loading: true,
  user: null,
  isSendingRequest: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        authToken: payload.auth_token,
        isAuthenticated: true,
        isLoading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAILED:
    case LOGOUT:
      return {
        ...state,
        authToken: null,
        user: null,
        isAuthenticated: false,
        loading: false
      };
    case SET_IS_SENDING_REQUEST:
      return {
        ...state,
        isSendingRequest: action.payload
      };

    default:
      return state;
  }
}
