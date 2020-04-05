import React from 'react';
import { Link } from 'react-router-dom';
import RightArrow from '../../../assets/right_arrow.png';
import '../../../styles/SubscriberOwnerDashboard.css';
import '../../../styles/SubscriberOwnerDashboardMainView.css';
import TransactionsTable from './TransactionsTable';
import { formatAmount } from '../../../lib/subscriberUtils';

export default class BillingMain extends React.PureComponent {
  render() {
    const { seeAllTransactionsView, activeBill, transactions } = this.props;

    // TODO: Need to handle Pending Bill state
    const activeBalance = activeBill ? activeBill.balance : 0;
    const amountPaid = activeBill
      ? activeBill.amountDue - activeBill.balance
      : 0;
    const estimatedRebate = activeBill ? activeBill.estimatedRebate : 0;

    return (
      <div className="billing-dash-outer-container">
        <h1>Billing</h1>
        <div className="billing-dash-inner-container">
          <div className="billing-left-col billing-dash-col">
            <p className="billing-header">My Balance</p>
            <div className="billing-col-card">
              <div className="class-elems billing-balance-section">
                <div className="billing-balance-header-section">
                  <p className="">Current Balance</p>
                  <h3>{formatAmount(activeBalance)}</h3>
                </div>
                <hr id="billing-divider" />

                <div className="billing-balance-nums-section">
                  {!activeBalance ? (
                    <div>
                      <div className="billing-balance-nums-line">
                        <p className="line-item">
                          Hooray! No charges currently due.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="billing-balance-nums-line">
                        <p className="line-item">Outstanding Balance</p>
                        <p className="line-item line-item-value">
                          {formatAmount(activeBill.balanceOnPreviousBill)}
                        </p>
                      </div>
                      <div className="billing-balance-nums-line">
                        <p className="line-item">Latest Power Bill</p>
                        <p className="line-item line-item-value">
                          {formatAmount(activeBill.currentCharges)}
                        </p>
                      </div>
                      {!!estimatedRebate && (
                        <div className="billing-balance-nums-line">
                          <p className="line-item">Estimated Rebate</p>
                          <p className="line-item line-item-value">
                            - {formatAmount(estimatedRebate)}
                          </p>
                        </div>
                      )}
                      {!!amountPaid && (
                        <div className="billing-balance-nums-line">
                          <p className="line-item">Amount Paid</p>
                          <p className="line-item line-item-value">
                            - {formatAmount(amountPaid)}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="billing-balance-divider-container">
                    <div className="billing-full-width-container" />
                    <hr id="balance-billing-divider" />
                  </div>

                  <div className="billing-balance-nums-line">
                    <p className="line-item-total">
                      <strong>Total</strong>
                    </p>
                    <p className="line-item-total line-item-value">
                      <strong>{formatAmount(activeBalance)}</strong>
                    </p>
                  </div>
                  <div className="billing-payment-button-container">
                    <button
                      type="button"
                      className={`billing-payment-button ${
                        !activeBalance ? 'disabled' : ''
                      }`}
                      disabled={!activeBalance}
                    >
                      <Link
                        to={!activeBalance ? undefined : '/billPayment'}
                        className="billing-link-text-white "
                      >
                        Make Payment
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="billing-right-col billing-dash-col">
            <div className="billing-right-duo-header">
              <p className="billing-header">Transaction History</p>
              <button
                className="billing-all-billls-button"
                type="button"
                onClick={seeAllTransactionsView}
              >
                <img
                  className="button right-arrow-button"
                  src={RightArrow}
                  alt="right arrow"
                />
              </button>
            </div>
            <div className="billing-col-card">
              <TransactionsTable
                transactions={transactions}
                numRows={6}
                showPagination={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
