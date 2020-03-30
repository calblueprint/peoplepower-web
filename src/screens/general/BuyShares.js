import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import SharesProgressBar from './components/SharesProgressBar';
import LeftArrow from '../../assets/left_arrow.png';
import '../../styles/BuyShares.css';

const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
const SHARE_PRICE = 100;

class BuyShares extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sharesBuying: 0
    };
  }

  addShares = () => {
    const { sharesBuying } = this.state;
    const { owner } = this.props;
    if (sharesBuying + owner.numberOfShares === 10) {
      this.setState({ sharesBuying: 10 - owner.numberOfShares });
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
    const { sharesBuying } = this.state;

    return (
      <div>
        <div className="back-to-investments">
          <div className="left-button">
            <Link to="/investment">
              <img
                className="button right-arrow-button"
                src={LeftArrow}
                alt="back arrow"
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
              Number of shares (max 10)
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
                  value={owner.numberOfShares + sharesBuying}
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
                <SharesProgressBar
                  numberOfShares={owner.numberOfShares + sharesBuying}
                />
              </div>
              <div className="buy-shares-progress-bar-text">
                <h5>
                  You are purchasing {sharesBuying} additional shares,
                  <br />
                  owning a total of {owner.numberOfShares + sharesBuying}{' '}
                  shares.
                </h5>
                <br />
                <h4>${owner.numberOfShares * 100 + sharesBuying * 100}.00</h4>
              </div>
            </div>
            <div className="buy-shares-payment-summary-box">
              <h3>Payment Summary</h3>
              <div className="shares-price-line">
                <h5> Shares </h5>

                <h5>${sharesBuying * 100}.00</h5>
              </div>
              <h6>QTY: {sharesBuying}</h6>
              <hr className="buy-shares-summary-hr" />
              <div className="shares-total-price-line">
                <h5> Total </h5>

                <h5>${sharesBuying * 100}.00</h5>
              </div>
            </div>
            <div className="buy-shares-paypal-box">
              <h3>Payment Method</h3>
              <PayPalButton
                amount={sharesBuying * SHARE_PRICE}
                onSuccess={this.onBuyShareWithPaypalSuccess}
                options={{
                  clientId
                }}
              />
            </div>
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
