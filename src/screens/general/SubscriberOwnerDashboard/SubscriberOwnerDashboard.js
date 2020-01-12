import React from 'react';
import '../../../styles/SubscriberOwnerDashboard.css';
import SubscriberOwnerDashboardAllBillsView from './SubscriberOwnerDashboardAllBillsView';
import SubscriberOwnerDashboardMainView from './SubscriberOwnerDashboardMainView';
import { getLoggedInUserId, getLoggedInUserName } from '../../../lib/auth';
import LoadingComponent from '../../../components/LoadingComponent';

import { areDiffBills, getSubscriberBills } from '../../../lib/subscriberUtils';

export default class SubscriberOwnerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      mode: 0,
      isReady: false
    };
  }

  async componentDidMount() {
    const { history } = this.props;
    const personId = getLoggedInUserId();
    if (!personId) {
      // They shouldn't be able to access this screen
      history.push('/');
    } else {
      this.setState({
        personId
      });

      const { updateState } = this.props;
      const name = getLoggedInUserName();
      updateState(personId, name);
      const transactions = await getSubscriberBills(personId);
      if (transactions) {
        this.setState(prevState => {
          if (areDiffBills(prevState.transactions, transactions)) {
            return { transactions, isReady: true };
          }
          return { isReady: true };
        });
      }
    }
  }

  seeSubscriberOwnerDashboardAllBillsView() {
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
    const { mode, transactions, isReady, personId } = this.state;
    if (!isReady) {
      return <LoadingComponent />;
    }
    if (mode === 0) {
      return (
        <SubscriberOwnerDashboardMainView
          callback={() => this.seeSubscriberOwnerDashboardAllBillsView()}
          transactions={transactions}
          personId={personId}
        />
      );
    }
    if (mode === 1) {
      return (
        <SubscriberOwnerDashboardAllBillsView
          callback={() => this.seeDashboard()}
          transactions={transactions}
          personId={personId}
        />
      );
    }

    return <div>404: invalid state. Call your dev</div>;
  }
}
