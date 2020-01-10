import React from 'react';
import formValidation from '../../lib/formValidation';
import { createPersonOwnerUserLoginRecord } from '../../lib/onboardingUtils';
import Tooltip from '../../components/Tooltip';
import { updatePerson } from '../../lib/request';

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assertAddress: false,
      errorAssertAddress: ''
    };
  }

  nextButton = async e => {
    e.preventDefault();
    const { values, nextStep } = this.props;
    const {
      errors,
      userId,
      email,
      password,
      fname,
      lname,
      street,
      apt,
      state,
      city,
      zipcode,
      phoneNumber,
      mailingStreet,
      mailingApt,
      mailingCity,
      mailingState,
      mailingZipcode,
      mailingPhoneNumber
    } = values;
    const { assertAddress } = this.state;
    const inputTypes = [
      'street',
      'apt',
      'city',
      'state',
      'zipcode',
      'phoneNumber',
      'assertAddress',
      'mailingStreet',
      'mailingApt',
      'mailingCity',
      'mailingState',
      'mailingZipcode',
      'mailingPhoneNumber'
    ];
    const errorMessages = [];

    for (let i = 0; i < inputTypes.length; i += 1) {
      if (inputTypes[i] === 'assertAddress') {
        if (!assertAddress) {
          this.setState({ errorAssertAddress: 'Required' });
        } else {
          this.setState({ errorAssertAddress: '' });
        }
      } else {
        const errorMessage = formValidation(
          inputTypes[i],
          values[inputTypes[i]]
        );
        errors[inputTypes[i]] = errorMessage;
        if (errorMessage !== '') {
          errorMessages.push(errorMessage);
        }
      }
    }

    console.log(errorMessages);
    if (!(errorMessages && errorMessages.length > 0)) {
      if (userId) {
        const updatedPerson = {
          Street: street,
          Apt: apt,
          City: city,
          State: state,
          Zipcode: zipcode,
          'Phone Number': phoneNumber,
          'Mailing Street': mailingStreet,
          'Mailing Apt': mailingApt,
          'Mailing City': mailingCity,
          'Mailing State': mailingState,
          'Mailing Zipcode': mailingZipcode,
          'Mailing Phone Number': mailingPhoneNumber,
          'Onboarding Step': 3
        };
        updatePerson(userId, updatedPerson);
        nextStep();
      } else {
        // create the person/owner record in Airtable
        const {
          createdOwnerId,
          createdPersonId
        } = await createPersonOwnerUserLoginRecord(
          email,
          password,
          phoneNumber,
          `${fname} ${lname}`,
          street,
          apt,
          city,
          state,
          zipcode
        );

        if (!createdOwnerId || !createdPersonId) {
          console.error('createPersonOwnerUserLoginRecord FAILED');
        } else {
          const { handleRecordCreation } = this.props;
          handleRecordCreation({
            createdOwnerId,
            createdPersonId
          });
          nextStep();
        }
      }
    } else {
      this.forceUpdate();
    }
  };

  prevButton = e => {
    const { prevStep, values } = this.props;
    const { userId } = values;
    e.preventDefault();
    if (!userId) {
      prevStep();
    }
  };

  changeAssertAddress = () => {
    const { assertAddress } = this.state;
    this.setState({
      assertAddress: !assertAddress
    });
  };

  render() {
    const { values, handleChange, handleFormValidation } = this.props;
    const { errors, mailingAddressSame, userId } = values;
    const { assertAddress, errorAssertAddress } = this.state;
    return (
      <div>
        <form className="template-card">
          <div className="contact-header">Permanent Residence</div>
          <div className="flex row">
            <div className="w-80 pr-1">
              <label className="onboarding-label" htmlFor="password">
                Address *
              </label>
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
              <label className="onboarding-label" htmlFor="password">
                Apt
              </label>
              <input
                name="apt"
                placeholder="Apt"
                onChange={handleChange}
                defaultValue={values.apt}
                className="input-white"
              />
            </div>
          </div>
          <div className="flex onboarding-row">
            <div className="w-80 pr-1 validation">
              {' '}
              {errors.street ? errors.street : '\u00A0'}
            </div>

            <div className="w-20 validation">
              {errors.apt ? errors.apt : '\u00A0'}
            </div>
          </div>
          <div className="flex onboarding-row">
            <div className="w-60 pr-1">
              <label className="onboarding-label" htmlFor="password">
                City *
              </label>
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
              <label className="onboarding-label" htmlFor="password">
                State *
              </label>
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
              <label className="onboarding-label" htmlFor="password">
                Zipcode *
              </label>
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
          <div className="flex onboarding-row">
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
          <div className="flex onboarding-row">
            <div className="w-60 pr-1">
              <label className="onboarding-label" htmlFor="password">
                Phone *
              </label>
              <input
                name="phoneNumber"
                placeholder="Phone"
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
          <div style={{ display: 'inline', position: 'relative' }}>
            <label className="checkbox-container">
              I certify that the address above is my current permanent
              residence.
              <input
                type="checkbox"
                name="assertAddress"
                onClick={this.changeAssertAddress}
                checked={assertAddress}
              />
              <span className="checkmark" />
            </label>
            <div className="w-passwrod validation">
              {errorAssertAddress || '\u00A0'}
            </div>
          </div>
        </form>

        <form className="template-card">
          <div className="contact-header">
            <div className="inline">Mailing Address</div>
            <Tooltip
              label={
                'People Power will only send you physical mail for major\nnotifications in the event we are unable to contact you via email.'
              }
            />
          </div>
          <div style={{ display: 'inline', position: 'relative' }}>
            <label className="checkbox-container">
              My mailing address is the same as my permanent residence address.
              <input
                type="checkbox"
                name="mailingAddressSame"
                onClick={this.changeMailingAddress}
                onChange={handleChange}
                checked={mailingAddressSame}
              />
              <span className="checkmark" />
            </label>
          </div>
          <div style={{ display: mailingAddressSame ? 'none' : 'block' }}>
            <div className="flex onboarding-row">
              <div className="w-80 pr-1">
                <label className="onboarding-label" htmlFor="password">
                  Address *
                </label>
                <input
                  name="mailingStreet"
                  placeholder="Address"
                  onChange={handleChange}
                  defaultValue={values.mailingStreet}
                  className={`input-white ${
                    errors.mailingStreet !== ''
                      ? 'b-is-not-valid'
                      : 'b-is-invalid'
                  }`}
                  onBlur={handleFormValidation}
                />
              </div>
              <div className="w-20 ">
                <label className="onboarding-label" htmlFor="password">
                  Apt
                </label>
                <input
                  name="mailingApt"
                  placeholder="Apt"
                  onChange={handleChange}
                  defaultValue={values.mailingApt}
                  className="input-white"
                />
              </div>
            </div>
            <div className="flex onboarding-row">
              <div className="w-80 pr-1 validation">
                {' '}
                {errors.mailingStreet ? errors.mailingStreet : '\u00A0'}
              </div>

              <div className="w-20 validation">
                {errors.mailingApt ? errors.mailingApt : '\u00A0'}
              </div>
            </div>
            <div className="flex onboarding-row">
              <div className="w-60 pr-1">
                <label className="onboarding-label" htmlFor="password">
                  City *
                </label>
                <input
                  name="mailingCity"
                  placeholder="City"
                  onChange={handleChange}
                  defaultValue={values.mailingCity}
                  className={`input-white ${
                    errors.mailingCity !== ''
                      ? 'b-is-not-valid'
                      : 'b-is-invalid'
                  }`}
                  onBlur={handleFormValidation}
                />
              </div>
              <div className="w-15 pr-1">
                <label className="onboarding-label" htmlFor="password">
                  State *
                </label>
                <input
                  name="mailingState"
                  placeholder="State"
                  onChange={handleChange}
                  defaultValue={values.mailingState}
                  className={`input-white ${
                    errors.mailingState !== ''
                      ? 'b-is-not-valid'
                      : 'b-is-invalid'
                  }`}
                  onBlur={handleFormValidation}
                />
              </div>
              <div className="w-25">
                <label className="onboarding-label" htmlFor="password">
                  Zipcode *
                </label>
                <input
                  name="mailingZipcode"
                  placeholder="Zipcode"
                  onChange={handleChange}
                  defaultValue={values.mailingZipcode}
                  className={`input-white ${
                    errors.mailingZipcode !== ''
                      ? 'b-is-not-valid'
                      : 'b-is-invalid'
                  }`}
                  onBlur={handleFormValidation}
                />
              </div>
            </div>
            <div className="flex onboarding-row">
              <div className="w-60 pr-1 validation">
                {errors.mailingCity ? errors.mailingCity : '\u00A0'}
              </div>
              <div className="w-15 pr-1 validation">
                {errors.mailingState ? errors.mailingState : '\u00A0'}
              </div>

              <div className="w-25 validation">
                {errors.mailingZipcode ? errors.mailingZipcode : '\u00A0'}
              </div>
            </div>
            <div className="flex onboarding-row">
              <div className="w-60 pr-1">
                <label className="onboarding-label" htmlFor="password">
                  Phone *
                </label>
                <input
                  name="mailingPhoneNumber"
                  placeholder="Phone"
                  onChange={handleChange}
                  defaultValue={values.mailingPhoneNumber}
                  className={`input-white ${
                    errors.mailingPhoneNumber !== ''
                      ? 'b-is-not-valid'
                      : 'b-is-invalid'
                  }`}
                  onBlur={handleFormValidation}
                />
              </div>
              <div className="w-15 pr-1" />
              <div className="w-25" />
            </div>
            <div className="w-passwrod validation">
              {errors.mailingPhoneNumber ? errors.mailingPhoneNumber : '\u00A0'}
            </div>
          </div>
        </form>

        <div className="flex steps-buttons  onboarding-row w-100 right mt-2 justify-space-between">
          <div className="left">
            {!userId ? (
              <button
                type="button"
                className="back-button"
                onClick={this.prevButton}
              >
                Go back
              </button>
            ) : null}
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

export default ContactInfo;
