import React from 'react';
import { Provider } from 'react-redux';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Home} from './pages/Home';
import Dashboard from './pages/Dashboard';
import Game from './pages/Game';
import Login from './components/Login';
import Register from './components/Register';
import store from './store';


function App() {
  return (

    <Provider store={store}>
    <Router>
      <div>
      <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/game' component={Game} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route exact path='/' component={Home} />
      </Switch>
      </div>
    </Router>
    </Provider>
  );
}
export default App; 