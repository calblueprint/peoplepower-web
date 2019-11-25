import React from 'react';
import '../../styles/SubscriberOwnerPage.css';

import AllBills from './AllBills';
import SubscriberOwnerDashboard from './SubscriberOwnerDashboard';
import { getLoggedInUserId } from '../../lib/auth';

import { areDiffBills, getSubscriberBills } from '../../lib/subscriberHelper';

export default class SubscriberOwnerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
      mode: 0,
      isReady: false
    };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const id = getLoggedInUserId();
    if (!id) {
      // They shouldn't be able to access this screen
      history.push('/');
    } else {
      this.getBills();
    }
  }

  getBills() {
    const loggedInUserId = getLoggedInUserId();
    getSubscriberBills(loggedInUserId, this.updateState);
  }

  updateState(bills) {
    if (bills == null) {
      console.error('bills argument to updateState is null');
      return;
    }

    this.setState(prevState => {
      if (areDiffBills(prevState.bills, bills)) {
        return { bills, isReady: true };
      }
      return { isReady: true };
    });
  }

  seeAllbills() {
    this.setState({
      mode: 1
    });
  }

  seeDashboard() {
    this.setState({
      mode: 0
    });
  }

  render() {
    const { mode, bills, isReady } = this.state;
    if (!isReady) {
      return (
        <div>
          <strong>Loading...</strong>
        </div>
      );
    }
    if (mode === 0) {
      return (
        <SubscriberOwnerDashboard
          callback={() => this.seeAllbills()}
          bills={bills}
        />
      );
    }
    if (mode === 1) {
      return <AllBills callback={() => this.seeDashboard()} bills={bills} />;
    }

    return <div>404: invalid state. Call your dev</div>;
  }
}
