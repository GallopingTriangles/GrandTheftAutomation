import { combineReducers } from 'redux';
import level from './level';
import user from './user';
import currentCode from './currentCode';

export default combineReducers({
  level,
  user,
  currentCode
});