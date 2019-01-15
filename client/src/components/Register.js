import React, { Component } from 'react';
import axios from 'axios';
import { CharacterIMG } from "./CharacterIMG";
import { Container } from "./Grid";
import { Button, Form, FormGroup, Row, Col, FormControl } from 'react-bootstrap';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      gender: '',
      username: '',
      password: '',

      male :{
        id : "M"    
      },

      female :{
        id : "F"    
      }
    };
  }
  
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password , name} = this.state;

    console.log(`username : ${username}`);

    console.log(`password : ${password}`);
    console.log(`password : ${name}`);

    axios.post('/api/auth/register', { username, password })
      .then((result) => {
        console.log(result);
        this.props.history.push("/login")
      });
  }
  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/login')
  }

  addChar = (g) =>{
    console.log(g);
    this.setState({gender : g});

  }

  selectCharacter = ()=>{
    
  }

  render() {
    const { username, password, name } = this.state;
    return (
      <div className="login">
        <Container fluid>
          <Row>
            <Col bsStyle="align-top" sm={12} md={6}>
              <Form className="form-signin" onSubmit={this.onSubmit}>
                <h2 className="form-signin-heading">Register</h2>

                <FormGroup controlId="formHorizontalName">
                  <Col sm={12} className="form-style">
                    <FormControl type="text" placeholder="Name" className="sr-only" name="name" value={name} onChange={this.onChange} required />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalEmail">
                  <Col sm={12} className="form-style">
                    <FormControl type="text" placeholder="Email" className="sr-only" name="username" value={username} onChange={this.onChange} required />
                  </Col>
                </FormGroup>
                <br></br>
                <FormGroup controlId="formHorizontalPassword">
                  <Col sm={12} className="form-style">
                    <FormControl type="password" placeholder="Password" className="sr-only" name="password" value={password} onChange={this.onChange} required />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={12} md={6}>
                    <CharacterIMG gender="M" selected={this.selectCharacter}/>
                  </Col>
                  <Col sm={12} md={6}>
                    <CharacterIMG gender="F"/>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={12} md={6}>
                    <Button bsStyle="primary" bsSize="large" onClick={this.cancel} block>Cancel</Button>
                  </Col>
                  <Col sm={12} md={6}>
                    <Button bsStyle="primary" bsSize="large" type="submit" block>Register</Button>
                  </Col>
                </FormGroup>
               
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Create;