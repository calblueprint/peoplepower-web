import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './styles/App.css';
import { getRecord, createPerson, updatePerson, getRecordFromAttribute } from './request'
import NavBar from './components/NavBar'
import GeneralOwnerDashboard from './components/GeneralOwnerDashboard'

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>

        <Switch>
          <Route exact path="/">
            <p style={{color: 'white', margin: '30px'}}>
              Root Route - A react component or "screen" will go here.
            </p>
          </Route>

          <Route path="/onboarding">
            <p>
              Onboarding Route - Asli's onboarding screen will go here.
            </p>
          </Route>

          <Route path="/dashboard" render={(props) => <GeneralOwnerDashboard {...props} />} /> 

          <Route>
            <p style={{color: 'white', margin: '30px'}}>Not Found - 404</p>
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
