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
      bills: [],
      payments: [],
      mode: 0 // 0 for main billing view, 1 for all bills view
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
    const { mode, bills, payments } = this.state;
    const { isLoadingUserData } = this.props;
    if (isLoadingUserData) {
      return <LoadingComponent />;
    }

    return mode === 0 ? (
      <BillingMainView
        seeAllBills={() => this.seeAllBills()}
        bills={bills}
        payments={payments}
      />
    ) : (
      <BillingAllBillsView
        seeMain={() => this.seeMain()}
        bills={bills}
        payments={payments}
      />
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  isLoadingUserData: state.userData.isLoading
});
export default connect(mapStateToProps)(Billing);
