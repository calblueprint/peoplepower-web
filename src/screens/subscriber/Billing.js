import React from 'react';
import qs from 'qs';
import { connect } from 'react-redux';
import BillingAllBillsView from './components/BillingAllTransactionsView';
import BillingMainView from './components/BillingMainView';
import LoadingComponent from '../../components/LoadingComponent';
import { getSubscriberTransactionData } from '../../lib/subscriberUtils';
import '../../styles/SubscriberOwnerDashboard.css';

class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBill: null,
      transactions: [],
      mode: 0 // 0 for main billing view, 1 for all bills view
    };

    // Check URL for default mode param
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

    const { activeBill, transactions } = await getSubscriberTransactionData(
      owner
    );
    this.setState({ activeBill, transactions });
  }

  seeAllTransactionsView = () => {
    this.setState({
      mode: 1
    });
  };

  seeMainView = () => {
    this.setState({
      mode: 0
    });
  };

  render() {
    const { mode, activeBill, transactions } = this.state;
    const { isLoadingUserData } = this.props;
    if (isLoadingUserData) {
      return <LoadingComponent />;
    }

    return mode === 0 ? (
      <BillingMainView
        seeAllTransactionsView={this.seeAllTransactionsView}
        transactions={transactions}
        activeBill={activeBill}
      />
    ) : (
      <BillingAllBillsView
        seeMainView={this.seeMainView}
        transactions={transactions}
      />
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  isLoadingUserData: state.userData.isLoading
});
export default connect(mapStateToProps)(Billing);
