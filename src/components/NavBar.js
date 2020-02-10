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

class NavBar extends React.PureComponent {
  render() {
    const { owner, credentials } = this.props;
    const displayName = owner.name;

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
              <li className="navItem">
                <Link to="/">Dashboard</Link>
              </li>
              {isGeneralOwner(credentials) && (
                <li className="navItem">
                  <Link to="/investment">My Investment</Link>
                </li>
              )}
              {isSubscriberOwner(credentials) && (
                <li className="navItem">
                  <Link to="/billing">Billing</Link>
                </li>
              )}
              <li className="navItem">
                <Link to="/community">Community</Link>
              </li>
              {isAdmin(credentials) && (
                <li className="navItem">
                  <Link to="/admin">Admin</Link>
                </li>
              )}
              <li className="navItem">
                <Link to="/profile">
                  <span>{displayName}</span>
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
  owner: state.userData.owner,
  credentials: state.userData.credentials
});
export default connect(mapStateToProps)(NavBar);
