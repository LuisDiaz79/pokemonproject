import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';

import { Container, Row, Col } from "./Grid";

class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      message: '',
      userInfo: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }


  onSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    axios.post('/api/auth/login', { username, password })
      .then((result) => {
        localStorage.setItem('jwtToken', result.data.token);

        console.log(result.data);

        this.setState({ message: '', userInfo: result.data.userInfo[0], myPokemon : result.data.myPokemon});

      })
      .catch((error) => {
        
        if (error.response.status === 401) {
          this.setState({ message: error.response.data.msg });
        }else if (error) {
          
          this.setState({ message: error.response.data.msg});
          this.props.history.push('/register')
        }
      });
  }

  render() {

    if (this.state.userInfo) {
      return   <Redirect to={{
        pathname: "/dashboard",
        state: { 
          userInfo: this.state.userInfo,
          myPokemon : this.state.myPokemon
        }
      }}/>

    }

    const { username, password, message } = this.state;
    return (
      <div className="login">

      
      <Container fluid>
        <Row>
        <Col size="sm-12 md-6">

        <form className="form-signin" onSubmit={this.onSubmit}>
          <h2 className="form-signin-heading">Please sign in</h2>
            {message !== '' &&
              <div className="alert alert-warning alert-dismissible" role="alert">
                {message}
              </div>
            }
          <div className="form-group">
            <input type="email" className="form-control" placeholder="Enter email" name="username" value={username} onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" name="password"  value={password} onChange={this.onChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
          <p>
            Not a member? <Link to="/register"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
          </p>
        </form>

        </Col>
        <Col size="sm-12 md-6">
          
        </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default Login;