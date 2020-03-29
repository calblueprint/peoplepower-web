import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2/lib';
import {
  getSubscriberTransactionData,
  formatAmount
} from '../../../lib/subscriberUtils';
import Constants from '../../../constants';
import LoadingComponent from '../../../components/LoadingComponent';
import '../../../styles/BillingPayment.css';
import RightArrow from '../../../assets/right_arrow.png';

const { SHARE_PRICE } = Constants;

class BillingPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBill: null,
      loading: true
    };
  }

  componentDidMount = async () => {
    const { owner, isLoadingUserData } = this.props;

    if (isLoadingUserData) {
      return;
    }

    const { activeBill } = await getSubscriberTransactionData(owner);
    this.setState({
      activeBill,
      loading: false
    });
  };

  render() {
    const { activeBill, loading } = this.state;
    const { isLoadingUserData, owner } = this.props;

    if (isLoadingUserData || loading) {
      return <LoadingComponent />;
    }

    // No Active Bill
    // Need to add pending state
    // TODO: maybe we should display an error message here
    if (activeBill === 0) {
      return <Redirect to="/" />;
    }

    const activeBalance = activeBill ? activeBill.balance : 0;
    const amountPaid = activeBill
      ? activeBill.amountDue - activeBill.balance
      : 0;
    const estimatedRebate = activeBill ? activeBill.estimatedRebate : 0;
    return (
      <div>
        <div className="billing-dash-outer-container">
          <button className="subscriber-back-button" type="button">
            <div className="billing-payment-back-button-container">
              <img
                className="button right-arrow-button-flipped"
                src={RightArrow}
                alt="right arrow"
              />
              <label>Back</label>
            </div>
          </button>
          <h1>Make Payment</h1>
          <div className="billing-dash-inner-container">
            <div className="billing-payment-left-col billing-dash-col">
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
                  </div>
                </div>
              </div>
            </div>
            <div className="billing-payment-right-col billing-dash-col">
              <div className="billing-col-card">
                <div className="class-elems billing-balance-section">
                  <div className="billing-payment-summary-header">
                    Payment Details
                  </div>
                  <div className="billing-balance-nums-section">
                    <div className="billing-balance-nums-line">
                      <p className="line-item">Payment Amount</p>
                      <p className="line-item line-item-value">$0.00</p>
                    </div>
                    <div className="billing-balance-nums-line">
                      <p className="line-item">Remaining Balance</p>
                      <p className="line-item line-item-value">$0.00</p>
                    </div>
                    <div className="billing-balance-divider-container">
                      <div className="billing-full-width-container" />
                      <hr id="balance-billing-divider" />
                    </div>

                    <div className="billing-balance-nums-line">
                      <p className="line-item-total">
                        <strong>Payment Total</strong>
                      </p>
                      <p className="line-item-total line-item-value">
                        <strong>{formatAmount(activeBalance)}</strong>
                      </p>
                    </div>
                  </div>
                  <PayPalButton
                    amount={owner.numberOfShares * SHARE_PRICE}
                    onSuccess={a => {
                      console.log(a);
                    }}
                    options={{
                      clientId
                    }}
                  />
                </div>
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
  isLoadingUserData: state.userData.isLoading
});
export default connect(mapStateToProps)(BillingPayment);
