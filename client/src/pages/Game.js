import React, { Component } from 'react';
import axios from 'axios';

import { Redirect } from 'react-router'
import { GameContainer } from "../components/Game";

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message : "",
      newGameBtn : false,
      backBtn : false,
      opponentPokemon: {},
      playerPokemon: {},
      player : "",
      mypokeMoves : []
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
    this.setState({
      player: this.props.location.state.user, 
      playerPokemon : this.props.location.state.playerPokemon,
      myPokeMoves : this.props.location.state.myPokeMoves
    });
    
    axios.post('/api/pokemons/opponent')
      .then(res => {
        let difficulty = (Math.floor(Math.random() * 5))-2; 
        let opponentLVL = this.state.player.level + difficulty
        if(opponentLVL<=0) opponentLVL=1;
        let opponentHP = opponentLVL * 100;
        let opponent = {
          pokemonName : res.data.opponent.name,
          level : opponentLVL,
          hp : opponentHP,
          pokemonImg : res.data.opponent.animatedURL, 
          moves: this.props.location.state.pokeMoves
        }
        let player = this.state.player;
        player.hp = (this.state.player.level * 100)
        this.setState({ 
          opponentPokemon: opponent, 
          player : player,
          message : `What should ${!this.state.playerPokemon.name ? "":this.state.playerPokemon.name} do?`
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  onClickPlayerAttack = (move) =>{
    console.log(move);
    let miss = Math.floor((Math.random() * 10) + 1);
    let message = "";
    let opponentPokemon = this.state.opponentPokemon;
    if(miss == 1){
      message = `${this.state.playerPokemon.name}'s attack missed!`;
    } else{
      message = `${this.state.playerPokemon.name} used ${move}`;
      var critical = Math.floor((Math.random() * 10) + 1);
      var attack = Math.floor((Math.random() * 30) + 1);
      if(critical == 4){
        opponentPokemon.hp = (opponentPokemon.hp - (attack*2));
      }else{
        opponentPokemon.hp = opponentPokemon.hp - attack;
      }
    }
    if(opponentPokemon.hp <=0){
      message = `${this.state.opponentPokemon.pokemonName} fainted`; 
      opponentPokemon.hp = 0;
    }

    this.setState({
      message : message,
      opponentPokemon : opponentPokemon
    });
  }
  goBack = () => {
    this.setState({
      backBtn:true
    });
  }
  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render() {

    if (this.state.backBtn) {
      return   <Redirect to={{
        pathname: "/dashboard",
        state: { 
          userInfo: this.state.userInfo,
          myPokeMoves : this.state.playerPokemon.pokeMoves
        }
      }}/>

    }
    if (this.state.newGameBtn) {
      return   <Redirect to={{
        pathname: "/game",
        state: { 
          userInfo: this.state.userInfo,
          myPokeMoves : this.state.myPokemon.pokeMoves
        }
      }}/>
    }

    let {player, playerPokemon, opponentPokemon} = this.state;
    return (
      <div>
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <img alt="Brand" src="/assets/images/pokemon_logo.png" className="img-responsive" />
            </a>
          </div>
          <div className="navbar-nav ml-auto">
            <a href="#" onClick={this.goBack} className="navbar-link">{this.state.player.name}</a>
            <h3 className="panel-title">
              {
                localStorage.getItem('jwtToken') &&
                <a href="#" onClick={this.logout}>Logout</a>
              }
            </h3>
          </div>
        </nav>
          
        <div className="container">
          <GameContainer opponentPokemon={opponentPokemon} player={player} playerPokemon={playerPokemon}/>
        </div>
        <div className="box">
          <div id = "message" className="message">
            {!this.state.message ? "":this.state.message}
          </div>
          <div className="actions">
            {this.state.myPokeMoves ? this.state.myPokeMoves.map(move => {
                return (
                <button onClick={()=> this.onClickPlayerAttack(move)}>
                  {move}
                </button>)
              }) : ""
            }
          </div>
        </div>
        <div className ='row'>
            <div className='col-sm-12 col-md-6'>
              <button type="submit" className="btn btn-primary btn-lg btn-block" >go Back</button>
            </div>
            <div className='col-sm-12 col-md-6'>
              <button type="submit" className="btn btn-primary btn-lg btn-block" >New Game</button>
            </div>
        </div>
      </div>
        );
      }
    }
    
export default Game;