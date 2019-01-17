import React, { Component } from 'react';
import axios from 'axios';
import CharacterIMG from "./CharacterIMG";
import { Container } from "./Grid";
import { Button, Form, FormGroup, Row, Col, FormControl } from 'react-bootstrap';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      chosenGender: '',
      username: '',
      password: '',
  	  chosenStyle: `imgNoSelected`
    };
  }
  
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password , name, chosenGender} = this.state;

    console.log(`username : ${username}`);

    console.log(`password : ${password}`);
    console.log(`name : ${name}`);
    console.log(`chosenGender : ${chosenGender}`);


    axios.post('/api/auth/register', { username, password , name, chosenGender})
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
    this.setState({chosenGender: gender});
    
		if(this.state.chosen === 'hvr-grow'){
			this.setState({
				chosenStyle: ``,
			});
		}else{
			this.setState({
				chosenStyle: 'imgSelected',
				
			});
    }
    console.log(this.state.chosenGender);		
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
                    <CharacterIMG gender="M" chosen={`hvr-grow char-selected ${(this.state.chosenGender === "M") ? this.state.chosenStyle : ""}`}  toggleChosen={this.toggleChosen}/>
                  </Col>
                  <Col sm={12} md={6}>
                    <CharacterIMG gender="F" chosen={`hvr-grow char-selected ${(this.state.chosenGender === "F") ? this.state.chosenStyle : ""}`} toggleChosen={this.toggleChosen}/>
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
export default Register;