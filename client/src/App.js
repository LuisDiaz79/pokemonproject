import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
// import './index.css';

import {Home} from './pages/Home';
import Dashboard from './pages/Dashboard';
import Game from './pages/Game';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <Router>
      <div>
        
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/game' component={Game} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/home' component={Home} />
      </div>
    </Router>
  );
}
export default App; 