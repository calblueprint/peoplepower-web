import React from 'react';
import formValidation from '../../lib/formValidation';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  nextButton = e => {
    const { values, nextStep } = this.props;
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

    if (!(errorsMessages && errorsMessages.length > 0)) {
      nextStep();
    } else {
      this.forceUpdate();
    }
  };

  prevButton = e => {
    const { prevStep } = this.props;
    e.preventDefault();
    prevStep();
  };

  render() {
    const { values, handleChange, handleFormValidation } = this.props;
    const { errors, numShares } = values;
    return (
      <div className="flex row center">
        <div className="w-60">
          <form className="">
            <div className="contact-header">Buy Shares</div>
            <div>
              <label htmlFor="" className="w-100">
                Number of Shares (max 10)
                <input
                  name="numShares"
                  className="input-white w-15"
                  placeholder=""
                  onChange={handleChange}
                  defaultValue={values.numShares}
                />
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
                  type="radio"
                  name="dividends"
                  className="input-white"
                  value="yes"
                  checked={values.dividends === 'yes'}
                  onChange={handleChange}
                />
                My billing address is the same.
              </label>
            </div>
            <div className="flex row">
              <div className="w-80 pr-1">
                <input
                  name="street"
                  placeholder="Address"
                  onChange={handleChange}
                  defaultValue={values.street}
                  className={`input-white ${
                    errors.street !== '' ? 'b-is-not-valid' : 'b-is-invalid'
                  }`}
                  onBlur={handleFormValidation}
                />
              </div>
              <div className="w-20 ">
                <input
                  name="apt"
                  placeholder="Apt"
                  onChange={handleChange}
                  defaultValue={values.apt}
                  className="input-white"
                />
              </div>
            </div>
            <div className="flex row">
              <div className="w-80 pr-1 validation">
                {' '}
                {errors.street ? errors.street : '\u00A0'}
              </div>

              <div className="w-20 validation">
                {errors.apt ? errors.apt : '\u00A0'}
              </div>
            </div>
            <div className="flex row">
              <div className="w-60 pr-1">
                <input
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  defaultValue={values.city}
                  className={`input-white ${
                    errors.city !== '' ? 'b-is-not-valid' : 'b-is-invalid'
                  }`}
                  onBlur={handleFormValidation}
                />
              </div>
              <div className="w-15 pr-1">
                <input
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                  defaultValue={values.state}
                  className={`input-white ${
                    errors.state !== '' ? 'b-is-not-valid' : 'b-is-invalid'
                  }`}
                  onBlur={handleFormValidation}
                />
              </div>
              <div className="w-25">
                <input
                  name="zipcode"
                  placeholder="Zipcode"
                  onChange={handleChange}
                  defaultValue={values.zipcode}
                  className={`input-white ${
                    errors.zipcode !== '' ? 'b-is-not-valid' : 'b-is-invalid'
                  }`}
                  onBlur={handleFormValidation}
                />
              </div>
            </div>
            <button onClick={this.prevButton} type="button">
              Prev
            </button>
            <button onClick={this.nextButton} type="button">
              Finish
            </button>
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
