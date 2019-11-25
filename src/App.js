import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/App.css';
import NavBar from './components/NavBar';
import Onboarding from './screens/onboarding/Onboarding';
import Login from './screens/auth/Login';
import SubscriberOwnerPage from './screens/general/SubscriberOwnerPage';
// import SignUp from './screens/auth/SignUp';
import Community from './screens/general/Community';
import GeneralOwnerDashboard from './screens/general/GeneralOwnerDashboard';
import AdminDashboard from './screens/general/AdminDashboard';
import UserProfilePage from './screens/general/UserProfilePage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />

        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/onboarding" component={Onboarding} />
          <Route path="/dashboard" component={GeneralOwnerDashboard} />
          <Route path="/subdashboard" component={SubscriberOwnerPage} />
          <Route path="/community" component={Community} />
          <Route path="/admin" component={AdminDashboard} />
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
