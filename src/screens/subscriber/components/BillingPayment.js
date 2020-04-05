import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2/lib';
import {
  getSubscriberTransactionData,
  formatAmount
} from '../../../lib/subscriberUtils';
import LoadingComponent from '../../../components/LoadingComponent';
import '../../../styles/BillingPayment.css';
import RightArrow from '../../../assets/right_arrow.png';
import { recordBillPayment } from '../../../lib/paypalUtils';

const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

class BillingPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBill: null,
      paymentAmount: 0,
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
      loading: false,
      paymentAmount: Number(activeBill.balance.toFixed(2))
    });
  };

  onChangePaymentAmount = event => {
    const { activeBill } = this.state;
    let newAmount = event.target.value;
    newAmount = Math.max(0.01, newAmount); // Pay atleast 1 cent
    newAmount = Math.min(activeBill.balance, newAmount); // Pay no more than balance
    this.setState({ paymentAmount: newAmount });
  };

  render() {
    const { activeBill, paymentAmount, loading } = this.state;
    const { isLoadingUserData } = this.props;

    if (isLoadingUserData || loading) {
      return <LoadingComponent />;
    }

    if (activeBill === 0) {
      return <Redirect to="/" />;
    }

    // TODO: Update bill in airtable to only have 2 decimal places
    const activeBalance = activeBill
      ? Number(activeBill.balance.toFixed(2))
      : 0;
    const amountPaid = activeBill
      ? activeBill.amountDue - activeBill.balance
      : 0;
    const estimatedRebate = activeBill ? activeBill.estimatedRebate : 0;
    const remainingBalance = activeBalance - paymentAmount;
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
                      <input
                        className="line-item line-item-value line-item-input"
                        value={paymentAmount}
                        type="number"
                        onChange={this.onChangePaymentAmount}
                      />
                    </div>
                    <div className="billing-balance-nums-line">
                      <p className="line-item">Remaining Balance</p>
                      <p className="line-item line-item-value">
                        {formatAmount(remainingBalance)}
                      </p>
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
                    amount={paymentAmount}
                    onSuccess={(details, data) => {
                      recordBillPayment(details, data, activeBill);
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
