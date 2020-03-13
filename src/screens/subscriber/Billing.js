import React from 'react';
import { connect } from 'react-redux';
import BillingAllBillsView from './components/BillingAllBillsView';
import BillingMainView from './components/BillingMainView';
import LoadingComponent from '../../components/LoadingComponent';
import { areDiffBills, getSubscriberBills } from '../../lib/subscriberUtils';
import '../../styles/SubscriberOwnerDashboard.css';

class Billing extends React.Component {
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
    const { owner, isLoadingUserData } = this.props;

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

  seeAllBills() {
    this.setState({
      mode: 1
    });
  }

  seeMain() {
    this.setState({
      mode: 0
    });
  }

  render() {
    const { mode, transactions, isReady, pendingBills } = this.state;
    const { isLoadingUserData, location } = this.props;
    const { state } = location;
    const { mode2 } = state;
    const isLoading = !isReady || isLoadingUserData;
    if (isLoading) {
      return <LoadingComponent />;
    }
    if (mode === 1 || mode2 === 1) {
      return (
        <BillingAllBillsView
          callback={() => this.seeMain()}
          transactions={transactions}
        />
      );
    }
    if (mode === 0) {
      return (
        <BillingMainView
          callback={() => this.seeAllBills()}
          transactions={transactions}
          pendingBills={pendingBills}
        />
      );
    }

    return <div>404: invalid state. Call your dev</div>;
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  isLoadingUserData: state.userData.isLoading
});
export default connect(mapStateToProps)(Billing);
