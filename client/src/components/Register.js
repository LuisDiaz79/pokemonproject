import React, { Component } from 'react';
import axios from 'axios';
import CharacterIMG from "./CharacterIMG";
import NewPokeIMG from "./NewPokeIMG";
import { Container, Row, Col } from "./Grid";

class Register extends Component {

  constructor() {
    super();
    this.state = {
      message: '',
      name: '',
      chosenGender: '',
      chosenPokemon: '',
      username: '',
      password: '',
      initialPokemons: [],
      chosenStyle: `imgNoSelected`,
      pokeChosenStyle: `imgNoSelected`,
    };
  }

  componentDidMount() {
    axios.post('/api/pokemons/init')
      .then((result) => {
        console.log(`RESULT: ${JSON.stringify(result.data.pokemons)}`);
        this.setState({ initialPokemons: result.data.pokemons });
      })
      .catch(err => console.log(err));
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password, name, chosenGender, chosenPokemon } = this.state;
    axios.post('/api/auth/register', { username, password, name, chosenGender, chosenPokemon })
      .then((result) => {

        console.log(result);
        this.props.history.push("/login")
      });
  }
  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/login')
  }

  toggleChosen = (gender) => {
    this.setState({ chosenGender: gender });

    if (this.state.chosen === 'hvr-grow') {
      this.setState({
        chosenStyle: ``,
      });
    } else {
      this.setState({
        chosenStyle: 'imgSelected',

      });
    }
    console.log(this.state.chosenGender);
  }

  pokeToggleChosen = (pokemonId) => {
    this.setState({ chosenPokemon: pokemonId });

    if (this.state.pokeChosen === 'hvr-grow') {
      this.setState({
        pokeChosenStyle: ``,
      });
    } else {
      this.setState({
        pokeChosenStyle: 'imgSelected',

      });
    }
  }


  render() {
    const { message, username, password, name } = this.state;
    return (
      <div className="login">
        <Container fluid>
          <Row>
            <Col size="sm-12 md-6">

            <form className="form-signin" onSubmit={this.onSubmit}>
              <h2 className="form-signin-heading">Register</h2>
              {message !== '' &&
                <div className="alert alert-warning alert-dismissible" role="alert">
                  {message}
                </div>
              }
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Name" name="name"  value={name} onChange={this.onChange} />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Enter email" name="username" value={username} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" name="password"  value={password} onChange={this.onChange} />
              </div>
              <div className="form-group">
                <Row>
                  <Col size="sm-12 md-6">
                    <CharacterIMG gender="M"
                      chosen={`hvr-grow char-selected ${(this.state.chosenGender === "M") ? this.state.chosenStyle : ""}`}
                      toggleChosen={this.toggleChosen} />
                  </Col>
                  <Col size="sm-12 md-6">
                    <CharacterIMG gender="F" chosen={`hvr-grow char-selected ${(this.state.chosenGender === "F") ? this.state.chosenStyle : ""}`} toggleChosen={this.toggleChosen} />
                  </Col>
                </Row>
              </div>
              {this.state.initialPokemons.length === 0 ? "" : (
                <div className="form-group">
                <Row>
                  <Col size="sm-12 md-4">
                      <NewPokeIMG imageSRC={this.state.initialPokemons[0].imageURL}
                        pokeId={this.state.initialPokemons[0].apiId}
                        pokeChosen={`hvr-grow char-selected ${(this.state.chosenPokemon === 1) ? this.state.pokeChosenStyle : ""}`}
                        pokeToggleChosen={this.pokeToggleChosen} />
                    </Col>
                    <Col size="sm-12 md-4">
                      <NewPokeIMG imageSRC={this.state.initialPokemons[1].imageURL}
                        pokeId={this.state.initialPokemons[1].apiId}
                        pokeChosen={`hvr-grow char-selected ${(this.state.chosenPokemon === 4) ? this.state.pokeChosenStyle : ""}`}
                        pokeToggleChosen={this.pokeToggleChosen} />
                    </Col>
                    <Col size="sm-12 md-4">
                      <NewPokeIMG imageSRC={this.state.initialPokemons[2].imageURL}
                        pokeId={this.state.initialPokemons[2].apiId}
                        pokeChosen={`hvr-grow char-selected ${(this.state.chosenPokemon === 7) ? this.state.pokeChosenStyle : ""}`}
                        pokeToggleChosen={this.pokeToggleChosen} />
                    </Col>
                  </Row>
                </div>
              )}
              <div className="form-group">
                <Row>
                  <Col size="sm-12 md-6">
                    <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={this.Cancel} >Cancel</button>
                  </Col>
                  <Col size="sm-12 md-6">
                    <button type="submit" className="btn btn-primary btn-lg btn-block" >Register</button>
                  </Col>
                </Row>
              </div>
            </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Register;