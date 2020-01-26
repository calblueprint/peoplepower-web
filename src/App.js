/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import NavBar from './components/NavBar';
import Onboarding from './screens/onboarding/Onboarding';
import Login from './screens/auth/Login';
import SubscriberOwnerDashboard from './screens/general/SubscriberOwnerDashboard/SubscriberOwnerDashboard';
import Community from './screens/general/Community';
import GeneralOwnerDashboard from './screens/general/GeneralOwnerDashboard';
import AdminDashboard from './screens/general/AdminDashboard';
import UserProfilePage from './screens/general/UserProfilePage';
import './styles/App.css';
import { refreshUserData } from './lib/userDataUtils';
import { history } from './lib/redux/store';

class App extends React.Component {
  componentDidMount() {
    const { userLogin } = this.props;
    if (userLogin) {
      refreshUserData(userLogin);
    }
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div className="app-container">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/onboarding" component={Onboarding} />
            <Route path="/dashboard" component={GeneralOwnerDashboard} />
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/community" component={Community} />
            <Route path="/billing" component={SubscriberOwnerDashboard} />
            <Route path="/profile" component={UserProfilePage} />
            <Route>
              <p style={{ color: 'white', margin: '30px' }}>Not Found - 404</p>
            </Route>
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  userLogin: state.userData.userLogin
});

export default connect(mapStateToProps)(App);
