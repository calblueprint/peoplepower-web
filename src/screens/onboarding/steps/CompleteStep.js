import React from 'react';
import { refreshUserData } from '../../../lib/userDataUtils';
import { store } from '../../../lib/redux/store';
import { authenticate } from '../../../lib/redux/userDataSlice';
import { getOwnerById } from '../../../lib/airtable/request';

class CompleteStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  dashboardButton = async () => {
    const { history, values } = this.props;
    // TODO: Replace with proper airlock authentication
    store.dispatch(authenticate('temp_token'));
    // TODO: Revisit this
    const owner = await getOwnerById(values.userId);
    refreshUserData(owner);

    history.push('/');
  };

  render() {
    return (
      <div className="flex onboarding-row w-100 right justify-space-between">
        <div className="left" />
        <div className="right">
          <button
            type="button"
            className="btn btn--rounded btn--pink btn--size12 getstarted-button"
            onClick={this.dashboardButton}
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }
}

export default CompleteStep;
