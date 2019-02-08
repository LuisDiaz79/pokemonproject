import { GET_PLAYER_INFO } from '../actions/types';

let initialState = {
  items: [],
  item: {}
}

export default function(state = initialState, action){
  switch(action.type){
    case GET_PLAYER_INFO:
      //'...state' below, creates an object, populates it first with the values in 'state': {>> items: [] <<, item: {}},
      return{   //then 'items' below overwrites the previously assigned empty array with the payload (action.payload)
        ...state,   //current state
        items: action.payload   //all posts
      };
    default:
      return state;
  }
}