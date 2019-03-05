import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import { GameContainer } from "../components/Game";
import { logout, getPlayerPokemon, getOpponenInfo, opponentFail } from '../redux/actions/pokemonActions';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      newGameBtn: false,
      backBtn: false,
      myTurn: true,
      opponentPokemon: {},
      playerPokemon: {},
      player: "",
      mypokeMoves: []
    };
  }


  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    console.log(this.props.playerPokemon);
    if (this.props.player.logged) {
      let player = this.props.player.playerPokemon;
      player.hp = (this.props.player.items.userInfo[0].level * 100);
      player.totalhp = (this.props.player.items.userInfo[0].level * 100);
      this.props.getOpponenInfo(this.props.player.items.userInfo[0].level);
      this.setState({
        message: `What should ${player.name} do?`,
        player
      });
    }


  }

  calcAttack = (level) => {
    let probAttack = Math.floor((Math.random() * 10) + 1);
    let crit = false;
    if (probAttack === 0) {
      return { atttack: 0, crit: crit };
    } else {
      var attack = Math.floor((Math.random() * 30) + (10 * level));

      if (probAttack === 9) {
        attack = attack * 2;
        crit = true;
      }
      return { attack: attack, crit: crit }
    }
  }


  onClickPlayerAttack = (move) => {

    let message = "";
    let opponentPokemon = this.props.opponent;
    console.log(opponentPokemon);
    this.setState({
      myTurn: false,
      message: `${this.state.player.name} used ${move}`
    });


    setTimeout(() => {
      let attack = this.calcAttack(opponentPokemon.level);
      console.log(attack);
      let playerPokemonName = this.state.player.name;
      if (attack.attack === 0) {
        this.setState({ message: `${playerPokemonName}'s attack missed!` });
      } else {
        if (attack.crit) {
          this.setState({ message: `${playerPokemonName}'s attack missed!` });
        }
        opponentPokemon.hp = (opponentPokemon.hp - attack.attack);
      }

      if (opponentPokemon.hp <= 0) {
        message = `${this.props.opponent.pokemonName} fainted. YOU WON!`;
        this.props.opponentFail();
        let player = this.state.player;
        let addExp = player.level * 35;
        player.actualexp = player.actualexp + addExp;
        if (player.actualexp >= player.exptonextlvl) {
          player.actualexp = 0;
          player.level = player.level + 1;
          player.exptonextlvl = player.exptonextlvl + 100;
        }
        player.hp = player.totalhp;
        axios.post('/api/players', { player: player })
          .then(resz => {
            console.log(resz)
          })
          .catch();

        console.log(player);
        this.setState({
          message: message,
          opponentPokemon: opponentPokemon,
          endGame: true,
          player: player
        });
      } else {
        setTimeout(this.onOpponentAttack, 2500);
        this.setState({
          message: message,
          opponentPokemon: opponentPokemon
        });
      }

    }, 1500);

  }
  onOpponentAttack = () => {
    let opponentPokemon = this.props.opponent;

    let player = this.state.player;
    let message = "";
    setTimeout(() => {
      this.setState({ message: `${opponentPokemon.pokemonName} will attack` });
      setTimeout(() => {
        let miss = Math.floor((Math.random() * 10) + 1);


        if (miss === 1) {
          setTimeout(() => {
            this.setState({ message: `${opponentPokemon.pokemonName} 's attack missed!` });
            setTimeout(() => {
              this.setState({
                message: `What should ${!this.state.playerPokemon.name ? "" : this.state.playerPokemon.name} do?`,
                myTurn: true
              });
            }, 1300);
          }, 1800);
        } else {
          setTimeout(() => {


            var move = Math.floor((Math.random() * 3));
            let opMove = opponentPokemon.moves[move];

            var critical = Math.floor((Math.random() * 10) + 1);
            var attack = Math.floor((Math.random() * 30) + 1);
            if (critical === 4) {
              this.setState({
                message: `${opponentPokemon.pokemonName} used ${opMove}. Critical Hit!`
              });
              player.hp = (player.hp - (attack * 2));
            } else {
              this.setState({
                message: `${opponentPokemon.pokemonName} used ${opMove}.`
              });
              player.hp = player.hp - attack;
            }

            if (player.hp <= 0) {
              message = `${this.state.playerPokemon.name} fainted. YOU LOSE!`;
              player.hp = 0;
              this.setState({
                message: message,
                player: player,
                myTurn: false
              });
            } else {
              setTimeout(() => {
                this.setState({
                  message: `What should ${!this.state.playerPokemon.name ? "" : this.state.playerPokemon.name} do?`,
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
  newGame = () => {
    window.location.reload();
  }
  goBack = () => {
    this.setState({
      backBtn: true
    });
  }
  onLogout = () => {
    localStorage.removeItem('jwtToken');
    this.props.logout();
  }

  render() {

    const { playerPokemon, opponent } = this.props;
    const { player } = this.state;
    // let { player, playerPokemon, opponentPokemon } = this.state;


    console.log(this.props.player);
    return (

      <div>
        {
          !this.props.player.logged &&
          <Redirect to="/" />
        }
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <img alt="Brand" src="/assets/images/pokemon_logo.png" className="img-responsive" />
            </a>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link hvr-underline-reveal " href="/dashboard">Dashboard </a>
              <a className="nav-item nav-link hvr-underline-reveal" href="https://react-pokedex.firebaseapp.com/#/">Pokedex</a>
              <a className="nav-item nav-link hvr-underline-reveal" href="/game" onClick={this.onNewGame}>Battle</a>
            </div>
          </div>
          <div className="navbar-nav ml-auto">
            <a href="/dashboard" className="navbar-link">{this.props.player.items ? this.props.player.items.userInfo[0].name : ""}</a>
            <h3 className="panel-title">
              <button className="btn btn-primary" onClick={this.onLogout}>Logout</button>
            </h3>
          </div>
        </nav>

        <div className="container">
          <GameContainer opponentPokemon={opponent} player={player} playerPokemon={playerPokemon} />
        </div>
        <div className="box">
          <div id="message" className="message">
            {!this.state.message ? "" : this.state.message}
          </div>
          <div className="actions">
            {(this.props.myPokeMoves && this.state.myTurn) ? this.props.myPokeMoves.map(move => {
              return (
                <button key={move} onClick={() => this.onClickPlayerAttack(move)}>
                  {move}
                </button>)
            }) : ""
            }
          </div>
        </div>
        <div className='row'>

          <div className='col-sm-12 col-md-6'>
            <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={this.newGame} >New Game</button>
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {     //Typechecking With PropTypes, will run on its own, no need to do anything else, separate library since React 16, wasn't the case before on 14 or 15
  logout: PropTypes.func.isRequired,     //Action, does the Fetch part from the posts API
  getPlayerPokemon: PropTypes.func.isRequired,     //Action, does the Fetch part from the posts API
  getOpponenInfo: PropTypes.func.isRequired,
  opponentFail: PropTypes.func.isRequired
}

let mapStatetoProps = (state) => ({    //rootReducer calls 'postReducer' which returns an object with previous(current) state and new data(items) onto a prop called 'posts' as we specified below
  player: state.player,    //'posts', new prop in component 'Posts'. 'state.postReducer', the object where our reducer is saved in the redux state, must have same name as the reference
  opponent: state.player.opponent,
  playerPokemon: state.player.items ? state.player.items.userInfo[0] : {},
  myPokeMoves: state.player.items ? state.player.items.myPokemon.pokeMoves : []
});
export default connect(mapStatetoProps, { logout, getPlayerPokemon, getOpponenInfo, opponentFail })(Game);