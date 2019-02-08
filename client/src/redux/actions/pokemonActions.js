import { GET_PLAYER_INFO } from './types';
import axios from 'axios';

export let getPlayerInfo = (username, password) => {
    return (dispatch) => {   //'dispatch', courtesy of the Thunk middleware so we can call it directly

        axios.post('/api/auth/login', { username, password })
            .then((result) => {
                console.log(result);
                dispatch({        //This object is the 'action' obj returned to the reducer
                    type: GET_PLAYER_INFO,
                    payload: result.data
                });

            })

    }
}
