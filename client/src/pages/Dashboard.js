import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'

import { Container, Row, Col } from "../components/Grid";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newgame:"",
      user:{},
      mypokemon :{},
      players : []
    };
  }
 
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

    axios.get('/api/pokemons/?apiId='+this.props.location.state.userInfo.pokemonAPIID)
      .then(res => {
        console.log(res.data);
        this.setState({
          user : this.props.location.state.userInfo,
          mypokemon : res.data[0]
        });
        console.log(this.state.mypokemon);
        axios.get('/api/players')
        .then(result =>{
          // console.log(result.data);
          this.setState({players : result.data});
        })
        .catch(err => console.log(err));
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  onNewGame = () => {
    this.setState({newgame : "new"});
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render() {
    if (this.state.newgame) {
      return   <Redirect to={{
        pathname: "/game",
        state: { 
          user: this.state.user,
          playerPokemon : this.state.mypokemon
        }
      }}/>

    }
    return (
      <div >

        <Container>
          <Row>
            <Col size="sm-12 md-8">
              <Row>
              <Col size="12">
                <h1>
                  <img src={`./assets/images/${this.state.user.gender}.jpg`} alt="" class="userImg"/>
                    Hi {this.state.user.name}
                </h1>
                <br/>
              </Col>
              <Col size="12">
                <div className="card">
                  <img src="..." class="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                  </ul>
                </div>
                <br></br>
              </Col>
              <Col size="12">
               <Row>
                  <Col size="sm-12 md-6">
                  </Col>
                  <Col size="sm-12 md-6">
                    <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={this.onNewGame}>New Game</button>
                  </Col>
                </Row>
              </Col>
              </Row>
            </Col>
            <Col size="sm-12 md-4">
              {this.state.players.map(player => {
                  return (
                    <div>
                      {player.name}
                    </div>
                  )
                })}
              <h3 className="panel-title">
                {
                  localStorage.getItem('jwtToken') &&
                  <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                }
              </h3>
            </Col>
          </Row>
        </Container>
      </div>
      
          
    );
  }
}

export default Dashboard;