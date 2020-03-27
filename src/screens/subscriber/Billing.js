import React from 'react';
import qs from 'qs';
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
      bills: [],
      payments: [],
      mode: 0, // 0 for Billing, 1 for Both
      isReady: false
    };

    const { view } = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    });

    if (view === 'all') {
      this.state.mode = 1;
    }
  }

  async componentDidMount() {
    const { owner, isLoadingUserData } = this.props;

    // If data isn't in redux yet, don't do anything.
    if (isLoadingUserData) {
      return;
    }

    const { bills, payments } = await getSubscriberTransactionData(owner);
    this.setState({ bills, payments });
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
    const { isLoadingUserData } = this.props;
    const isLoading = !isReady || isLoadingUserData;
    if (isLoading) {
      return <LoadingComponent />;
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
    if (mode === 1) {
      return (
        <BillingAllBillsView
          callback={() => this.seeMain()}
          transactions={transactions}
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
