/********* THIS IS THE ROOT REDUCER *********/
import { combineReducers } from 'redux';
import playerReducer from './playerReducer';

export default combineReducers({
  player: playerReducer
});
/********************************************/