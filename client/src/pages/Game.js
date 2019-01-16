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
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              BOOK CATALOG &nbsp;
              {localStorage.getItem('jwtToken') &&
                <button className="btn btn-primary" onClick={this.logout}>Logout</button>
              }
            </h3>
          </div>
          <div className="panel-body">
            <table className="table table-stripe">
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