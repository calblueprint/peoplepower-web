import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import SharesProgressBar from '../shared/components/SharesProgressBar';
import LeftArrow from '../../assets/left_arrow.png';
import '../../styles/BuyShares.css';
import {
  PayPalButton,
  recordSharePayment,
  calculatePaypalTransactionFee
} from '../../lib/paypal/paypal';
import { refreshUserData } from '../../lib/redux/userData';
import Constants from '../../constants';
import PaymentSuccessCard from '../shared/components/PaymentSuccessCard';
import Tooltip from '../onboarding/components/Tooltip';
import { formatAmount } from '../../lib/subscriberUtils';

const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
const { MAX_SHARES, SHARE_PRICE } = Constants;

class BuyShares extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sharesBuying: 0,
      successScreen: false,
      transactionAmount: 0
    };
  }

  onPaymentSuccess = async (details, data) => {
    const { owner } = this.props;
    const { sharesBuying } = this.state;

    const purchase = details.purchase_units;

    if (purchase !== null && purchase.length >= 1) {
      this.setState({
        transactionAmount: details.purchase_units[0].amount.value,
        successScreen: true
      });
    } else {
      console.warn('A purchase of zero shares cannot be performed.');
    }

    await recordSharePayment(
      details,
      data,
      owner.id,
      owner.numberOfShares + sharesBuying
    );

    await refreshUserData(owner.id, true);
  };

  addShares = () => {
    const { sharesBuying } = this.state;
    const { owner } = this.props;
    const maxAllowed = MAX_SHARES - owner.numberOfShares;
    const totalShares = sharesBuying + owner.numberOfShares;
    if (totalShares === MAX_SHARES) {
      this.setState({ sharesBuying: maxAllowed });
    } else {
      this.setState({ sharesBuying: sharesBuying + 1 });
    }
  };

  minusShares = () => {
    const { sharesBuying } = this.state;
    if (sharesBuying === 0) {
      this.setState({ sharesBuying: 0 });
    } else {
      this.setState({ sharesBuying: sharesBuying - 1 });
    }
  };

  render() {
    const { owner } = this.props;
    const { sharesBuying, successScreen, transactionAmount } = this.state;
    const totalShares = owner.numberOfShares + sharesBuying;
    const baseAmount = sharesBuying * SHARE_PRICE;
    const transactionFee =
      sharesBuying > 0 ? calculatePaypalTransactionFee(baseAmount) : 0;
    const totalAmountToPay = baseAmount + transactionFee;

    const returnTo = 'My Investment';

    // Page should not be accessible if you can't buy more shares
    if (owner.numberOfShares === 10) {
      return <Redirect to="/" />;
    }

    if (successScreen) {
      return (
        <PaymentSuccessCard
          sharesBuying={sharesBuying}
          transactionAmount={transactionAmount}
          showShares
          returnTo={returnTo}
        />
      );
    }
    return (
      <div>
        <div className="back-to-investments">
          <div className="left-button">
            <Link to="/investment">
              <img
                className="button buy-shares-left-arrow"
                src={LeftArrow}
                alt="left arrow"
              />
            </Link>
          </div>
          <h6>Back to My Investment</h6>
        </div>
        <div className="buy-shares-main-header">
          <h1>Buy Shares</h1>
        </div>
        <div className="buy-shares-boxes-content">
          <div className="number-of-shares-box">
            <div className="amount-of-shares-header">
              Number of shares (max {MAX_SHARES - owner.numberOfShares})
            </div>
            <div className="payment-shares-input">
              <label htmlFor="" className="w-100">
                <button
                  type="button"
                  className="payment-shares-input-button-minus"
                  onClick={this.minusShares}
                >
                  -
                </button>
                <input
                  name="numberOfShares"
                  className="payment-shares-input-field"
                  value={totalShares - owner.numberOfShares}
                  disabled
                />
                <button
                  type="button"
                  className="payment-shares-input-button-plus"
                  onClick={this.addShares}
                >
                  +
                </button>
              </label>
            </div>
          </div>
          <div className="buy-shares-right-boxes">
            <div className="current-shares-box">
              <div className="buy-shares-progress-bar">
                <SharesProgressBar numberOfShares={totalShares} />
              </div>
              <div className="buy-shares-progress-bar-text">
                <h5>
                  You are purchasing {totalShares - owner.numberOfShares}{' '}
                  additional shares,
                  <br />
                  owning a total of {totalShares} shares.
                </h5>
                <br />
                <h4>${totalShares * SHARE_PRICE}.00</h4>
              </div>
            </div>
            <div className="payment-summary-card">
              <div className="payment-summary-header">Order Summary</div>
              <div className="flex justify-space-between">
                <div className="left payment-summary-shares">Shares</div>
                <div className="right payment-summary-shares">
                  {formatAmount(baseAmount)}
                </div>
              </div>
              <div className="payment-summary-qty">
                QTY: {owner.numberOfShares}
              </div>
              <div className="flex justify-space-between">
                <div className="left payment-summary-shares">
                  Transaction Fee{' '}
                  <Tooltip label="PayPal charges a service fee of 2.9% + $0.30." />
                </div>
                <div className="right payment-summary-shares">
                  {formatAmount(transactionFee)}
                </div>
              </div>
              <hr className="payment-summary-hr" />
              <div className="flex justify-space-between">
                <div className="left payment-summary-total">Total</div>
                <div className="right payment-summary-total">
                  {formatAmount(totalAmountToPay)}
                </div>
              </div>
            </div>
            {sharesBuying ? (
              <div className="buy-shares-paypal-box">
                <h3>Payment Method</h3>
                <PayPalButton
                  amount={totalAmountToPay.toFixed(2)}
                  className="buy-shares-paypalbutton"
                  onSuccess={this.onPaymentSuccess}
                  options={{
                    clientId
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner
});

export default connect(mapStateToProps)(BuyShares);
