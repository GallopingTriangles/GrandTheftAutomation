import { combineReducers } from 'redux';
import userCommand from './userCommand';
import level from './level';

export default combineReducers({
  userCommand,
  level
});