import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import formValidation from '../../lib/formValidation';
import { recordShareBuySuccess } from '../../lib/paypal';

import secret from '../../lib/secret';

const { clientId } = secret;

const SHARE_PRICE = 100;

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billingAddressSame: true
    };
  }

  onBuyShareWithPaypalSuccess(details, data) {
    const { nextStep, values } = this.props;
    recordShareBuySuccess(details, data, values);
    nextStep();
  }

  nextButton = e => {
    const { values } = this.props;
    const { errors } = values;
    e.preventDefault();
    const fields = ['numShares', 'dividends'];
    const errorsMessages = [];

    for (let i = 0; i < fields.length; i += 1) {
      const errorMessage = formValidation(fields[i], values[fields[i]]);
      errors[fields[i]] = errorMessage;

      if (errorMessage !== '') {
        errorsMessages.push(errorMessage);
      }
    }

    if (errorsMessages && errorsMessages.length > 0) {
      this.forceUpdate();
    }
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

  validateFields = () => {
    const { billingAddressSame } = this.state;
    this.setState({
      billingAddressSame: !billingAddressSame
    });
  };

  render() {
    const { values, handleChange } = this.props;
    const { errors, numShares } = values;
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
                    placeholder=""
                    onChange={handleChange}
                    defaultValue={values.numShares}
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
                    value="no"
                    checked={values.dividends === 'yes'}
                    onChange={handleChange}
                  />
                  <span className="payment-dividends-radio" />
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
                    checked={values.dividends === 'no'}
                    onChange={handleChange}
                  />
                  <span className="payment-dividends-radio" />
                  <label htmlFor="" className="payment-dividends-choice">
                    No dividends please. (No pressure to choose this option. We
                    provide the option because people who waive dividends reduce
                    the cost of capital, which reduces the cost of solar, and
                    that helps our cooperative grow its impact.)
                  </label>
                </div>
              </div>
            </div>
            <div className="payment-cc-card">
              <div className="payment-shares-header">Payment Information</div>
              <div className="mt-3">
                <PayPalButton
                  amount={numShares * SHARE_PRICE}
                  onSuccess={this.onBuyShareWithPaypalSuccess}
                  options={{
                    clientId
                  }}
                  onClick={this.validateFields()}
                />
              </div>
            </div>
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
            <button
              type="button"
              className="continue-button"
              onClick={this.nextButton}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
