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
  } catch (error) {
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
  try {
    await axios.delete(`/api/users/${username}/files/${fileId}`);

    dispatch({
      type: DELETE_FILE,
      payload: fileId
    });
  } catch (error) {
    dispatch(setAlert('Error occurred while trying to delete file', 'danger'));
  }
};

export const setLoadingFiles = (loadingStatus) => dispatch => {
  dispatch({
    type: SET_LOADING_FILES,
    payload: loadingStatus
  });
};