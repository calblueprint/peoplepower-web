/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavBarVisible: true
    };
  }

  componentDidMount() {
    const { userLogin } = this.props;
    if (userLogin) {
      refreshUserData(userLogin);
    }
  }

  toggleNavbar = () => {
    this.setState(prevState => ({
      isNavBarVisible: !prevState.isNavBarVisible
    }));
  };

  render() {
    const { isNavBarVisible } = this.state;

    return (
      <Router>
        <div className="app-container">
          <NavBar isNavBarVisible={isNavBarVisible} />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route
              path="/onboarding"
              render={props => (
                <Onboarding {...props} toggleNavbar={this.toggleNavbar} />
              )}
            />
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
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  userLogin: state.userData.userLogin
});

export default connect(mapStateToProps)(App);
