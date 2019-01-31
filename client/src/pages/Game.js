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
      myTurn : true,
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
          moves: res.data.pokeMoves,
          totalhp : opponentHP
        }

        let player = this.state.player;
        player.hp = (this.state.player.level * 100);
        player.totalhp = (this.state.player.level * 100); 
        this.setState({ 
          opponentPokemon: opponent, 
          player : player,
          message : `What should ${!this.state.playerPokemon.name ? "":this.state.playerPokemon.name} do?`
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          this.props.history.push("/");
        }
      });
  }

  onClickPlayerAttack = (move) =>{

    this.setState({myTurn: false});
    let miss = Math.floor((Math.random() * 10) + 1);
    let message = "";
    let opponentPokemon = this.state.opponentPokemon;
    if(miss === 1){
      message = `${this.state.playerPokemon.name}'s attack missed!`;
    } else{
      message = `${this.state.playerPokemon.name} used ${move}`;
      var critical = Math.floor((Math.random() * 10) + 1);
      var attack = Math.floor((Math.random() * 30) + 1);
      if(critical === 4){
        opponentPokemon.hp = (opponentPokemon.hp - (attack*2));
      }else{
        opponentPokemon.hp = opponentPokemon.hp - attack;
      }
    }
    if(opponentPokemon.hp <=0){
      message = `${this.state.opponentPokemon.pokemonName} fainted. YOU WON!`; 
      opponentPokemon ={
        pokemonName : "XxxX",
        level : 0,
        hp : 0,
        pokemonImg : "", 
        moves: []
      }
      let player = this.state.player;
      let addExp = player.level * 35;
      player.actualexp = player.actualexp + addExp;
      if(player.actualexp>=player.exptonextlvl){
        player.actualexp = 0;
        player.level = player.level + 1;
        player.exptonextlvl = player.exptonextlvl+100;
      }
      player.hp = player.totalhp;
      axios.post('/api/players', {player : player})
        .then(resz =>{
          console.log(resz)
        })
        .catch();

      console.log(player);
      this.setState({
        message : message,
        opponentPokemon : opponentPokemon,
        endGame : true,
        player : player
      });
    }else{
      setTimeout(this.onOpponentAttack, 2500);
      this.setState({
        message : message,
        opponentPokemon : opponentPokemon
      });
    }
    
  }
  onOpponentAttack = () =>{
    let opponentPokemon = this.state.opponentPokemon;
    let player = this.state.player;
    let message = "";
    setTimeout(()=>{
      this.setState({message : `${opponentPokemon.pokemonName} will attack`});
      setTimeout(()=> {
        let miss = Math.floor((Math.random() * 10) + 1);
        
        
        if(miss === 1){
          setTimeout(()=> {
            this.setState({message : `${opponentPokemon.pokemonName} 's attack missed!`});  
            setTimeout(()=>{
              this.setState({
                message : `What should ${!this.state.playerPokemon.name ? "":this.state.playerPokemon.name} do?`,
                myTurn: true
              });
            }, 1300);
          }, 1800);
        } else{
          setTimeout(()=> {
            
            
            var move = Math.floor((Math.random() * 3));
            let opMove = opponentPokemon.moves[move];
            
            var critical = Math.floor((Math.random() * 10) + 1);
            var attack = Math.floor((Math.random() * 30) + 1);
            if(critical === 4){
              this.setState({
                message : `${opponentPokemon.pokemonName} used ${opMove}. Critical Hit!`
              });  
              player.hp = (player.hp - (attack*2));
            }else{
              this.setState({
                message : `${opponentPokemon.pokemonName} used ${opMove}.`
              });  
              player.hp = player.hp - attack;
            }

            if(player.hp <=0){
              message = `${this.state.playerPokemon.name} fainted. YOU LOSE!`; 
              player.hp =0;
              this.setState({
                message : message,
                player : player,
                myTurn: false
              });
            }else{
              setTimeout(()=>{
                this.setState({
                  message : `What should ${!this.state.playerPokemon.name ? "":this.state.playerPokemon.name} do?`,
                  player: player, 
                  myTurn: true
                });
              }, 2000);
            }
          }, 1800);
          
        }      
      }, 2000);
    }, 1800);
    
  }
  newGame = ()=>{
    window.location.reload();
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
            {(this.state.myPokeMoves && this.state.myTurn)? this.state.myPokeMoves.map(move => {
                return (
                <button key={move} onClick={()=> this.onClickPlayerAttack(move)}>
                  {move}
                </button>)
              }) : ""
            }
          </div>
        </div>
        <div className ='row'>
            
            <div className='col-sm-12 col-md-6'>
              <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={this.newGame} >New Game</button>
            </div>
        </div>
      </div>
        );
      }
    }
    
export default Game;