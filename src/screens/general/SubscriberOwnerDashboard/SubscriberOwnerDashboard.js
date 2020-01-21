import React from 'react';
import { connect } from 'react-redux';
import SubscriberOwnerDashboardAllBillsView from './SubscriberOwnerDashboardAllBillsView';
import SubscriberOwnerDashboardMainView from './SubscriberOwnerDashboardMainView';
import LoadingComponent from '../../../components/LoadingComponent';
import { areDiffBills, getSubscriberBills } from '../../../lib/subscriberUtils';
import '../../../styles/SubscriberOwnerDashboard.css';

class SubscriberOwnerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      pendingBills: [],
      mode: 0,
      isReady: false
    };
  }

  async componentDidMount() {
    const { history, authenticated, owner, isLoadingUserData } = this.props;

    // TODO: this kind of redirect logic should be handled in App.js or Navbar.js
    if (!authenticated) {
      // They shouldn't be able to access this screen
      history.push('/');
      return;
    }
    // If data isn't in redux yet, don't do anything.
    if (isLoadingUserData) {
      return;
    }

    const { transactions, pendingBills } = await getSubscriberBills(owner);

    if (transactions) {
      this.setState(prevState => {
        if (areDiffBills(prevState.transactions, transactions)) {
          return {
            transactions,
            pendingBills,
            isReady: true
          };
        }
        return { isReady: true };
      });
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
    const { mode, transactions, isReady, pendingBills } = this.state;
    const { person, isLoadingUserData } = this.props;
    const personId = person.recordIdforDev;
    const isLoading = !isReady || isLoadingUserData;

    if (isLoading) {
      return <LoadingComponent />;
    }

    if (mode === 0) {
      return (
        <SubscriberOwnerDashboardMainView
          callback={() => this.seeSubscriberOwnerDashboardAllBillsView()}
          transactions={transactions}
          pendingBills={pendingBills}
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

const mapStateToProps = state => ({
  authenticated: state.userData.authenticated,
  person: state.userData.person,
  owner: state.userData.owner,
  isLoadingUserData: state.userData.isLoading
});
export default connect(mapStateToProps)(SubscriberOwnerDashboard);
