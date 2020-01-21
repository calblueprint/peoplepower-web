import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { recordShareBuySuccess } from '../../lib/paypalUtils';
import { updatePerson } from '../../lib/airtable/request';

const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

const SHARE_PRICE = 100;

class Payment extends React.Component {
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
    const { values } = this.props;
    recordShareBuySuccess(details, data, values); // TODO(dfangshuo): no await?
    console.log('Paypal success');
    this.continue();
  };

  // Only called after user has paid
  continue = () => {
    const { values, nextStep } = this.props;
    const { userId } = values;

    // No validation as everything is already decided at this point (user has paid)
    const updatedPerson = {
      onboardingStep: 6
    };

    updatePerson(userId, updatedPerson); // TODO(dfangshuo): no await?
    nextStep();
  };

  minusShares = () => {
    const { values, handleChange } = this.props;
    const { numShares } = values;
    const event = {
      target: {
        name: 'numShares',
        value: numShares - 1
      }
    };
    if (event.target.value > -1) {
      handleChange(event);
    }
  };

  addShares = () => {
    const { values, handleChange } = this.props;
    const { numShares } = values;
    const event = {
      target: {
        name: 'numShares',
        value: numShares + 1
      }
    };
    if (event.target.value < 11) {
      handleChange(event);
    }
  };

  prevButton = e => {
    const { prevStep } = this.props;
    e.preventDefault();
    prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    const { errors, numShares } = values;
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
                    name="numShares"
                    className="payment-shares-input-field"
                    onChange={handleChange}
                    value={numShares}
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
                {errors.numShares ? errors.numShares : '\u00A0'}
              </div>
              <div>
                <div className="payment-dividends-header">
                  We aim to provide dividends of around 1.5% per year. Please
                  select your preference for dividends:
                </div>
                <div className="payment-dividends-option">
                  <input
                    type="radio"
                    name="dividends"
                    className="payment-dividends-radio"
                    value="yes"
                    checked={values.dividends}
                    onChange={handleChange}
                  />
                  <label htmlFor="" className="payment-dividends-choice">
                    Yes, I’d like dividends, thank you!
                  </label>
                </div>
                <div className="payment-dividends-option">
                  <input
                    type="radio"
                    name="dividends"
                    className="payment-dividends-radio"
                    value="no"
                    checked={!values.dividends}
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
                  {errors.dividends ? errors.dividends : '\u00A0'}
                </div>
              </div>
            </div>
            {!paid ? (
              <div className="payment-cc-card">
                <div className="payment-shares-header">Payment Information</div>
                <div className="mt-3">
                  <PayPalButton
                    amount={numShares * SHARE_PRICE}
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
                  ${numShares * SHARE_PRICE}.00
                </div>
              </div>
              <div className="payment-summary-qty">QTY: {numShares}</div>
              <hr className="payment-summary-hr" />
              <div className="flex justify-space-between">
                <div className="left payment-summary-total">Total</div>
                <div className="right payment-summary-total">
                  ${numShares * SHARE_PRICE}.00
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="steps-buttons flex onboarding-row w-100 right justify-space-between">
          <div className="left">
            <button
              type="button"
              className="back-button"
              onClick={this.prevButton}
            >
              Go back
            </button>
          </div>
          <div className="right">
            {/* <button
              type="button"
              className="pp-blue-rounded-button continue-button"
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

export default Payment;
