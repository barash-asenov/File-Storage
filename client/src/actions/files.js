import axios from 'axios';
import {
  CLEAR_FILES,
  DELETE_FILE,
  GET_FILES,
  SET_LOADING_FILES
} from './types';

import { setAlert } from './alert';

export const getFiles = (username) => async dispatch => {
  dispatch(setLoadingFiles(true));

  try {
    const res = await axios.get(`/api/users/${username}/files`);

    dispatch({
      type: GET_FILES,
      payload: res.data
    });

    dispatch(setLoadingFiles(false));
  } catch (err) {
    dispatch(setAlert('Error occurred while trying to get files', 'danger'));

    dispatch(setLoadingFiles(false));
  }
};

export const clearFiles = () => dispatch => {
  dispatch({
    type: CLEAR_FILES
  })
};

export const deleteFile = (username, fileId) => async dispatch => {
  // TODO: Delete single file
  dispatch({
    type: DELETE_FILE
  })
};

export const setLoadingFiles = (loadingStatus) => dispatch => {
  dispatch({
    type: SET_LOADING_FILES,
    payload: loadingStatus
  });
};