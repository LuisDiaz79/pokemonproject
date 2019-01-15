import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemons: []
    };
  }

  
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/pokemons')
      .then(res => {
        this.setState({ pokemons: res.data });
        console.log(this.state.pokemons);
      })
      .catch((error) => {
        console.log(error);
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BOOK CATALOG &nbsp;
              {localStorage.getItem('jwtToken') &&
                <button class="btn btn-primary" onClick={this.logout}>Logout</button>
              }
            </h3>
          </div>
          <div class="panel-body">
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>ISBN</th>
                </tr>
              </thead>
              <tbody>
                {this.state.pokemons.map(pokemons =>
                  <tr>
                    <td>{pokemons.name}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;