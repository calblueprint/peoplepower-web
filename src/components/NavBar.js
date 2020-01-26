import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  isAdmin,
  isSubscriberOwner,
  isGeneralOwner,
  isSignedIn
} from '../lib/credentials';
import Logo from '../assets/PPSC-logo.png';
import '../styles/NavBar.css';

const ONBOARDING_ROUTE = '/onboarding';

class NavBar extends React.PureComponent {
  render() {
    const { person, credentials, path } = this.props;
    // TODO: Holy crap so apparently the "ID" column on airtable is their NAME not the record ID.
    // we NEED to standardize airtable column names so things aren't hella confusing
    const displayName = person ? person.name : '';

    if (path === ONBOARDING_ROUTE) {
      return (
        <div className="nav-bar">
          <a href="/">
            <img
              className="logo"
              src={Logo}
              alt="People Power Solar Cooperative Logo"
            />
          </a>
        </div>
      );
    }

    if (!isSignedIn(credentials)) {
      return (
        <div className="nav-bar">
          <a href="/">
            <img
              className="logo"
              src={Logo}
              alt="People Power Solar Cooperative Logo"
            />
          </a>
          <nav>
            <ul>
              <li className="navItem">
                <Link to="/">
                  <span>Sign In</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    }

    return (
      <div className="nav-bar">
        <a href="/">
          <img
            className="logo"
            src={Logo}
            alt="People Power Solar Cooperative Logo"
          />
        </a>
        <nav>
          <ul>
            <li className="navItem">
              <Link to="/">Dashboard</Link>
            </li>
            {isGeneralOwner(credentials) ? (
              <li className="navItem">
                <Link to="/investment">My Investment</Link>
              </li>
            ) : null}
            {isSubscriberOwner(credentials) ? (
              <li className="navItem">
                <Link to="/billing">Billing</Link>
              </li>
            ) : null}
            <li className="navItem">
              <Link to="/community">Community</Link>
            </li>
            {isAdmin(credentials) ? (
              <li className="navItem">
                <Link to="/admin">Admin</Link>
              </li>
            ) : null}
            <li className="navItem">
              <Link to="/profile">
                <span>{displayName}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  person: state.userData.person,
  path: state.router.location.pathname,
  credentials: state.userData.credentials
});
export default connect(mapStateToProps)(NavBar);
