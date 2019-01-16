import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Container } from "./Grid";
import { Button, Form, FormGroup, Row, Col, FormControl } from 'react-bootstrap';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      message: ''
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
        this.setState({ message: '' });
        this.props.history.push('/game')
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password not match' });
        }
      });
  }

  render() {
    const { username, password, message } = this.state;
    return (
      <div className="login">

      
      <Container fluid>
        <Row>
        <Col sm={12} md={6}>
        <Form className="form-signin" onSubmit={this.onSubmit}>
          <h2 className="form-signin-heading">Please sign in</h2>
          {message !== '' &&
            <div className="alert alert-warning alert-dismissible" role="alert">
              {message}
            </div>
          }
          <FormGroup controlId="formHorizontalEmail">
            <Col sm={12} className="form-style">
              <FormControl type="text" placeholder="Email" className="sr-only" name="username" value={username} onChange={this.onChange} required />
            </Col>
          </FormGroup>
          <br></br>
          <FormGroup controlId="formHorizontalPassword">
            <Col sm={12}  className="form-style">
              <FormControl type="password" placeholder="Password" className="sr-only" name="password" value={password} onChange={this.onChange} required />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={12} className="form-style">
              <Button bsStyle="primary" bsSize="large" type="submit" block>Sign in</Button>
            </Col>
          </FormGroup>

          <p>
            Not a member? <Link to="/register"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
          </p>
        </Form>
        </Col>
        <Col sm={12} md={6}>
          test
        </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default Login;