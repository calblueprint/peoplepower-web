import React from 'react';
import qs from 'qs';
import { connect } from 'react-redux';
import BillingAllBills from './components/BillingAllTransactions';
import BillingMain from './components/BillingMain';
import { getSubscriberTransactionData } from '../../lib/subscriberUtils';
import '../../styles/SubscriberOwnerDashboard.css';
import LoadingComponent from '../../components/LoadingComponent';

class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBill: null,
      transactions: [],
      loading: true,
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
    const { owner } = this.props;

    const { activeBill, transactions } = await getSubscriberTransactionData(
      owner
    );
    this.setState({ activeBill, transactions, loading: false });
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
    const { mode, activeBill, transactions, loading } = this.state;

    if (loading) {
      return <LoadingComponent />;
    }

    return mode === 0 ? (
      <BillingMain
        seeAllTransactionsView={this.seeAllTransactionsView}
        transactions={transactions}
        activeBill={activeBill}
      />
    ) : (
      <BillingAllBills
        seeMainView={this.seeMainView}
        transactions={transactions}
      />
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner
});
export default connect(mapStateToProps)(Billing);
