import React, { Component } from 'react';
import axios from 'axios';

import { GameContainer } from "../components/Game";

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opponentPokemon: {},
      playerPokemon: {},
      player : ""
    };
  }


  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    // console.log(`LOCALSTORAGE : ${localStorage.getItem('jwtToken')}`);
    // console.log(`USER : ${JSON.stringify(this.props.location.state.user)}`);
    // console.log(`POKEMON : ${JSON.stringify(this.props.location.state.playerPokemon)}`);
    if(!this.props.location.state){
      this.props.history.push("/login");
      return false;
    }
    this.setState({player: this.props.location.state.user, playerPokemon : this.props.location.state.playerPokemon});

    axios.post('/api/pokemons/opponent')
      .then(res => {
        console.log(res)
        let difficulty = (Math.floor(Math.random() * 5))-2; 
        let opponentLVL = this.state.player.level + difficulty
        if(opponentLVL<=0) opponentLVL=1;
        let opponentHP = opponentLVL * 150;
        let opponent = {
          pokemonName : res.data.opponent.name,
          level : opponentLVL,
          hp : opponentHP,
          pokemonImg : res.data.opponent.animatedURL, 
          moves: this.props.location.state.pokeMoves
        }
        this.setState({ opponentPokemon: opponent});
        console.log(this.state.opponentPokemon);

      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render() {
    let {player, playerPokemon, opponentPokemon} = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                <img alt="Brand" src="/assets/images/pokemon_logo.png" className="img-responsive"/>
              </a>  
                        
            </div>
            
            <div className="navbar-text navbar-right">
              <a href="#" className="navbar-link">Luisaur</a>
              <h3 className="panel-title navbar-right">
                {
                  localStorage.getItem('jwtToken') &&
                  <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                }
                
              </h3> 
            </div>            
          </div>          
        </nav>
          
        <div className="container">
          <GameContainer opponentPokemon={opponentPokemon} player={player} playerPokemon={playerPokemon}/>
        </div>
      </div>
        );
      }
    }
    
export default Game;