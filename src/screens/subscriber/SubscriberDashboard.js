import React from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table-v6';
import AnnouncementList from '../shared/components/AnnouncementList';
import '../../styles/SubscriberDashboard.css';
import RightArrow from '../../assets/right_arrow.png';
import '../../styles/Community.css';
import LoadingComponent from '../../components/LoadingComponent';
import {
  areDiffBills,
  getSubscriberBills,
  centsToDollars,
  formatStatus
} from '../../lib/subscriberUtils';
import { dateToFullMonth, formatDate } from '../../lib/dateUtils';
import '../../styles/SubscriberOwnerDashboard.css';
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
    // const { transactions } = this.props;
    this.state = {
      credentials: '',
      transactions: [],
      pendingBills: [],
      mode: 0,
      isReady: false,
      data: []
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

  render() {
    const { announcements, isLoadingAnnouncements } = this.props;
    const { isLoading, data, pendingBills } = this.state;
    const totalBalance = getTotalBalanceFromBills(pendingBills);

    return (
      <div className="subscriber-page ">
        <div className="subscriber-main">
          <div className="subscriber-section">
            <div className="subscriber-section-header">
              <div className="subscriber-header">Billing Summary</div>
              <a href="/">
                <img src={RightArrow} alt="right arrow" />
              </a>
            </div>
            <div className="subscriber-section-body">
              {isLoading ? (
                <LoadingComponent />
              ) : (
                <div>
                  <div className="subscriber-billing-container">
                    <div className="subscriber-billing-current-container">
                      <div className="subscriber-billing-header">
                        Current Balance
                      </div>
                      <h3 className="subscriber-billing-balance">
                        ${centsToDollars(totalBalance)}
                      </h3>
                      <div>
                        {totalBalance === 0 ? null : (
                          <button
                            type="button"
                            className="subscriber-billing-make-payment-button"
                          >
                            Make Payment
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="subscriber-billing-recent-container">
                      <div className="subscriber-billing-header-inline">
                        <div className="subscriber-billing-header">
                          Recent Transactions
                        </div>
                        <div>
                          <button
                            type="button"
                            className="subscriber-billing-view-all-button"
                          >
                            View All
                          </button>
                        </div>
                      </div>
                      <ReactTable
                        data={data}
                        columns={[
                          {
                            id: 'statementDate',
                            accessor: d => (
                              <div className="subscriber-billing-recent-row ">
                                {d.statementDate}
                              </div>
                            )
                            // width: 100
                          },
                          {
                            id: 'description',
                            accessor: d => (
                              <div className="subscriber-billing-recent-row ">
                                <b>{d.description}</b>
                              </div>
                            ),
                            width: 200
                          },
                          {
                            id: 'amtDue',
                            accessor: d => (
                              <div className="subscriber-billing-recent-row ">
                                {d.amtDue}
                              </div>
                            )
                            // width: 150
                          },
                          {
                            id: 'payment',
                            accessor: d => (
                              <div className="subscriber-billing-recent-row ">
                                {d.payment}
                              </div>
                            )
                            // width: 150
                          },
                          {
                            id: 'status',
                            accessor: d => (
                              <div className="subscriber-billing-recent-row ">
                                {d.status}
                              </div>
                            )
                            // width: 100
                          }
                        ]}
                        getTdProps={() => ({
                          style: { border: 'none' }
                        })}
                        defaultPageSize={2}
                        className="subscriber-billing-recent-table"
                        showPagination={false}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="subscriber-section">
            <div className="subscriber-section-header">
              <div className="subscriber-header">My Solar Project</div>
              <a href="/">
                <img src={RightArrow} alt="right arrow" />
              </a>
            </div>
            <div className="subscriber-section-body">Very nice graphs</div>
          </div>
        </div>
        <div className="subscriber-side">
          <div className="subscriber-section">
            <div className="subscriber-section-header">
              <div className="subscriber-header">Community</div>
              <a href="/">
                <img src={RightArrow} alt="right arrow" />
              </a>
            </div>
            <div className="subscriber-section-body">
              <div className="cont">
                {isLoadingAnnouncements ? (
                  <div className="is-loading-div card" />
                ) : (
                  <AnnouncementList announcements={announcements} css="" />
                )}
              </div>
            </div>
          </div>
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
