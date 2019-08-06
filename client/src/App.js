import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login/Login'
import "antd/dist/antd.css"
import './App.css';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/home'  component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          {/* <Redirect from='/*' to='/login' /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
