import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/App.css';
import NavBar from './components/NavBar';
import Onboarding from './screens/onboarding/Onboarding';
import Login from './screens/auth/Login';
import SignUp from './screens/auth/SignUp';
import SubscriberOwnerDashboard from './screens/general/SubscriberOwnerDashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />

        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/onboarding" component={Onboarding} />
          {/* <Route path="/dashboard" component={GeneralOwnerDashboard}/>  */}
          <Route path="/dashboard" component={SubscriberOwnerDashboard} />
          <Route>Not Found - 404</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
