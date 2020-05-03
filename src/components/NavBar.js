import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  isAdmin,
  isSubscriberOwner,
  isGeneralOwner,
  isSignedIn,
  isOnboarding,
  getCredentials
} from '../lib/credentials';
import Logo from '../assets/PPSC-logo.png';
import '../styles/NavBar.css';
import SettingsDropdown from './SettingsDropdown';

class NavBar extends React.PureComponent {
  render() {
    const { owner, pathname, history } = this.props;
    const credentials = getCredentials(owner);

    // if onboarding
    if (isOnboarding(credentials)) {
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
            {isSignedIn(credentials) && (
              <ul>
                <div className="dropdown-safety-box" />
                <li className="nav-item dropdown-container">
                  <SettingsDropdown history={history} />
                </li>
              </ul>
            )}
          </nav>
        </div>
      );
    }

    // else, if is signed in and DONE with onboarding
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
          {isSignedIn(credentials) && (
            <ul>
              <li
                className={`${
                  pathname === '/' ? 'nav-item-selected' : 'nav-item'
                } nav-item-styling`}
              >
                <Link to="/">Dashboard</Link>
              </li>
              {isGeneralOwner(credentials) && (
                <li
                  className={`${
                    pathname === '/investment'
                      ? 'nav-item-selected'
                      : 'nav-item'
                  } nav-item-styling`}
                >
                  <Link to="/investment">My Investment</Link>
                </li>
              )}
              {isSubscriberOwner(credentials) && (
                <li
                  className={`${
                    pathname === '/billing' ? 'nav-item-selected' : 'nav-item'
                  } nav-item-styling`}
                >
                  <Link to="/billing">Billing</Link>
                </li>
              )}
              <li
                className={`${
                  pathname === '/projectnews' ? 'nav-item-selected' : 'nav-item'
                } nav-item-styling`}
              >
                <Link to="/projectnews">Project News</Link>
              </li>
              {isAdmin(credentials) && (
                <li
                  className={`${
                    pathname === '/admin' ? 'nav-item-selected' : 'nav-item'
                  } nav-item-styling`}
                >
                  <Link to="/admin">Admin</Link>
                </li>
              )}
              <div className="dropdown-safety-box" />
              <li className="nav-item dropdown-container">
                <SettingsDropdown history={history} />
              </li>
            </ul>
          )}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  pathname: state.router.location.pathname
});
export default connect(mapStateToProps)(NavBar);
