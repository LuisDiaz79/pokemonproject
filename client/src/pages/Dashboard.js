import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'

import { Container, Row, Col } from "../components/Grid";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newgame: "",
      user: {},
      mypokemon: {},
      players: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    this.setState({
      user: this.props.location.state.userInfo,
      myPokeMoves: this.props.location.state.myPokeMoves
    });

    this.findPokemonById(this.props.location.state.userInfo.pokemonAPIID)
      .then(res => {
        console.log(res);
        this.setState({
          mypokemon: res
        });
        this.findPlayerList()
        .then(playersRes => {
          let finalPlayerList = [];
          Promise.all(playersRes.map((player)=>{
            return (this.findPokemonById(player.pokemonAPIID)
            .then(oppRes => {
              console.log(oppRes);
              player.animatedURL = oppRes.animatedURL;
              finalPlayerList.push(player);
            })
          )
          })).then(()=>{
            this.setState({
              players : finalPlayerList
            });
          });
          
        })
      }).catch((error) => {
        if (error.response.status === 401) {
          this.props.history.push("/");
        }
      });
  }

  findPokemonById = (id) =>{
    console.log("findPokemonById");
    return axios.get('/api/pokemons/?apiId=' + id)
    .then(res => res.data[0])
  }

  findPlayerList = () =>{
    console.log("findPlayerList");
    return axios.get('/api/players')
    .then(res => res.data)
  }

  onNewGame = () => {
    this.setState({ newgame: "new" });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render() {
    console.log(this.state);
    if (this.state.newgame) {
      return <Redirect to={{
        pathname: "/game",
        state: {
          user: this.state.user,
          playerPokemon: this.state.mypokemon,
          myPokeMoves: this.state.myPokeMoves
        }
      }} />

    }
    return (
      <div >
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <img alt="Brand" src="/assets/images/pokemon_logo.png" className="img-responsive" />
            </a>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link hvr-underline-reveal " href="/dashboard">Dashboard </a>
              <a className="nav-item nav-link hvr-underline-reveal" href="#">Pokedex</a>
              <a className="nav-item nav-link hvr-underline-reveal" href="#" onClick={this.onNewGame}>Battle</a>
            </div>
          </div>
          <div className="navbar-nav ml-auto">
            <a href="/dashboard" className="navbar-link">{this.state.user.name}</a>
            <h3 className="panel-title">
              {
                localStorage.getItem('jwtToken') &&
                <button className="btn btn-primary" onClick={this.logout}>Logout</button>
              }
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
                        <img src={this.state.mypokemon.imageURL} alt="" className="userImg" />
                        {` Hi ${this.state.user.name}`}
                      </h1>
                    </div>
                    <div className="card-body">
                      <div className="title name">{`Name: ${this.state.mypokemon.name}`}</div>
                      <div className="title gender">{`Gender: ${this.state.user.gender}`}</div>
                      <div className="title level">{`Level: ${this.state.user.level}`}</div>
                      <br></br>
                      <button type="submit" className="btn btn-primary" onClick={this.onNewGame}>New Game</button>
                    </div>
                  </div>


                </Col>

              </Row>
            </Col>

            <Col size="sm-12 md-4">
              <div className="card">
                <div className="card-header">
                  Featured
                </div>
                
                  {
                    this.state.players ? this.state.players.map(player => {
                    return (
                      <ul className="list-group list-group-flush">
                        <li className="users">
                          {player.name} <img src={player.animatedURL} alt=""/>
                          
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

export default Dashboard;