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
import Gear from '../assets/settings.jpg';
import '../styles/NavBar.css';

class NavBar extends React.PureComponent {
  render() {
    const { credentials, pathname } = this.props;
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
              <li className={pathname === '/' ? 'navItemSelected' : 'navItem'}>
                <Link to="/">Dashboard</Link>
              </li>
              {isGeneralOwner(credentials) && (
                <li
                  className={
                    pathname === '/investment' ? 'navItemSelected' : 'navItem'
                  }
                >
                  <Link to="/investment">My Investment</Link>
                </li>
              )}
              {isSubscriberOwner(credentials) && (
                <li
                  className={
                    pathname === '/billing' ? 'navItemSelected' : 'navItem'
                  }
                >
                  <Link to="/billing">Billing</Link>
                </li>
              )}
              <li
                className={
                  pathname === '/projectnews' ? 'navItemSelected' : 'navItem'
                }
              >
                <Link to="/projectnews">Project News</Link>
              </li>
              {isAdmin(credentials) && (
                <li
                  className={
                    pathname === '/admin' ? 'navItemSelected' : 'navItem'
                  }
                >
                  <Link to="/admin">Admin</Link>
                </li>
              )}
              <li className="navItem">
                <Link to="/profile">
                  <img src={Gear} alt="Settings" />
                </Link>
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
