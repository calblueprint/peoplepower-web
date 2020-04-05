/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import NavBar from './components/NavBar';
import Onboarding from './screens/onboarding/Onboarding';
import Login from './screens/auth/Login';
import Billing from './screens/subscriber/Billing';
import SubscriberDashboard from './screens/subscriber/SubscriberDashboard';
import Community from './screens/shared/Community';
import GeneralDashboard from './screens/general/GeneralDashboard';
import AdminDashboard from './screens/admin/AdminDashboard';
import UserProfile from './screens/shared/UserProfile';
import './styles/App.css';
import { refreshUserData } from './lib/userDataUtils';
import { history } from './lib/redux/store';
import {
  isGeneralOwner,
  isSubscriberOwner,
  isSignedIn,
  Credentials,
  isOnboarding
} from './lib/credentials';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Investment from './screens/general/Investment';
import BuyShares from './screens/general/BuyShares';
import SuperAdminDashboard from './screens/admin/SuperAdminDashboard';
import BillingPayment from './screens/subscriber/components/BillingPayment';
import PPRoute from './components/PPRoute';

class App extends React.Component {
  componentDidMount() {
    const { owner } = this.props;

    // If userLogin info is in Redux, fetch latest version
    if (owner) {
      refreshUserData(owner.id);
    }
  }

  // Figure out component to be shown at root based on user credentials
  getHomeComponent() {
    const { credentials } = this.props;
    const onboarding = isOnboarding(credentials);
    const signedIn = isSignedIn(credentials);
    const isGeneral = isGeneralOwner(credentials);
    const isSubscriber = isSubscriberOwner(credentials);
    let homeComponent;
    if (onboarding) {
      homeComponent = () => <Redirect to={{ pathname: '/onboarding' }} />;
    } else if (!signedIn) {
      homeComponent = Login;
    } else if (isSubscriber) {
      // Dashboard for both subscriber and subscriber ownrers (subscribers with shares)
      homeComponent = SubscriberDashboard;
    } else if (isGeneral) {
      homeComponent = GeneralDashboard;
    }
    return homeComponent;
  }

  render() {
    const HomeComponent = this.getHomeComponent();
    return (
      <ConnectedRouter history={history}>
        <div className="app-container">
          <NavBar />
          <Switch>
            <PPRoute exact path="/" component={HomeComponent} />
            <AuthenticatedRoute path="/projectnews" component={Community} />
            <AuthenticatedRoute path="/profile" component={UserProfile} />

            <AuthenticatedRoute
              onboarding // Signed out/Onboarding Users Only
              path="/onboarding"
              component={Onboarding}
            />
            <AuthenticatedRoute
              credential={Credentials.ADMIN} // Admins only
              path="/admin"
              component={AdminDashboard}
            />
            <AuthenticatedRoute
              credential={Credentials.SUPERADMIN} // Admins only
              path="/superadmin"
              component={SuperAdminDashboard}
            />
            <AuthenticatedRoute
              credential={Credentials.GENERAL} // General only
              path="/investment"
              component={Investment}
            />
            <AuthenticatedRoute
              credential={Credentials.SUBSCRIBER} // Subscribers only
              path="/billing"
              component={Billing}
            />
            <AuthenticatedRoute
              credential={Credentials.SUBSCRIBER} // Subscribers only
              path="/billPayment"
              component={BillingPayment}
            />
            <AuthenticatedRoute
              credential={Credentials.GENERAL} // General only
              path="/buyshares"
              component={BuyShares}
            />
            <PPRoute
              render={() => (
                <p style={{ color: 'white', margin: '30px' }}>
                  Not Found - 404
                </p>
              )}
            />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  credentials: state.userData.credentials
});

export default connect(mapStateToProps)(App);
