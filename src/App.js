/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/App.css';
import NavBar from './components/NavBar';
import Onboarding from './screens/onboarding/Onboarding';
import Login from './screens/auth/Login';
import SubscriberOwnerDashboard from './screens/general/SubscriberOwnerDashboard/SubscriberOwnerDashboard';
import Community from './screens/general/Community';
import GeneralOwnerDashboard from './screens/general/GeneralOwnerDashboard';
import AdminDashboard from './screens/general/AdminDashboard';
import UserProfilePage from './screens/general/UserProfilePage';
import { applyCredentials } from './lib/credentials';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personId: '',
      displayName: '',
      credentials: ''
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(personId, displayName) {
    if (personId) {
      this.setState({
        personId,
        displayName
      });

      applyCredentials(personId).then(credentials => {
        this.setState({
          credentials
        });
      });
    } else {
      this.setState({
        personId: '',
        displayName: '',
        credentials: ''
      });
    }
  }

  render() {
    const { personId, displayName, credentials } = this.state;
    return (
      <Router>
        <div className="app-container">
          <NavBar
            personId={personId}
            displayName={displayName}
            credentials={credentials}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Login {...props} updateState={this.updateState} />
              )}
            />
            <Route path="/onboarding" component={Onboarding} />
            <Route
              path="/dashboard"
              render={props => (
                <GeneralOwnerDashboard
                  {...props}
                  updateState={this.updateState}
                />
              )}
            />
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/community" component={Community} />
            <Route path="/billing" component={SubscriberOwnerDashboard} />
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
}

export default App;
