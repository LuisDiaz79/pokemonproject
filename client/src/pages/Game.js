import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemons: []
    };
  }

  
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/pokemons')
      .then(res => {
        this.setState({ pokemons: res.data });
        console.log(this.state.pokemons);
      })
      .catch((error) => {
        console.log(error);
        if(error.response.status === 401) {
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
        <div className="game">
  <div className="opponent">
    <div className="stats">
      <div className="top">
        <div className="pokeballs">
          <div className="pokeball"></div>
          <div className="pokeball"></div>
          <div className="pokeball"></div>
          <div className="pokeball"></div>
          <div className="pokeball"></div>
        </div>
        <div id = "apHP" className="hp-count">100</div>
      </div>
      <span className="name">
        Charizard
      </span>
      <span className="level">
        86
      </span>
    </div>
    <img className="pokemon" src="http://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif" alt ="A sprite of charizard" />
  </div>
  <div className="player">
    <div className="stats">
      <div className="top">
        <div className="pokeballs">
          <div className="pokeball"></div>
          <div className="pokeball"></div>
          <div className="pokeball"></div>
          <div className="pokeball"></div>
          <div className="pokeball"></div>
        </div>
        <div id = "myHP" className="hp-count">100</div>
      </div>
      <span className="name">
        Blastoise
      </span>
      <span className="level">
        86
      </span>
    </div>
    <img className="pokemon" src="http://bit.ly/blastoisegif" alt="A gif from blastoises back sprite" />
  </div>
</div>
<div className="box">
  <div id = "message" className="message">
    What should Blastoise do?
  </div>
  <div className="actions">
    <button onclick = "waterCannon()">Water Cannon</button>
    <button onclick = "waterPulse()">Water Pulse</button>
    <button onclick = "surf()">Surf</button>
    <button onclick = "tackle()">Tackle</button>
  </div>
  <div className = "continue">
    <button onclick = "compPokemon()">Continue</button>
  </div>
</div>
      </div>
    );
  }
}

export default Home;