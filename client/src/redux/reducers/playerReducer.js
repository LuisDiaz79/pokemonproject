import { GET_LOGIN_INFO, GET_PLAYER_INFO, CLEAR_PLAYER_INFO, GET_PLAYER_LIST, GET_OPPONENT, CLEAR_OPPONENT } from '../actions/types';

let initialState = {
  items: [],
  item: {},
  logged: false,
  token: "",
  playerPokemon: {},
  playersList: [],
  opponent: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOGIN_INFO:

      //'...state' below, creates an object, populates it first with the values in 'state': {>> items: [] <<, item: {}},
      return {   //then 'items' below overwrites the previously assigned empty array with the payload (action.payload)
        ...state,   //current state
        items: action.payload,   //all posts
        logged: action.payload.success,
        token: action.payload.token
      };
    case GET_PLAYER_INFO:

      //'...state' below, creates an object, populates it first with the values in 'state': {>> items: [] <<, item: {}},
      return {   //then 'items' below overwrites the previously assigned empty array with the payload (action.payload)
        ...state,   //current state
        playerPokemon: action.payload   //all posts
      };
    case GET_OPPONENT:

      //'...state' below, creates an object, populates it first with the values in 'state': {>> items: [] <<, item: {}},
      return {   //then 'items' below overwrites the previously assigned empty array with the payload (action.payload)
        ...state,   //current state
        opponent: action.payload   //all posts
      };
    case CLEAR_PLAYER_INFO:
      let payload = action.payload;
      //'...state' below, creates an object, populates it first with the values in 'state': {>> items: [] <<, item: {}},
      return {   //then 'items' below overwrites the previously assigned empty array with the payload (action.payload)
        payload
      };
    case CLEAR_OPPONENT:
      
      //'...state' below, creates an object, populates it first with the values in 'state': {>> items: [] <<, item: {}},
      return {   //then 'items' below overwrites the previously assigned empty array with the payload (action.payload)
      ...state,   //current state
        opponent : action.payload
      };
    case GET_PLAYER_LIST:
      //'...state' below, creates an object, populates it first with the values in 'state': {>> items: [] <<, item: {}},
      return {   //then 'items' below overwrites the previously assigned empty array with the payload (action.payload)
        ...state,   //current state
        playersList: action.payload,
      };
    default:
      return state;
  }
}