import React from 'react';
import Tooltip from '../components/Tooltip';
import '../../../styles/main.css';
import PPModal from '../../../components/PPModal';
import { returnToHomepage } from '../../../lib/onboardingUtils';

class ContactInfoStep extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { errors } = this.props;
    if (errors.permanentState === 'Not California') {
      this.setState({ showModal: true });
    }
  }

  handleCloseModal() {
    this.setState({ showModal: false });
    window.location.reload();
  }

  render() {
    const { showModal } = this.state;
    const {
      owner,
      errors,
      onSubmit,
      handleChange,
      toggleValidColor
    } = this.props;
    return (
      <div>
        <form className="template-card">
          <div className="contact-header">Permanent Residence</div>
          <div className="flex row">
            <div className="w-80 pr-1">
              <label className="onboarding-label" htmlFor="password">
                Address <span className="asterisk">*</span>
              </label>
              <input
                name="permanentStreet1"
                placeholder="Street 1"
                onChange={handleChange}
                defaultValue={owner.permanentStreet1}
                className={`input-white ${toggleValidColor(
                  errors.permanentStreet1,
                  0
                )}`}
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
              {toggleValidColor(errors.permanentStreet1, 1)}
            </div>

            <div className="w-20 validation">
              {toggleValidColor(errors.permanentStreet2, 1)}
            </div>
          </div>
          <div className="flex onboarding-row">
            <div className="w-60 pr-1">
              <label className="onboarding-label" htmlFor="password">
                City <span className="asterisk">*</span>
              </label>
              <input
                name="permanentCity"
                placeholder="City"
                onChange={handleChange}
                defaultValue={owner.permanentCity}
                className={`input-white ${toggleValidColor(
                  errors.permanentCity,
                  0
                )}`}
              />
            </div>
            <div className="w-15 pr-1">
              <label className="onboarding-label" htmlFor="password">
                State <span className="asterisk">*</span>
              </label>
              <input
                name="permanentState"
                placeholder="State"
                onChange={handleChange}
                defaultValue={owner.permanentState}
                className={`input-white ${toggleValidColor(
                  errors.permanentState,
                  0
                )}`}
              />
            </div>
            <div className="w-25">
              <label className="onboarding-label" htmlFor="password">
                Zipcode <span className="asterisk">*</span>
              </label>
              <input
                name="permanentZipcode"
                placeholder="Zipcode"
                onChange={handleChange}
                defaultValue={owner.permanentZipcode}
                className={`input-white ${toggleValidColor(
                  errors.permanentZipcode,
                  0
                )}`}
              />
            </div>
          </div>
          <div className="flex onboarding-row">
            <div className="w-60 pr-1 validation">
              {toggleValidColor(errors.permanentCity, 1)}
            </div>
            <div className="w-15 pr-1 validation">
              {/* eslint-disable-next-line no-nested-ternary */}
              {errors.permanentState === 'Not California' ? (
                <PPModal
                  showModal={showModal}
                  body="People Power Solar Cooperative membership is currently only available for residents of California."
                  header="Are you a resident of California?"
                  actionName="Edit my location"
                  returnHome={returnToHomepage}
                  handleCloseModal={this.handleCloseModal}
                />
              ) : errors.permanentState === '' ? (
                '\u00A0'
              ) : (
                toggleValidColor(errors.permanentState, 1)
              )}
            </div>

            <div className="w-25 validation">
              {toggleValidColor(errors.permanentZipcode, 1)}
            </div>
          </div>
          <div className="flex onboarding-row">
            <div className="w-60 pr-1">
              <label className="onboarding-label" htmlFor="password">
                Phone <span className="asterisk">*</span>
              </label>
              <input
                name="phoneNumber"
                placeholder="Phone"
                onChange={handleChange}
                defaultValue={owner.phoneNumber}
                className={`input-white ${toggleValidColor(
                  errors.phoneNumber,
                  0
                )}`}
              />
            </div>
            <div className="w-15 pr-1" />
            <div className="w-25" />
          </div>
          <div className="w-passwrod validation">
            {toggleValidColor(errors.phoneNumber, 1)}
          </div>
          <div style={{ display: 'inline', position: 'relative' }}>
            <label className="checkbox-container">
              I certify that the address above is my current permanent
              residence.
              <input
                type="checkbox"
                name="certifyPermanentAddress"
                onClick={handleChange}
                defaultChecked={owner.certifyPermanentAddress}
              />
              <span className="checkmark" />
            </label>
            <div className="w-passwrod validation">
              {toggleValidColor(errors.certifyPermanentAddress, 1)}
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
                onClick={handleChange}
                defaultChecked={owner.mailingAddressSame}
                onChange={handleChange}
              />
              <span className="checkmark" />
            </label>
          </div>
          <div style={{ display: owner.mailingAddressSame ? 'none' : 'block' }}>
            <div className="flex onboarding-row">
              <div className="w-80 c">
                <label className="onboarding-label">
                  Street 1 <span className="asterisk">*</span>
                </label>
                <input
                  name="mailingStreet1"
                  placeholder="Address"
                  onChange={handleChange}
                  defaultValue={owner.mailingStreet1}
                  className={`input-white ${toggleValidColor(
                    errors.mailingStreet1,
                    0
                  )}`}
                />
              </div>
              <div className="w-20 ">
                <label className="onboarding-label">Street 2</label>
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
                {toggleValidColor(errors.mailingStreet1, 1)}
              </div>

              <div className="w-20 validation">
                {toggleValidColor(errors.mailingStreet2, 1)}
              </div>
            </div>
            <div className="flex onboarding-row">
              <div className="w-60 pr-1">
                <label className="onboarding-label" htmlFor="password">
                  City <span className="asterisk">*</span>
                </label>
                <input
                  name="mailingCity"
                  placeholder="City"
                  onChange={handleChange}
                  defaultValue={owner.mailingCity}
                  className={`input-white ${toggleValidColor(
                    errors.mailingCity,
                    0
                  )}`}
                />
              </div>
              <div className="w-15 pr-1">
                <label className="onboarding-label" htmlFor="password">
                  State <span className="asterisk">*</span>
                </label>
                <input
                  name="mailingState"
                  placeholder="State"
                  onChange={handleChange}
                  defaultValue={owner.mailingState}
                  className={`input-white ${toggleValidColor(
                    errors.mailingState,
                    0
                  )}`}
                />
              </div>
              <div className="w-25">
                <label className="onboarding-label" htmlFor="password">
                  Zipcode <span className="asterisk">*</span>
                </label>
                <input
                  name="mailingZipcode"
                  placeholder="Zipcode"
                  onChange={handleChange}
                  defaultValue={owner.mailingZipcode}
                  className={`input-white ${toggleValidColor(
                    errors.mailingZipcode,
                    0
                  )}`}
                />
              </div>
            </div>
            <div className="flex onboarding-row">
              <div className="w-60 pr-1 validation">
                {toggleValidColor(errors.mailingCity, 1)}
              </div>
              <div className="w-15 pr-1 validation">
                {toggleValidColor(errors.mailingState, 1)}
              </div>

              <div className="w-25 validation">
                {toggleValidColor(errors.mailingZipcode, 1)}
              </div>
            </div>
          </div>
        </form>

        <div className="flex steps-buttons  onboarding-row w-100 right mt-2 justify-space-between">
          <div className="left">
            {/* <button type="button" className="back-button" onClick={onBack}>
              Go back
            </button> */}
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

export default ContactInfoStep;
