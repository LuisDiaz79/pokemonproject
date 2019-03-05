import { GET_LOGIN_INFO, GET_PLAYER_INFO, CLEAR_PLAYER_INFO, GET_PLAYER_LIST, GET_OPPONENT, CLEAR_OPPONENT } from './types';
import axios from 'axios';

export let getLoginInfo = (username, password) => {
    return (dispatch) => {   //'dispatch', courtesy of the Thunk middleware so we can call it directly
        axios.post('/api/auth/login', { username, password })
        .then(result => {
            console.log(result);
            dispatch({        //This object is the 'action' obj returned to the reducer
                type: GET_LOGIN_INFO,
                payload: result.data
            });
        })
    }
}

export let getPlayerPokemon = (pokemonAPIID) =>{
    return (dispatch) => {   //'dispatch', courtesy of the Thunk middleware so we can call it directly
    axios.get('/api/pokemons/?apiId=' + pokemonAPIID)
    .then(result => {
        console.log(result);
        dispatch({        //This object is the 'action' obj returned to the reducer
            type: GET_PLAYER_INFO,
            payload: result.data[0]
        });
    }).catch(err =>console.log(err))
}
}

let findPokemonById = (id)=>{
    console.log("findPokemonById");
    return axios.get('/api/pokemons/?apiId=' + id)
    .then(res => res.data[0])
}

export let getPlayerList=()=>{
    return (dispatch) => {   
        axios.get('/api/players')
        .then(players => {
            
            let playersRes = players.data;
            let finalPlayerList = [];
            Promise.all(playersRes.map((player)=>{
            return (findPokemonById(player.pokemonAPIID)
                .then(oppRes => {
                player.animatedURL = oppRes.animatedURL;
                finalPlayerList.push(player);
                })
            )
            }))
            dispatch({        //This object is the 'action' obj returned to the reducer
                type: GET_PLAYER_LIST,
                payload: finalPlayerList
            });
        })
    }
}

export let getOpponenInfo = (playerLvl) =>{
    return (dispatch) => {  
        
    axios.post('/api/pokemons/opponent')
      .then(res => {
        console.log(res);
        let difficulty = (Math.floor(Math.random() * 5)) - 2;
        let opponentLVL = playerLvl + difficulty
        if (opponentLVL <= 0) opponentLVL = 1;
        let opponentHP = opponentLVL * 100;
        let opponent = {
          pokemonName: res.data.opponent.name,
          level: opponentLVL,
          hp: opponentHP,
          pokemonImg: res.data.opponent.animatedURL,
          moves: res.data.pokeMoves,
          totalhp: opponentHP
        }
        console.log(opponent);
        dispatch({        //This object is the 'action' obj returned to the reducer
            type: GET_OPPONENT,
            payload: opponent
        });
      })
    }
}

export let opponentFail = () =>{
    let opponentPokemon = {
        pokemonName: "XxxX",
        level: 0,
        hp: 0,
        pokemonImg: "",
        moves: []
      }

    return (
        {
            type: CLEAR_OPPONENT,
            payload : opponentPokemon
        }
    )
}

export let logout = ()=>{
    let out = {
        logged: false,
        token: "",
        playerPokemon: {},
        playersList: [],
        opponent: {}    
    }

    return (
        {
            type: CLEAR_PLAYER_INFO,
            payload : out
        }
    );
}