import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';

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

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">

          <NavBar/>

          <Switch>

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

            <Route path="/">
              <img src="https://image.flaticon.com/icons/svg/2114/2114481.svg" className="App-logo" alt="logo" />
              <p>
                Root Route
              </p>
            </Route>
          </Switch>

          <p>This is react-router(-dom) in action! Different URL slugs 🐌 trigger different components to be rendered. <br/> Click the nav buttons to navigate through the different URLs.</p>

        </header>
      </div>
    </Router>
  );
}

export default App;
