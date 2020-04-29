import React from 'react';
import { Link } from 'react-router-dom';
import Gear from '../assets/settings.png';
import { logOut } from '../lib/airlock';

class SettingsDropdown extends React.PureComponent {
  handleLogoutClick = async () => {
    const { history } = this.props;
    const res = await logOut();
    if (res) {
      history.push('/');
    } else {
      console.warn('Logout failed');
    }
  };

  render() {
    return (
      <div className="settings-dropdown inline">
        <img className="nav-item-gear" alt="nav item gear" src={Gear} />
        <span className="dropdown-content">
          <div className="settings-dropdown-logout">
            <Link to="/profile" className="dropdown-link">
              Settings
            </Link>
          </div>
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
