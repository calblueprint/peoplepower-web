import React from 'react';
import { Link } from 'react-router-dom';
import Gear from '../assets/settings.png';
import { logoutUser } from '../lib/airlock/airlock';
import LoadingComponent from './LoadingComponent';

class SettingsDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleLogoutClick = async () => {
    this.setState({ loading: true });
    const { history } = this.props;
    const logOutSuccess = await logoutUser();
    if (logOutSuccess) {
      history.push('/');
    } else {
      // TODO: Display error to user (also wonder if there's a way to encapsulate this logic in auth.js)
      console.warn('Logout failed');
    }
    this.setState({ loading: true });
  };

  render() {
    const { loading } = this.state;
    if (loading) {
      return <LoadingComponent />;
    }
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
