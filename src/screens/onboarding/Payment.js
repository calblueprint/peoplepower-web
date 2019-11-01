import React from 'react';
import formValidation from '../../lib/formValidation';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  finishButton = e => {
    const { values, onSubmit } = this.props;
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
      onSubmit();
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
    const { values, handleChange } = this.props;
    const { errors } = values;
    return (
      <div>
        <form>
          <div>
            <label htmlFor="numShares">
              Number of Shares
              <input
                name="numShares"
                placeholder=""
                onChange={handleChange}
                defaultValue={values.numShares}
              />
            </label>
          </div>
          <div>{errors.numShares ? errors.numShares : '\u00A0'}</div>
          <div>
            Dividends
            <div>
              <label htmlFor="dividends">
                <input
                  type="radio"
                  name="dividends"
                  value="yes"
                  checked={values.dividends === 'yes'}
                  onChange={handleChange}
                />
                yes
              </label>
            </div>
            <div>
              <label htmlFor="dividends">
                <input
                  type="radio"
                  name="dividends"
                  value="no"
                  checked={values.dividends === 'no'}
                  onChange={handleChange}
                />
                no
              </label>
            </div>
          </div>
          <div>{errors.dividends ? errors.dividends : '\u00A0'}</div>
          <div label="Payment Information">Blah</div>
        </form>
        <button onClick={this.prevButton} type="button">
          Prev
        </button>
        <button onClick={this.finishButton} type="button">
          Finish
        </button>
      </div>
    );
  }
}

export default Payment;
