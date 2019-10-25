import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/App.css';
import NavBar from './components/NavBar';
import GeneralOwnerDashboard from './screens/general/GeneralOwnerDashboard';
import Onboarding from './screens/onboarding/Onboarding';
import Login from './screens/auth/Login';
import SignUp from './screens/auth/SignUp';
import UserProfilePage from './screens/general/UserProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />

        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/onboarding" component={Onboarding} />
          <Route path="/dashboard" component={GeneralOwnerDashboard} />
          <Route path="/profile/:id" component={UserProfilePage} />
          <Route>
            <p style={{ color: 'white', margin: '30px' }}>Not Found - 404</p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
