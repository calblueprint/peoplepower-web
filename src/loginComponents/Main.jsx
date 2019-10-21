import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import SignUp from './SignUp';

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </main>
  );
}

export default Main;
