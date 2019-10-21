import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './styles/App.css';
import { getRecord, createPerson, updatePerson, getRecordFromAttribute } from './lib/request'
import NavBar from './components/NavBar'
import GeneralOwnerDashboard from './screens/general/GeneralOwnerDashboard'
import Onboarding from './screens/onboarding/Onboarding'
import Login from './screens/auth/Login'

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>

        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/onboarding" component={Onboarding}/>
          <Route path="/dashboard" component={GeneralOwnerDashboard}/> 
          <Route>
            Not Found - 404
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
