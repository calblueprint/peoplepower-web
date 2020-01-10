import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import {
  isAdmin,
  isSubscriberOwner,
  isGeneralOwner,
  isSignedIn
} from '../lib/credentials';
import Logo from '../assets/PPSC-logo.png';

export default function NavBar(props) {
  const { personId, displayName, credentials, isNavBarVisible } = props;

  if (!isNavBarVisible) {
    return (
      <div className="navBar">
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
      <div className="navBar">
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
    <div className="navBar">
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
            <Link to="/dashboard">Dashboard</Link>
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
            <Link to={`/profile/${personId}`}>
              <span>{displayName}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
