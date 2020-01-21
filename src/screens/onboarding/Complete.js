import React from 'react';
import { refreshUserData } from '../../lib/userDataUtils';
import { getUserLoginById } from '../../lib/airtable/request';
import { store } from '../../lib/redux/store';
import { authenticate } from '../../lib/redux/userDataSlice';

class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  dashboardButton = async () => {
    const { history, toggleNavbar, values } = this.props;
    toggleNavbar();

    // TODO: Replace with proper airlock authentication
    store.dispatch(authenticate('temp_token'));
    const userLogin = await getUserLoginById(values.userLoginId);
    refreshUserData(userLogin);

    history.push('/');
  };

  render() {
    return (
      <div className="flex onboarding-row w-100 right justify-space-between">
        <div className="left" />
        <div className="right">
          <button
            type="button"
            className="getstarted-button"
            onClick={this.dashboardButton}
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }
}

export default Complete;
