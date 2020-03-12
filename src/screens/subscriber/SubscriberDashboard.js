import React from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table-v6';
import { Link } from 'react-router-dom';
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
      data: [],
      hasShares: false
    };
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

  render() {
    const { announcements, isLoadingAnnouncements } = this.props;
    const { isLoading, data, pendingBills, hasShares } = this.state;
    const totalBalance = getTotalBalanceFromBills(pendingBills);
    return (
      <div className="subscriber-page ">
        <div className="subscriber-main">
          <div className="subscriber-section">
            <div className="subscriber-section-header">
              <div className="subscriber-header">Billing Summary</div>
              <Link to="/billing">
                <img src={RightArrow} alt="right arrow" />
              </Link>
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
                            <Link
                              to="/billing"
                              className="subscriber-link-text-white"
                            >
                              Make Payment
                            </Link>
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
                            <Link
                              to={{ pathname: '/billing', state: { mode2: 1 } }}
                              className="subscriber-link-text-white "
                            >
                              View All
                            </Link>
                          </button>
                        </div>
                      </div>
                      {isLoading ? (
                        <LoadingComponent />
                      ) : (
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
                                  {d.amtDue ? `+${d.amtDue}` : `-${d.payment}`}
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
                          getTrGroupProps={() => {
                            return {
                              style: {
                                border: 'none'
                              }
                            };
                          }}
                          getTheadProps={() => {
                            return {
                              style: {
                                boxShadow: 'none'
                              }
                            };
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="subscriber-section">
            <div className="subscriber-section-tabs">
              <div className="subscriber-billing-tab">My Solar Project</div>
              {hasShares ? (
                <div className="subscriber-billing-tab">
                  Community Solar Projects
                </div>
              ) : null}
            </div>
            <div className="subscriber-section-body">
              <div className="subscriber-billing-chart-container">
                Very nice graphs
              </div>
            </div>
          </div>
        </div>
        <div className="subscriber-side">
          <div className="subscriber-billing-side-container">
            <div className="subscriber-section-header">
              <div className="subscriber-header">Project News</div>
              <Link to="/projectnews">
                <img src={RightArrow} alt="right arrow" />
              </Link>
            </div>
            <div className="subscriber-side-section-body">
              {isLoadingAnnouncements ? (
                <LoadingComponent />
              ) : (
                announcements.map(announcement => {
                  const { title, message, attachments } = announcement;

                  let url = '';
                  let filename = '';
                  if (attachments) {
                    url = attachments[0].url;
                    filename = attachments[0].filename;
                  }

                  return (
                    <div key={title} className="subscriber-news-card">
                      <div className="cardHeading">
                        <h3>{title}</h3>
                        {url ? <img src={url} alt={filename} /> : null}
                        <p>{message}</p>
                      </div>
                      <div className="cardDetails" />
                    </div>
                  );
                })
              )}
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
