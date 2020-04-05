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
import Gear from '../assets/settings.png';
import '../styles/NavBar.css';

class NavBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPathname: props.pathname
    };
  }

  componentDidMount() {
    this.refreshState();
  }

  refreshState() {
    const { pathname } = this.props;
    this.setState({
      currentPathname: pathname
    });
  }

  render() {
    const { credentials } = this.props;
    const displayNavbar = isSignedIn(credentials) && !isOnboarding(credentials);
    const { currentPathname } = this.state;

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
                  currentPathname === '/' ? 'nav-item-selected' : 'nav-item'
                }
              >
                <Link to="/">Dashboard</Link>
              </li>
              {isGeneralOwner(credentials) && (
                <li
                  className={
                    currentPathname === '/investment'
                      ? 'nav-item-selected'
                      : 'nav-item'
                  }
                >
                  <Link to="/investment">My Investment</Link>
                </li>
              )}
              {isSubscriberOwner(credentials) && (
                <li
                  className={
                    currentPathname === '/billing'
                      ? 'nav-item-selected'
                      : 'nav-item'
                  }
                >
                  <Link to="/billing">Billing</Link>
                </li>
              )}
              <li
                className={
                  currentPathname === '/projectnews'
                    ? 'nav-item-selected'
                    : 'nav-item'
                }
              >
                <Link to="/projectnews">Project News</Link>
              </li>
              {isAdmin(credentials) && (
                <li
                  className={
                    currentPathname === '/admin'
                      ? 'nav-item-selected'
                      : 'nav-item'
                  }
                >
                  <Link to="/admin">Admin</Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="/profile">
                  <img className="nav-item-gear" src={Gear} alt="Settings" />
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
