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
import About from './screens/shared/About';
import ErrorPage from './screens/general/ErrorPage';
import './styles/App.css';
import { refreshUserData, clearUserData } from './lib/redux/userData';
import { history } from './lib/redux/store';
import {
  isGeneralOwner,
  isSubscriberOwner,
  isSignedIn,
  Credentials,
  isOnboarding,
  getCredentials
} from './lib/credentials';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Investment from './screens/general/Investment';
import BuyShares from './screens/general/BuyShares';
import SuperAdminDashboard from './screens/admin/SuperAdminDashboard';
import BillingPayment from './screens/subscriber/components/BillingPayment';
import PPRoute from './components/PPRoute';
import FeedbackButton from './components/FeedbackButton';
import { getOwnerById } from './lib/airtable/request';

class App extends React.Component {
  async componentDidMount() {
    const { owner } = this.props;
    // TODO: check that airlock session token is valid

    // If userLogin info is in Redux, fetch latest version
    if (owner) {
      try {
        await getOwnerById(owner.id);
        refreshUserData(owner.id);
      } catch (e) {
        console.log('Session Expired');
        clearUserData();
        history.push('/');
      }
    }
  }

  // Figure out component to be shown at root based on user credentials
  getHomeComponent() {
    const { owner } = this.props;
    const credentials = getCredentials(owner);
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
          <NavBar history={history} />
          <Switch>
            <PPRoute exact path="/" component={HomeComponent} />
            <PPRoute exact path="/about" component={About} />
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
              history={history}
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
            <PPRoute path="*" component={ErrorPage} />
          </Switch>
          <FeedbackButton history={history} />
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner
});

export default connect(mapStateToProps)(App);
