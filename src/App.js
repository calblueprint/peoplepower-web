import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './styles/App.css';
import { getRecord, createPerson, updatePerson, getRecordFromAttribute } from './request'
import NavBar from './components/NavBar'
import GeneralOwnerDashboard from './components/GeneralOwnerDashboard'

// This probably isn't proper react style, but it works.
function handleButton() {
  // var record = getRecord('Person', 'recfnsL4HDoNHril6');
  var record = getRecordFromAttribute('Person', 'Email', 'ashley@pppower.io')

  var person = {
    "fields": {
      "Email": "iris@pppower.io",
      "Phone Number": "(504) 343-6954",
      "Tags": 12,
      "Name": "Iris Hou"
    }
  }

  var updatedPerson = {
    "id": "recfnsL4HDoNHril6",
    "fields": {
      "Name": "Nicholas Wong",
      "Phone Number": "(808) 343-6954"
    }
  }

  // updatePerson(updatedPerson);
}

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>

        <Switch>

          <Route exact path="/">
            <img src="https://image.flaticon.com/icons/svg/2114/2114481.svg" className="App-logo" alt="logo" />
            <p>
              Root Route
            </p>
            <button onClick={handleButton}>Make request</button>
          </Route>

          <Route path="/onboarding">
            <img src="https://image.flaticon.com/icons/svg/1615/1615404.svg" className="App-logo" alt="logo" />
            <p>
              Onboarding Route
            </p>
          </Route>

          <Route path="/dashboard" render={(props) => <GeneralOwnerDashboard {...props} />} />   

          <Route>
            Not Found - 404
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
