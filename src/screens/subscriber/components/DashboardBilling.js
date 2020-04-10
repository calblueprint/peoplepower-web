import React from 'react';
import { Link } from 'react-router-dom';
import RightArrow from '../../../assets/right_arrow.png';
import TransactionsTable from './TransactionsTable';
import { formatAmount } from '../../../lib/subscriberUtils';

export default class DashboardBilling extends React.PureComponent {
  render() {
    const { activeBill, transactions } = this.props;

    const totalBalance = activeBill ? activeBill.balance : 0;
    return (
      <div>
        <div className="subscriber-section-header">
          <div className="subscriber-header">Billing Summary</div>
          <Link to="/billing">
            <img
              className="button right-arrow-button"
              src={RightArrow}
              alt="right arrow"
            />
          </Link>
        </div>
        <div className="subscriber-section-body">
          <div>
            <div className="subscriber-billing-container">
              <div className="subscriber-billing-current-container">
                <div className="subscriber-billing-header">Current Balance</div>
                <h3 className="subscriber-billing-balance">
                  {formatAmount(totalBalance)}
                </h3>
                <div>
                  <button
                    type="button"
                    className={`billing-payment-button ${
                      totalBalance === 0 ? 'disabled' : ''
                    }`}
                    disabled={totalBalance === 0}
                  >
                    <Link
                      to={totalBalance === 0 ? '/' : '/billPayment'}
                      className="subscriber-link-text-white"
                    >
                      Make Payment
                    </Link>
                  </button>
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
                        to="/billing?view=all"
                        className="subscriber-link-text-white "
                      >
                        View All
                      </Link>
                    </button>
                  </div>
                </div>
                <TransactionsTable
                  transactions={transactions}
                  numRows={2}
                  showHeader={false}
                  fieldsToShow={['date', 'description', 'amount']}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
