import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { recordShareBuySuccess } from '../../../lib/paypalUtils';

const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

const SHARE_PRICE = 100;

class PaymentStep extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   billingAddressSame: true
    // };
    this.state = {
      paid: false
    };
  }

  onBuyShareWithPaypalSuccess = (details, data) => {
    const { owner, onSubmit } = this.props;
    recordShareBuySuccess(details, data, owner); // TODO(dfangshuo): no await?
    console.log('Paypal success');
    // Todo: Deal with validation somehow...
    // Might need to manually validate fields before paying
    // Will revisit!
    onSubmit();
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
    if (event.target.value < 11) {
      handleChange(event);
    }
  };

  render() {
    const { owner, errors, onBack, handleChange } = this.props;
    const { paid } = this.state;
    return (
      <div className="w-100">
        <div className="flex w-100 justify-space-between onboarding-row ">
          <div className="w-60">
            <div className="payment-shares-card">
              <div className="payment-shares-header">
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
                    value="yes"
                    checked={owner.isReceivingDividends}
                    onChange={handleChange}
                  />
                  <label htmlFor="" className="payment-dividends-choice">
                    Yes, I’d like dividends, thank you!
                  </label>
                </div>
                <div className="payment-dividends-option">
                  <input
                    type="radio"
                    name="isReceivingDividends"
                    className="payment-dividends-radio"
                    value="no"
                    checked={!owner.isReceivingDividends}
                    onChange={handleChange}
                  />
                  <label htmlFor="" className="payment-dividends-choice">
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
              </div>
            </div>
            {!paid ? (
              <div className="payment-cc-card">
                <div className="payment-shares-header">Payment Information</div>
                <div className="mt-3">
                  <PayPalButton
                    amount={owner.numberOfShares * SHARE_PRICE}
                    onSuccess={this.onBuyShareWithPaypalSuccess}
                    options={{
                      clientId
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
          <div className="w-40 pl-1">
            <div className="payment-summary-card">
              <div className="payment-summary-header">Order Summary</div>
              <div className="flex justify-space-between">
                <div className="left payment-summary-shares">Shares</div>
                <div className="right payment-summary-shares">
                  ${owner.numberOfShares * SHARE_PRICE}.00
                </div>
              </div>
              <div className="payment-summary-qty">
                QTY: {owner.numberOfShares}
              </div>
              <hr className="payment-summary-hr" />
              <div className="flex justify-space-between">
                <div className="left payment-summary-total">Total</div>
                <div className="right payment-summary-total">
                  ${owner.numberOfShares * SHARE_PRICE}.00
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
            {/* <button
              type="button"
              className="btn btn--rounded btn--blue btn--size16 continue-button"
              onClick={this.continue}
            >
              Continue
            </button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentStep;
