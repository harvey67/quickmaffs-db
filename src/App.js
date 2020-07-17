import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Nav from './Nav';
import Dashboard from './Dashboard';
import CreateAccount from './CreateAccount';
import Login from './Login';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/Dashboard" component={Dashboard} exact />
            <Route path="/CreateAccount" component={CreateAccount} exact />
            <Route path="/Login" component={Login} exact />
          </Switch>
        </BrowserRouter>
      </div>
  
    );
  }
}

export default App;
