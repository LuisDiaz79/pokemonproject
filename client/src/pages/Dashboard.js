import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from "../components/Grid";
import { logout, getPlayerPokemon, getPlayerList } from '../redux/actions/pokemonActions';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      players : this.get
    };

  }

  componentWillMount() {

    if (this.props.player.logged) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      this.props.getPlayerList();
      this.setState(() => ({
        user: this.props.player.items.userInfo[0],
        myPokeMoves: this.props.player.items.myPokemon.pokeMoves,
        myPokemon: this.props.player.items.myPokemon
      }));
      this.props.getPlayerPokemon(this.props.player.items.userInfo[0].pokemonAPIID);
      console.log(this.props.player.playerPokemon);
    }

  }


  onNewGame = () => {
    <Redirect to="/game" />
  }

  onLogout = () => {
    localStorage.removeItem('jwtToken');
    this.props.logout();
  }

  render() {

    const { player, players } = this.props

    
    return (
      <div >
        {
          !player.logged &&
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
              <Link className="nav-item nav-link hvr-underline-reveal " to="/dashboard">Dashboard </Link>
              <Link className="nav-item nav-link hvr-underline-reveal" to="https://react-pokedex.firebaseapp.com">Pokedex</Link>
              <Link className="nav-item nav-link hvr-underline-reveal" to="/game" onClick={this.onNewGame}>Battle</Link>
            </div>
          </div>
          <div className="navbar-nav ml-auto">
            <a href="/dashboard" className="navbar-link">{this.state.user ? this.state.user.name : ""}</a>
            <h3 className="panel-title">
              <button className="btn btn-primary" onClick={this.onLogout}>Logout</button>
            </h3>
          </div>
        </nav>

        <Container>
          <Row>
            <Col size="sm-12 md-8">
              <Row>
                <Col size="12"></Col>
                <Col size="12">
                  <div className="card user-info">
                    <div className="card-header">
                      <h1>
                        <img src={player.playerPokemon ? player.playerPokemon.imageURL : ""} alt="" className="userImg" />
                        {` Hi ${this.state.user ? this.state.user.name : ""}`}
                      </h1>
                    </div>
                    <div className="card-body">
                      <div className="title name">{`Name: ${player.playerPokemon ? player.playerPokemon.name : ""}`}</div>
                      <div className="title gender">{`Gender: ${this.state.user ? this.state.user.gender : ""}`}</div>
                      <div className="title level">{`Level: ${this.state.user ? this.state.user.level : ""}`}</div>
                      <br></br>
                      <Link to="/game">
                        <button type="submit" className="btn btn-primary" >New Game</button>
                      </Link>
                    </div>
                  </div>


                </Col>

              </Row>
            </Col>

            <Col size="sm-12 md-4">
              <div className="card">
                <div className="card-header">
                  TOP Players
                </div>
                
                
                {
                  players ? players.map(player => {
                    console.log(player);
                    return (
                      <ul className="list-group list-group-flush">      
                        <li className="users">
                          {player.name} <img src={player.animatedURL} alt="" />

                        </li>
                      </ul>
                    )
                  }) : "NO PLAYERS"
                }
                
              </div>
            </Col>
          </Row>
        </Container>


      </div>
    );
  }
}


Dashboard.propTypes = {     //Typechecking With PropTypes, will run on its own, no need to do anything else, separate library since React 16, wasn't the case before on 14 or 15
  logout: PropTypes.func.isRequired,     //Action, does the Fetch part from the posts API
  getPlayerPokemon: PropTypes.func.isRequired,     //Action, does the Fetch part from the posts API
}

let mapStatetoProps = (state) => ({    //rootReducer calls 'postReducer' which returns an object with previous(current) state and new data(items) onto a prop called 'posts' as we specified below
  player: state.player,    //'posts', new prop in component 'Posts'. 'state.postReducer', the object where our reducer is saved in the redux state, must have same name as the reference
  players: state.player.playersList
});

export default connect(mapStatetoProps, { logout, getPlayerPokemon, getPlayerList })(Dashboard);