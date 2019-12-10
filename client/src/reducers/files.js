import {
  DELETE_FILE,
  CLEAR_FILES,
  SET_LOADING_FILES,
  GET_FILES
} from '../actions/types';

const initialState = {
  files: [],
  loading: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FILES:
      return {
        ...state,
        files: payload
      };
    case CLEAR_FILES:
      return {
        ...state,
        files: []
      };
    case SET_LOADING_FILES:
      return {
        ...state,
        loading: payload
      };
    case DELETE_FILE:
      return {
        ...state,
        files: state.files.filter(file => file.id !== payload)
      };

    default:
      return state;
  }
}
