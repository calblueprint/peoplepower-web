import React from 'react';
import { connect } from 'react-redux';
import DashboardBillingSection from './components/DashboardBillingSection';
import DashboardChartsSection from './components/DashboardChartsSection';
import DashboardProjectNewsSection from './components/DashboardProjectNewsSection';
import '../../styles/SubscriberDashboard.css';
import '../../styles/Community.css';
import {
  areDiffBills,
  getSubscriberBills,
  centsToDollars,
  formatStatus
} from '../../lib/subscriberUtils';
import { dateToFullMonth, formatDate } from '../../lib/dateUtils';
import { getTotalBalanceFromBills } from '../../lib/paypalUtils';
import constants from '../../constants';

const { ONLINE_PAYMENT_TYPE } = constants;

const createCondensedPaymentTransaction = transaction => {
  return {
    startDate: transaction.startDate,
    statementDate: formatDate(transaction.transactionDate),
    description: transaction.type,
    status: formatStatus(transaction.status),
    payment: `$${centsToDollars(transaction.amount)}`
  };
};

const createCondensedBillTransaction = transaction => {
  return {
    balance: transaction.balance,
    startDate: transaction.startDate,
    statementDate: formatDate(transaction.transactionDate),
    description: `${dateToFullMonth(transaction.startDate)} Power Bill`,
    status: transaction.status,
    amtDue: `$${centsToDollars(transaction.amountDue)}`
  };
};

class SubscriberDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: '',
      transactions: [],
      pendingBills: [],
      mode: 0,
      isReady: false,
      data: [],
      hasShares: false,
      activeTab: 'My Solar Project'
    };
    this.switchChartView = this.switchChartView.bind(this);
  }

  async componentDidMount() {
    const { owner, isLoadingUserData } = this.props;

    // If data isn't in redux yet, don't do anything.
    if (isLoadingUserData) {
      return;
    }

    if (owner.numberOfShares !== 0) {
      this.setState({
        hasShares: true
      });
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

    this.setState({
      data: transactions.map(t =>
        t.type === ONLINE_PAYMENT_TYPE
          ? createCondensedPaymentTransaction(t)
          : createCondensedBillTransaction(t)
      )
    });
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

  switchChartView() {
    const { activeTab, hasShares } = this.state;
    if (activeTab === 'My Solar Project' && hasShares) {
      this.setState({
        activeTab: 'Community Solar Projects'
      });
    } else {
      this.setState({
        activeTab: 'My Solar Project'
      });
    }
  }

  render() {
    const { announcements, isLoadingAnnouncements } = this.props;
    const { data, pendingBills, hasShares, activeTab } = this.state;
    const totalBalance = getTotalBalanceFromBills(pendingBills);
    return (
      <div className="subscriber-page ">
        <div className="subscriber-main">
          <div className="subscriber-section">
            <DashboardBillingSection data={data} totalBalance={totalBalance} />
          </div>
          <div className="subscriber-section">
            <DashboardChartsSection
              switchChartView={this.switchChartView}
              hasShare={hasShares}
              activeTab={activeTab}
            />
          </div>
        </div>
        <div className="subscriber-side">
          <DashboardProjectNewsSection
            announcements={announcements}
            isLoadingAnnouncements={isLoadingAnnouncements}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  projectGroup: state.userData.projectGroup,
  solarProjects: state.userData.solarProjects,
  announcements: state.community.announcements,
  isLoadingUserData: state.userData.isLoading,
  isLoadingAnnouncements: state.community.isLoading,
  credentials: state.userData.credentials
});

export default connect(mapStateToProps)(SubscriberDashboard);
