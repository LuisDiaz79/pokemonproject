import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
// import './index.css';

import {Home} from './pages/Home';
import Game from './pages/Game';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <Router>
      <div>
        <Route path='/' component={Home} />
        <Route path='/game' component={Game} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </div>
    </Router>
  );
}
export default App; 