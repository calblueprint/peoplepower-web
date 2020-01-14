/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import NavBar from './components/NavBar';
import Onboarding from './screens/onboarding/Onboarding';
import Login from './screens/auth/Login';
import SubscriberOwnerDashboard from './screens/general/SubscriberOwnerDashboard/SubscriberOwnerDashboard';
import Community from './screens/general/Community';
import GeneralOwnerDashboard from './screens/general/GeneralOwnerDashboard';
import AdminDashboard from './screens/general/AdminDashboard';
import UserProfilePage from './screens/general/UserProfilePage';
import { applyCredentials } from './lib/credentials';
import store from './lib/redux/store';
import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personId: '',
      displayName: '',
      credentials: '',
      isNavBarVisible: true
    };
  }

  updateState = async (personId, displayName) => {
    if (personId) {
      this.setState({
        personId,
        displayName
      });

      const credentials = await applyCredentials(personId);
      this.setState({
        credentials
      });
    } else {
      this.setState({
        personId: '',
        displayName: '',
        credentials: ''
      });
    }
  };

  toggleNavbar = () => {
    this.setState(prevState => ({
      isNavBarVisible: !prevState.isNavBarVisible
    }));
  };

  render() {
    const { personId, displayName, credentials, isNavBarVisible } = this.state;
    return (
      <Provider store={store}>
        <Router>
          <div className="app-container">
            <NavBar
              personId={personId}
              displayName={displayName}
              credentials={credentials}
              isNavBarVisible={isNavBarVisible}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Login {...props} updateState={this.updateState} />
                )}
              />
              <Route
                path="/onboarding"
                render={props => (
                  <Onboarding {...props} toggleNavbar={this.toggleNavbar} />
                )}
              />
              <Route
                path="/dashboard"
                render={props => (
                  <GeneralOwnerDashboard
                    {...props}
                    updateState={this.updateState}
                  />
                )}
              />
              <Route
                path="/admin"
                render={props => (
                  <AdminDashboard {...props} updateState={this.updateState} />
                )}
              />
              <Route
                path="/community"
                render={props => (
                  <Community {...props} updateState={this.updateState} />
                )}
              />
              <Route
                path="/billing"
                render={props => (
                  <SubscriberOwnerDashboard
                    {...props}
                    updateState={this.updateState}
                  />
                )}
              />
              <Route
                path="/community"
                render={props => (
                  <Community {...props} updateState={this.updateState} />
                )}
              />
              <Route
                path="/admin"
                render={props => (
                  <AdminDashboard {...props} updateState={this.updateState} />
                )}
              />
              <Route
                path="/profile/:id"
                render={props => (
                  <UserProfilePage {...props} updateState={this.updateState} />
                )}
              />
              <Route>
                <p style={{ color: 'white', margin: '30px' }}>
                  Not Found - 404
                </p>
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
