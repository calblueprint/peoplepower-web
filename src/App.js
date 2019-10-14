import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import { getRecordFromID, getRecordFromName, getRecordFromEmail, createPerson, updatePerson } from './request'

// Returns a makeshift navbar to demonstrate react-router.
function NavBar() {
  return (
    <div className="makeshiftNav">
      <nav>
        <ul>
          <li className="navItem">
            <Link to="/">Home</Link>
          </li>
          <li className="navItem">
            <Link to="/onboarding">Sign Up</Link>
          </li>
          <li className="navItem">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

// This probably isn't proper react style, but it works.
function handleButton() {
  // var record = getRecordFromID('Person', 'recfnsL4HDoNHril6');
  // var record = getRecordFromName('Person', 'Nick Wong')
  // var record = getRecordFromEmail('Person', 'aivant@ppower.io')


  var person = {
    "fields": {
      "Email": "iris@pppower.io",
      "Phone Number": "(504) 343-6954",
      "Tags": 12,
      "Name": "Iris Hou"
    }
  }

  var updatedPerson= {
    "id": "recfnsL4HDoNHril6",
    "fields": {
      "Name": "Nicholas Wong",
      "Phone Number": "(808) 343-6954"
    }
  }

  updatePerson(updatedPerson);
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">

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

            <Route path="/dashboard">
              <img src="https://image.flaticon.com/icons/svg/2150/2150686.svg" className="App-logo" alt="logo" />
              <p>
                Dashboard Route
              </p>
            </Route> 

            <Route>
              Not Found - 404
            </Route>
          </Switch>

          <p>This is react-router(-dom) in action! Different URL slugs 🐌 trigger different components to be rendered. <br/> Click the nav buttons to navigate through the different URLs.</p>

        </header>
      </div>
    </Router>
  );
}

export default App;
