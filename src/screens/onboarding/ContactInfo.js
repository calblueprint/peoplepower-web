import React from 'react';
import Tooltip from './components/Tooltip';
import '../../styles/main.css';

class ContactInfo extends React.PureComponent {
  render() {
    const { owner, errors, onSubmit, onBack, handleChange } = this.props;
    return (
      <div>
        <form className="template-card">
          <div className="contact-header">Permanent Residence</div>
          <div className="flex row">
            <div className="w-80 pr-1">
              <label className="onboarding-label" htmlFor="password">
                Street 1 *
              </label>
              <input
                name="permanentStreet1"
                placeholder="Street 2"
                onChange={handleChange}
                defaultValue={owner.permanentStreet1}
                className={`input-white ${
                  errors.permanentStreet1 !== ''
                    ? 'b-is-not-valid'
                    : 'b-is-invalid'
                }`}
              />
            </div>
            <div className="w-20 ">
              <label className="onboarding-label" htmlFor="password">
                Street 2
              </label>
              <input
                name="permanentStreet2"
                placeholder="Street 2"
                onChange={handleChange}
                defaultValue={owner.permanentStreet2}
                className="input-white"
              />
            </div>
          </div>
          <div className="flex onboarding-row">
            <div className="w-80 pr-1 validation">
              {' '}
              {errors.permanentStreet1 ? errors.permanentStreet1 : '\u00A0'}
            </div>

            <div className="w-20 validation">
              {errors.permanentStreet2 ? errors.permanentStreet2 : '\u00A0'}
            </div>
          </div>
          <div className="flex onboarding-row">
            <div className="w-60 pr-1">
              <label className="onboarding-label" htmlFor="password">
                City *
              </label>
              <input
                name="permanentCity"
                placeholder="City"
                onChange={handleChange}
                defaultValue={owner.city}
                className={`input-white ${
                  errors.permanentCity !== ''
                    ? 'b-is-not-valid'
                    : 'b-is-invalid'
                }`}
              />
            </div>
            <div className="w-15 pr-1">
              <label className="onboarding-label" htmlFor="password">
                State *
              </label>
              <input
                name="permanentState"
                placeholder="State"
                onChange={handleChange}
                defaultValue={owner.permanentState}
                className={`input-white ${
                  errors.permanentState !== ''
                    ? 'b-is-not-valid'
                    : 'b-is-invalid'
                }`}
              />
            </div>
            <div className="w-25">
              <label className="onboarding-label" htmlFor="password">
                Zipcode *
              </label>
              <input
                name="permanentZipcode"
                placeholder="Zipcode"
                onChange={handleChange}
                defaultValue={owner.permanentZipcode}
                className={`input-white ${
                  errors.permanentZipcode !== ''
                    ? 'b-is-not-valid'
                    : 'b-is-invalid'
                }`}
              />
            </div>
          </div>
          <div className="flex onboarding-row">
            <div className="w-60 pr-1 validation">
              {errors.permanentCity ? errors.permanentCity : '\u00A0'}
            </div>
            <div className="w-15 pr-1 validation">
              {errors.permanentState ? errors.permanentState : '\u00A0'}
            </div>

            <div className="w-25 validation">
              {errors.permanentZipcode ? errors.permanentZipcode : '\u00A0'}
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
                defaultValue={owner.phoneNumber}
                className={`input-white ${
                  errors.phoneNumber !== '' ? 'b-is-not-valid' : 'b-is-invalid'
                }`}
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
                name="mailingAddressSame"
                onChange={handleChange}
                checked={owner.certifyPermanentAddress}
              />
              <span className="checkmark" />
            </label>
            <div className="w-passwrod validation">
              {errors.certifyPermanentAddress || '\u00A0'}
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
                onChange={handleChange}
                checked={owner.mailingAddressSame}
              />
              <span className="checkmark" />
            </label>
          </div>
          <div style={{ display: owner.mailingAddressSame ? 'none' : 'block' }}>
            <div className="flex onboarding-row">
              <div className="w-80 pr-1">
                <label className="onboarding-label" htmlFor="password">
                  Street 1 *
                </label>
                <input
                  name="mailingStreet1"
                  placeholder="Address"
                  onChange={handleChange}
                  defaultValue={owner.mailingStreet1}
                  className={`input-white ${
                    errors.mailingStreet1 !== ''
                      ? 'b-is-not-valid'
                      : 'b-is-invalid'
                  }`}
                />
              </div>
              <div className="w-20 ">
                <label className="onboarding-label" htmlFor="password">
                  Street 2
                </label>
                <input
                  name="mailingStreet2"
                  placeholder="Street 2"
                  onChange={handleChange}
                  defaultValue={owner.mailingStreet2}
                  className="input-white"
                />
              </div>
            </div>
            <div className="flex onboarding-row">
              <div className="w-80 pr-1 validation">
                {' '}
                {errors.mailingStreet1 ? errors.mailingStreet1 : '\u00A0'}
              </div>

              <div className="w-20 validation">
                {errors.mailingStreet2 ? errors.mailingStreet2 : '\u00A0'}
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
                  defaultValue={owner.mailingCity}
                  className={`input-white ${
                    errors.mailingCity !== ''
                      ? 'b-is-not-valid'
                      : 'b-is-invalid'
                  }`}
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
                  defaultValue={owner.mailingState}
                  className={`input-white ${
                    errors.mailingState !== ''
                      ? 'b-is-not-valid'
                      : 'b-is-invalid'
                  }`}
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
                  defaultValue={owner.mailingZipcode}
                  className={`input-white ${
                    errors.mailingZipcode !== ''
                      ? 'b-is-not-valid'
                      : 'b-is-invalid'
                  }`}
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
          </div>
        </form>

        <div className="flex steps-buttons  onboarding-row w-100 right mt-2 justify-space-between">
          <div className="left">
            <button type="button" className="back-button" onClick={onBack}>
              Go back
            </button>
          </div>

          <div className="right">
            <button
              type="button"
              className="btn btn--rounded btn--blue btn--size16 continue-button"
              onClick={onSubmit}
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
