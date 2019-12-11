import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import formValidation from '../../lib/formValidation';
import { updatePerson } from '../../lib/request';
import { recordBillPaymentSuccess } from '../../lib/paypal';

import secret from '../../secret';

const { clientId } = secret;

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billingAddressSame: true
    };
  }

  onPaypalPaymentSuccess(details, data) {
    const { nextStep } = this.props;
    const { latestBill } = this.state;
    recordBillPaymentSuccess(details, data, latestBill);
    nextStep();
  }

  nextButton = e => {
    const { values, nextStep } = this.props;
    const {
      errors,
      userId,
      numShares,
      dividends,
      billingStreet,
      billingApt,
      billingCity,
      billingState,
      billingZipcode
    } = values;
    e.preventDefault();
    const fields = [
      'numShares',
      'dividends',
      'billingStreet',
      'billingApt',
      'billingCity',
      'billingState',
      'billingZipcode'
    ];
    const errorsMessages = [];

    for (let i = 0; i < fields.length; i += 1) {
      const errorMessage = formValidation(fields[i], values[fields[i]]);
      errors[fields[i]] = errorMessage;

      if (errorMessage !== '') {
        errorsMessages.push(errorMessage);
      }
    }

    if (!(errorsMessages && errorsMessages.length > 0)) {
      const updatedPerson = {
        id: userId,
        fields: {
          'Number of Shares': numShares,
          Dividends: dividends,
          'Billing Street': billingStreet,
          'Billing Apt': billingApt,
          'Billing City': billingCity,
          'Billing State': billingState,
          'Billing Zipcode': billingZipcode
        }
      };
      updatePerson(updatedPerson);
      recordBillPaymentSuccess();
      nextStep();
    } else {
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

  changeBillingAddress = () => {
    const { billingAddressSame } = this.state;
    this.setState({
      billingAddressSame: !billingAddressSame
    });
  };

  render() {
    const { values, handleChange, handleFormValidation } = this.props;
    const { errors, numShares, billingAddressSame } = values;
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
                  amount={numShares * 100}
                  onSuccess={this.onPaypalPaymentSuccess}
                  options={{
                    clientId
                  }}
                />
              </div>
            </div>
            <div className="payment-cc-card">
              <div className="payment-shares-header">Payment Information</div>
              <div className="w-100 pr-1 ">
                <label className="payment-cc-label">Credit card Number</label>
                <input
                  name="ccnumber"
                  onChange={handleChange}
                  defaultValue={values.ccnumber}
                  className="payment-cc-input"
                />
              </div>
              <div className="validation">
                {errors.ccnumber ? errors.ccnumber : '\u00A0'}
              </div>
              <div className="flex onboarding-row">
                <div className="w-50 pr-1">
                  <label className="payment-cc-label">Expiration Month</label>
                  <input
                    name="expmonth"
                    onChange={handleChange}
                    defaultValue={values.expmonth}
                    className="payment-cc-input"
                  />
                </div>
                <div className="w-50 pr-1">
                  <label className="payment-cc-label">Expiration Year</label>
                  <input
                    name="expyear"
                    onChange={handleChange}
                    defaultValue={values.expyear}
                    className="payment-cc-input"
                  />
                </div>
              </div>
              <div className="flex onboarding-row">
                <div className="w-50 pr-1">
                  <div className="validation">
                    {errors.expmonth ? errors.expmonth : '\u00A0'}
                  </div>
                </div>
                <div className="w-50 pr-1">
                  <div className="validation">
                    {errors.expyear ? errors.expyear : '\u00A0'}
                  </div>
                </div>
              </div>
              <div className="w-30 pr-1">
                <label className="payment-cc-label">CVV</label>
                <input
                  name="cvv"
                  onChange={handleChange}
                  defaultValue={values.cvv}
                  className="payment-cc-input"
                />
              </div>
              <div className="w-30 pr-1">
                <div className="validation">
                  {errors.cvv ? errors.cvv : '\u00A0'}
                </div>
              </div>
            </div>
            <div className="payment-cc-card">
              <div className="payment-shares-header">Billing Address</div>
              <div>
                <label className="checkbox-container">
                  <div className="checkbox-text">
                    My billing address is the same as my mailing address.
                  </div>
                  <input
                    type="checkbox"
                    name="billingAddressSame"
                    onClick={this.changeBillingAddress}
                    onChange={handleChange}
                    checked={billingAddressSame}
                  />
                  <span className="checkmark" />
                </label>
              </div>
              <div style={{ display: billingAddressSame ? 'none' : 'block' }}>
                <div className="w-100 pr-1 ">
                  <label className="payment-cc-label">Address Line 1*</label>
                  <input
                    name="billingStreet"
                    onChange={handleChange}
                    defaultValue={values.billingStreet}
                    onBlur={handleFormValidation}
                    className="payment-cc-input"
                  />
                </div>
                <div className="validation">
                  {errors.billingStreet ? errors.billingStreet : '\u00A0'}
                </div>
                <div className="w-100 pr-1 ">
                  <label className="payment-cc-label">Address Line 2</label>
                  <input
                    name="billingApt"
                    onChange={handleChange}
                    defaultValue={values.billingApt}
                    onBlur={handleFormValidation}
                    className="payment-cc-input"
                  />
                </div>
                <div className="validation">
                  {errors.billingApt ? errors.billingApt : '\u00A0'}
                </div>
                <div className="w-100 flex">
                  <div className="w-70 pr-1 ">
                    <label className="payment-cc-label">City</label>
                    <input
                      name="billingCity"
                      onChange={handleChange}
                      defaultValue={values.billingCity}
                      onBlur={handleFormValidation}
                      className="payment-cc-input"
                    />
                  </div>
                  <div className="w-10 pr-1 ">
                    <label className="payment-cc-label">City</label>
                    <input
                      name="billingState"
                      onChange={handleChange}
                      defaultValue={values.billingState}
                      onBlur={handleFormValidation}
                      className="payment-cc-input"
                    />
                  </div>
                  <div className="w-20 pr-1 ">
                    <label className="payment-cc-label">City</label>
                    <input
                      name="billingZipcode"
                      onChange={handleChange}
                      defaultValue={values.billingZipcode}
                      onBlur={handleFormValidation}
                      className="payment-cc-input"
                    />
                  </div>
                </div>
                <div className="w-100 flex">
                  <div className="w-70 pr-1 validation">
                    {errors.billingCity ? errors.billingCity : '\u00A0'}
                  </div>
                  <div className="w-10 pr-1 validation">
                    {errors.billingState ? errors.billingState : '\u00A0'}
                  </div>
                  <div className="w-20 pr-1 validation">
                    {errors.billingZipcode ? errors.billingZipcode : '\u00A0'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-40 pl-1">
            <div className="payment-summary-card">
              <div className="payment-summary-header">Order Summary</div>
              <div className="flex justify-space-between">
                <div className="left payment-summary-shares">Shares</div>
                <div className="right payment-summary-shares">
                  ${numShares * 100}.00
                </div>
              </div>
              <div className="payment-summary-qty">QTY: {numShares}</div>
              <hr className="payment-summary-hr" />
              <div className="flex justify-space-between">
                <div className="left payment-summary-total">Total</div>
                <div className="right payment-summary-total">
                  ${numShares * 100}.00
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
        </div>
      </div>
    );
  }
}

export default Payment;
