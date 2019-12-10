import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import files from './files';

export default combineReducers({
  alert,
  auth,
  files
});
