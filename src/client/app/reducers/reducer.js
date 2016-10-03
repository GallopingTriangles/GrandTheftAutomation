import { combineReducers } from 'redux';
// import userCommand from './userCommand';
import level from './level';
import user from './user';
import currentCode from './currentCode';

export default combineReducers({
  // userCommand,
  level,
  user,
  currentCode
});