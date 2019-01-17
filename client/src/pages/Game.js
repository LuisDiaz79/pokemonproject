import React, { Component } from 'react';
import axios from 'axios';

import { GameContainer } from "../components/Game";

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      oponentPokemon: {
        name : "CHARMANDER"
      },
      playerPokemon: {
        name : "BLASTOIDE"
      }
    };
  }


  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    console.log(`LOCALSTORAGE : ${localStorage.getItem('jwtToken')}`);
    axios.get('/api/players')
      .then(res => {
        this.setState({ pokemons: res.data });
        console.log(this.state.pokemons);
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
    return (
      <div className="container">
        <GameContainer oponentPokemon={this.state.oponentPokemon} playerPokemon={this.state.playerPokemon}/>


      <h3 className="panel-title">
        {
          localStorage.getItem('jwtToken') &&
          <button className="btn btn-primary" onClick={this.logout}>Logout</button>
        }
      </h3>


      </div >
    );
  }
}

export default Game;