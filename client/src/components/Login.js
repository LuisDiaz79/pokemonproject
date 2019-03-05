import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { Container, Row, Col } from "./Grid";
import { getLoginInfo } from '../redux/actions/pokemonActions';

class Login extends Component {


  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.getLoginInfo(this.state.username, this.state.password);    //connect returns 'fetchPosts()' as a prop

  }

  render() {

    const { username, password, message } = this.state;

    const { player } = this.props

    if(player.logged ){
      localStorage.setItem('jwtToken', player.token);
    }
    return (
      <div className="login">

      {
        player.logged &&
        <Redirect to="/dashboard"/>
      }
      <Container fluid>
        <Row>
        <Col size="sm-12 md-6">

        <form className="form-signin" onSubmit={this.onSubmit}>
          <h2 className="form-signin-heading">Please sign in</h2>
            { message && message !== '' &&
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


Login.propTypes = {     //Typechecking With PropTypes, will run on its own, no need to do anything else, separate library since React 16, wasn't the case before on 14 or 15
  getLoginInfo: PropTypes.func.isRequired,     //Action, does the Fetch part from the posts API
  getPlayerList: PropTypes.func.isRequired     //Action, does the Fetch part from the posts API
}

let mapStatetoProps = (state) => ({    //rootReducer calls 'postReducer' which returns an object with previous(current) state and new data(items) onto a prop called 'posts' as we specified below
  player: state.player    //'posts', new prop in component 'Posts'. 'state.postReducer', the object where our reducer is saved in the redux state, must have same name as the reference
});

export default connect(mapStatetoProps, { getLoginInfo})(Login);