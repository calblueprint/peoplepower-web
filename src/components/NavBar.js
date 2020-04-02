import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  isAdmin,
  isSubscriberOwner,
  isGeneralOwner,
  isSignedIn,
  isOnboarding
} from '../lib/credentials';
import Logo from '../assets/PPSC-logo.png';
import '../styles/NavBar.css';
import SettingsDropdown from './SettingsDropdown';

class NavBar extends React.PureComponent {
  render() {
    const { credentials, pathname, history } = this.props;
    const displayNavbar = isSignedIn(credentials) && !isOnboarding(credentials);

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
          {displayNavbar && (
            <ul>
              <li
                className={
                  `${pathname === '/' ? 'nav-item-selected' : 'nav-item' 
                  } nav-item-styling`
                }
              >
                <Link to="/">Dashboard</Link>
              </li>
              {isGeneralOwner(credentials) && (
                <li
                  className={
                    `${pathname === '/investment'
                      ? 'nav-item-selected'
                      : 'nav-item'  } nav-item-styling`
                  }
                >
                  <Link to="/investment">My Investment</Link>
                </li>
              )}
              {isSubscriberOwner(credentials) && (
                <li
                  className={
                    `${pathname === '/billing'
                      ? 'nav-item-selected'
                      : 'nav-item'  } nav-item-styling`
                  }
                >
                  <Link to="/billing">Billing</Link>
                </li>
              )}
              <li
                className={
                  `${pathname === '/projectnews'
                    ? 'nav-item-selected'
                    : 'nav-item'  } nav-item-styling`
                }
              >
                <Link to="/projectnews">Project News</Link>
              </li>
              {isAdmin(credentials) && (
                <li
                  className={
                    `${pathname === '/admin' ? 'nav-item-selected' : 'nav-item' 
                    } nav-item-styling`
                  }
                >
                  <Link to="/admin">Admin</Link>
                </li>
              )}
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
  credentials: state.userData.credentials,
  pathname: state.router.location.pathname
});
export default connect(mapStateToProps)(NavBar);
