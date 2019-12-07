import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import formValidation from '../../lib/formValidation';
import { updatePerson } from '../../lib/request';
import recordPaymentSuccess from '../../lib/paypal';

import secret from '../../lib/secret';

const { clientId } = secret;

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billingAddressSame: true
    };
  }

  onPaypalPaymentSuccess(details, data) {
    const { latestBill } = this.state;
    recordPaymentSuccess(details, data, latestBill);
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
      recordPaymentSuccess();
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
    handleChange(event);
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
    handleChange(event);
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
      <div className="flex onboarding-row center">
        <div className="w-60">
          <form className="">
            <div className="contact-header">Buy Shares</div>

            <div>
              <label htmlFor="" className="w-100">
                Number of Shares (max 10)
                <button type="button" onClick={this.minusShares}>
                  -
                </button>
                <input
                  name="numShares"
                  className="input-white w-25"
                  placeholder=""
                  onChange={handleChange}
                  defaultValue={values.numShares}
                />
                <button type="button" onClick={this.addShares}>
                  +
                </button>
              </label>
            </div>
            <div>{errors.numShares ? errors.numShares : '\u00A0'}</div>
            <div>
              We aim to provide dividends of around 1.5% per year. Please select
              your preference for dividends:
              <div>
                <label htmlFor="dividends">
                  <input
                    type="radio"
                    name="dividends"
                    className="input-white"
                    value="yes"
                    checked={values.dividends === 'yes'}
                    onChange={handleChange}
                  />
                  Yes, I’d like dividends, thank you!
                </label>
              </div>
              <div>
                <label htmlFor="dividends">
                  <input
                    type="radio"
                    name="dividends"
                    className="input-white"
                    value="no"
                    checked={values.dividends === 'no'}
                    onChange={handleChange}
                  />
                  No dividends please. (No pressure to choose this option. We
                  provide the option because people who waive dividends reduce
                  the cost of capital, which reduces the cost of solar, and that
                  helps our cooperative grow its impact.)
                </label>
              </div>
              <div>Payment Information</div>
              <div className="w-100 pr-1">
                <input
                  name="ccnumber"
                  placeholder="Credit card number"
                  onChange={handleChange}
                  defaultValue={values.ccnumber}
                  className={` input-white ${
                    errors.ccnumber !== '' ? 'b-is-not-valid' : 'b-is-invalid'
                  }`}
                />
              </div>
              <div>{errors.ccnumber ? errors.ccnumber : '\u00A0'}</div>
              <div className="flex row">
                <div className="w-50 pr-1">
                  <input
                    name="expmonth"
                    placeholder="Expiration Month"
                    onChange={handleChange}
                    defaultValue={values.expmonth}
                    className={` input-white ${
                      errors.expmonth !== '' ? 'b-is-not-valid' : 'b-is-invalid'
                    }`}
                    onBlur={handleFormValidation}
                  />
                </div>
                <div className="w-50">
                  <input
                    name="expyear"
                    placeholder="Expiration Year"
                    onChange={handleChange}
                    defaultValue={values.expyear}
                    className={` input-white ${
                      errors.expyear !== '' ? 'b-is-not-valid' : 'b-is-invalid'
                    }`}
                    onBlur={handleFormValidation}
                  />
                </div>
              </div>
              <div className="flex row">
                <div className="w-50 pr-1">
                  <div>{errors.expmonth ? errors.expmonth : '\u00A0'}</div>
                </div>
                <div className="w-50 pr-1">
                  <div>{errors.expyear ? errors.expyear : '\u00A0'}</div>
                </div>
              </div>
              <div className="w-30 pr-1">
                <input
                  name="cvv"
                  placeholder="CVV"
                  onChange={handleChange}
                  defaultValue={values.cvv}
                  className={` input-white ${
                    errors.cvv !== '' ? 'b-is-not-valid' : 'b-is-invalid'
                  }`}
                />
              </div>
              <div className="w-30 pr-1">
                <div>{errors.cvv ? errors.cvv : '\u00A0'}</div>
              </div>
            </div>
            <div>{errors.cvv ? errors.cvv : '\u00A0'}</div>
            <div>
              <label htmlFor="dividends">
                <input
                  type="checkbox"
                  name="billingAddressSame"
                  onClick={this.changeBillingAddress}
                  onChange={handleChange}
                  checked={billingAddressSame}
                />
                My billing address is the same.
              </label>
            </div>
            <div style={{ display: billingAddressSame ? 'none' : 'block' }}>
              <div className="b_flex row">
                <div className="w-80 pr-1">
                  <input
                    name="billingStreet"
                    placeholder="Address"
                    onChange={handleChange}
                    defaultValue={values.billingStreet}
                    className={`input-white ${
                      errors.billingStreet !== ''
                        ? 'b-is-not-valid'
                        : 'b-is-invalid'
                    }`}
                    onBlur={handleFormValidation}
                  />
                </div>
                <div className="w-20 ">
                  <input
                    name="billingApt"
                    placeholder="Apt"
                    onChange={handleChange}
                    defaultValue={values.billingApt}
                    className="input-white"
                  />
                </div>
              </div>
              <div className="flex row">
                <div className="w-80 pr-1 validation">
                  {' '}
                  {errors.billingStreet ? errors.billingStreet : '\u00A0'}
                </div>

                <div className="w-20 validation">
                  {errors.billingApt ? errors.billingApt : '\u00A0'}
                </div>
              </div>
              <div className="flex row">
                <div className="w-60 pr-1">
                  <input
                    name="billingCity"
                    placeholder="City"
                    onChange={handleChange}
                    defaultValue={values.billingCity}
                    className={`input-white ${
                      errors.billingCity !== ''
                        ? 'b-is-not-valid'
                        : 'b-is-invalid'
                    }`}
                    onBlur={handleFormValidation}
                  />
                </div>
                <div className="w-15 pr-1">
                  <input
                    name="billingState"
                    placeholder="State"
                    onChange={handleChange}
                    defaultValue={values.billingState}
                    className={`input-white ${
                      errors.billingState !== ''
                        ? 'b-is-not-valid'
                        : 'b-is-invalid'
                    }`}
                    onBlur={handleFormValidation}
                  />
                </div>
                <div className="w-25">
                  <input
                    name="billingZipcode"
                    placeholder="Zipcode"
                    onChange={handleChange}
                    defaultValue={values.billingZipcode}
                    className={`input-white ${
                      errors.billingZipcode !== ''
                        ? 'b-is-not-valid'
                        : 'b-is-invalid'
                    }`}
                    onBlur={handleFormValidation}
                  />
                </div>
              </div>
            </div>
            <PayPalButton
              amount={numShares * 100}
              onSuccess={this.onPaypalPaymentSuccess}
              options={{
                clientId
              }}
            />
            <div className="flex onboarding-row w-100 right justify-space-between">
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
                  Confirm Payment
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="w-40">
          <div className="info-card ">
            <div>Shares</div>
            <div>${numShares * 100}.00</div>
            <div>Qty:{numShares}</div>
            <br />
            <div>Total</div>
            <div>${numShares * 100}.00</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
