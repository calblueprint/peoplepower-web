import React from 'react';
import { Link } from 'react-router-dom';
import Gear from '../assets/settings.png';
import { logOut } from '../lib/authUtils';

class SettingsDropdown extends React.PureComponent {
  handleLogoutClick = () => {
    const { history } = this.props;
    logOut();
    history.push('/');
  };

  render() {
    return (
      <div className="settings-dropdown inline">
        <img className="nav-item-gear" alt="nav item gear" src={Gear} />
        <span className="dropdown-content">
          <Link to="/profile" className="dropdown-link">
            Settings
          </Link>
          <button
            type="button"
            className="dropdown-logout dropdown-link"
            onClick={this.handleLogoutClick}
          >
            Logout
          </button>
        </span>
      </div>
    );
  }
}

export default SettingsDropdown;
