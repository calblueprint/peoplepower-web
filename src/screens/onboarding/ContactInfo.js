import React from 'react';
import formValidation from '../../lib/formValidation';

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  nextButton = e => {
    e.preventDefault();
    const { values, nextStep } = this.props;
    const { errors } = values;
    const fields = ['street', 'apt', 'state', 'zipcode'];
    const errorMessages = [];

    for (let i = 0; i < fields.length; i += 1) {
      const errorMessage = formValidation(fields[i], values[fields[i]]);
      errors[fields[i]] = errorMessage;
      if (errorMessage !== '') {
        errorMessages.push(errorMessage);
      }
    }

    if (!(errorMessages && errorMessages.length > 0)) {
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
    const { errors } = values;
    return (
      <form>
        <div>
          <label>Address</label>
          <input
            name="street"
            placeholder="Address"
            onChange={handleChange}
            defaultValue={values.street}
            className={`${
              errors.street !== '' ? 'b-is-not-valid' : 'b-is-invalid'
            }`}
            onBlur={handleFormValidation}
          />
        </div>
        <div>{errors.street ? errors.street : '\u00A0'}</div>
        <div>
          <label>Apt</label>
          <input
            name="apt"
            placeholder="Apt"
            onChange={handleChange}
            defaultValue={values.apt}
          />
        </div>
        <div>{errors.apt ? errors.apt : '\u00A0'}</div>
        <div>
          <label>State</label>
          <input
            name="state"
            placeholder="State"
            onChange={handleChange}
            defaultValue={values.state}
            className={`${
              errors.state !== '' ? 'b-is-not-valid' : 'b-is-invalid'
            }`}
            onBlur={handleFormValidation}
          />
        </div>
        <div>{errors.state ? errors.state : '\u00A0'}</div>
        <div>
          <label>Zipcode</label>
          <input
            name="zipcode"
            placeholder="Zipcode"
            onChange={handleChange}
            defaultValue={values.zipcode}
            className={`${
              errors.zipcode !== '' ? 'b-is-not-valid' : 'b-is-invalid'
            }`}
            onBlur={handleFormValidation}
          />
        </div>
        <div>{errors.zipcode ? errors.zipcode : '\u00A0'}</div>
        <button type="button" onClick={this.prevButton}>
          Prev
        </button>
        <button type="button" onClick={this.nextButton}>
          Next
        </button>
      </form>
    );
  }
}

export default ContactInfo;
