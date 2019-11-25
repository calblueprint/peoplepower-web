import React from 'react';
import formValidation from '../../lib/formValidation';
import Dropdown from '../../components/Dropdown';
import States from '../../lib/states';

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  nextButton = e => {
    e.preventDefault();
    const { values, nextStep } = this.props;
    const { errors } = values;
    const fields = ['street', 'apt', 'city', 'state', 'zipcode', 'phoneNumber'];
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
    const states = Object.keys(States);
    return (
      <form className="center">
        <div className="contact-header">Contact Information</div>
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
            <Dropdown
              titleHelper="State"
              title="State"
              list={states}
              toggleItem={values.state}
              handleChange={handleChange}
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
        <div className="flex row">
          <div className="w-60 pr-1 validation">
            {errors.city ? errors.city : '\u00A0'}
          </div>
          <div className="w-15 pr-1 validation">
            {errors.state ? errors.state : '\u00A0'}
          </div>

          <div className="w-25 validation">
            {errors.zipcode ? errors.zipcode : '\u00A0'}
          </div>
        </div>
        <div className="flex row">
          <div className="w-60 pr-1">
            <input
              name="phoneNumber"
              placeholder="Phone Number"
              onChange={handleChange}
              defaultValue={values.phoneNumber}
              className={`input-white ${
                errors.phoneNumber !== '' ? 'b-is-not-valid' : 'b-is-invalid'
              }`}
              onBlur={handleFormValidation}
            />
          </div>
          <div className="w-15 pr-1" />
          <div className="w-25" />
        </div>
        <div className="w-passwrod validation">
          {errors.phoneNumber ? errors.phoneNumber : '\u00A0'}
        </div>
        <div className="flex row w-100 right">
          <div className="left">
            <button type="button" onClick={this.prevButton}>
              Back
            </button>
          </div>
          <div className="right">
            <button type="button" onClick={this.nextButton}>
              Continue
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default ContactInfo;
