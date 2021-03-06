/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import ErrorIcon from '../../../assets/error.svg';
import Tooltip from '../components/Tooltip';
import Constants from '../../../constants';
import { calculatePaypalTransactionFee } from '../../../lib/paypal/paypal';
import { formatAmount } from '../../../lib/subscriberUtils';

const { SHARE_PRICE, MAX_SHARES } = Constants;

class PaymentDetailsStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dividendsMarked: false,
      displayUnmarkedDividend: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onSubmit = () => {
    const { onSubmit } = this.props;
    const { dividendsMarked } = this.state;
    if (!dividendsMarked) {
      this.setState({
        displayUnmarkedDividend: true
      });
    } else {
      onSubmit();
    }
  };

  minusShares = () => {
    const { owner, handleChange } = this.props;
    const event = {
      target: {
        name: 'numberOfShares',
        value: owner.numberOfShares - 1
      }
    };
    if (event.target.value > -1) {
      handleChange(event);
    }
  };

  addShares = () => {
    const { owner, handleChange } = this.props;

    const event = {
      target: {
        name: 'numberOfShares',
        value: owner.numberOfShares + 1
      }
    };
    if (event.target.value <= MAX_SHARES) {
      handleChange(event);
    }
  };

  handleChangeDividends = e => {
    const { handleChange } = this.props;
    handleChange(e);
    this.setState({
      dividendsMarked: true,
      displayUnmarkedDividend: false
    });
  };

  render() {
    const { owner, errors, onBack, handleChange } = this.props;
    const { displayUnmarkedDividend, dividendsMarked } = this.state;
    const baseAmount = owner.numberOfShares * SHARE_PRICE;
    const transactionFee = calculatePaypalTransactionFee(baseAmount);
    const totalAmountToPay = baseAmount + transactionFee;

    return (
      <div className="w-100">
        <div className="flex w-100 justify-space-between onboarding-row ">
          <div className="w-60">
            <div className="payment-shares-card">
              <div className="payment-shares-header">
                Number of shares (max {MAX_SHARES})
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
                    onChange={handleChange}
                    value={owner.numberOfShares}
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
              <div className="validation">
                {errors.numberOfShares ? errors.numberOfShares : '\u00A0'}
              </div>
              <div>
                <div className="payment-dividends-header">
                  We aim to provide dividends of around 1.5% per year. Please
                  select your preference for dividends:
                </div>
                <div className="payment-dividends-option">
                  <input
                    type="radio"
                    name="isReceivingDividends"
                    className="payment-dividends-radio"
                    checked={dividendsMarked && owner.isReceivingDividends}
                    onChange={this.handleChangeDividends}
                  />
                  <label
                    htmlFor=""
                    className="payment-dividends-choice"
                    onClick={() => {
                      this.handleChangeDividends({
                        target: { name: 'isReceivingDividends', value: 'on' }
                      });
                    }}
                  >
                    Yes, I’d like dividends, thank you!
                  </label>
                </div>
                <div className="payment-dividends-option">
                  <input
                    type="radio"
                    name="isReceivingDividends"
                    className="payment-dividends-radio"
                    checked={dividendsMarked && !owner.isReceivingDividends}
                    onChange={this.handleChangeDividends}
                  />
                  <label
                    htmlFor=""
                    className="payment-dividends-choice"
                    onClick={() => {
                      this.handleChangeDividends({
                        target: { name: 'isReceivingDividends', value: 'off' }
                      });
                    }}
                  >
                    No dividends please. (No pressure to choose this option. We
                    provide the option because people who waive dividends reduce
                    the cost of capital, which reduces the cost of solar, and
                    that helps our cooperative grow its impact.)
                  </label>
                </div>
                <div className=" validation">
                  {errors.isReceivingDividends
                    ? errors.isReceivingDividends
                    : '\u00A0'}
                </div>
                {displayUnmarkedDividend ? (
                  <div className="error-container">
                    <img src={ErrorIcon} alt="error" className="mr-1" />
                    <div className="error-text">
                      Please select your preference for dividends.
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="w-40 pl-1">
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
          </div>
        </div>
        <div className="steps-buttons flex onboarding-row w-100 right justify-space-between">
          <div className="left">
            <button type="button" className="back-button" onClick={onBack}>
              Go back
            </button>
          </div>
          <div className="right">
            <button
              type="button"
              className="btn btn--rounded btn--blue btn--size16 continue-button"
              onClick={this.onSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentDetailsStep;
