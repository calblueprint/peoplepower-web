import React from 'react';
import Tooltip from '../components/Tooltip';
import '../../../styles/main.css';
import '../../../styles/Onboarding.css';

class BasicInfoStep extends React.PureComponent {
  // validates then moves on if no error messages

  render() {
    const {
      owner,
      errors,
      onSubmit,
      handleChange,
      toggleValidColor
    } = this.props;
    return (
      <form className="card flex onboarding-col onboarding-first-step-margin">
        <div className=" ">
          <div className="header ">
            Be a part of the movement for equity and clean energy.
          </div>
        </div>
        <div className="flex onboarding-row">
          <div className="w-50 pr-1">
            <label className="onboarding-label" htmlFor="name">
              Your Name
            </label>
            <input
              name="firstName"
              placeholder="First name"
              onChange={handleChange}
              defaultValue={owner.firstName}
              className={` input-gray ${toggleValidColor(errors.firstName, 0)}`}
            />
          </div>
          <div className="w-50">
            <div className="mb-22px" />
            <input
              name="lastName"
              placeholder="Last name"
              onChange={handleChange}
              defaultValue={owner.lastName}
              className={` input-gray ${toggleValidColor(errors.lastName, 0)}`}
            />
          </div>
        </div>
        <div className="flex onboarding-row">
          <div className="w-50 pr-1 validation">
            {toggleValidColor(errors.firstName, 1)}
          </div>
          <div className="w-50 validation">
            {toggleValidColor(errors.lastName, 1)}
          </div>
        </div>
        <div className="w-100">
          <label className="onboarding-label" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            placeholder="Enter your primary email address"
            onChange={handleChange}
            defaultValue={owner.email}
            className={`input-gray ${toggleValidColor(errors.email, 0)}`}
          />
          <div className=" validation">{toggleValidColor(errors.email, 1)}</div>
        </div>
        <div className="w-100">
          <label className="onboarding-label left pr-half" htmlFor="altEmail">
            Alternate Email
            <Tooltip
              label={
                'We’ll use this email to reach you if we can’t\ncontact you at your primary email.'
              }
            />
          </label>
          <input
            name="alternateEmail"
            placeholder="Enter an alternate email address"
            onChange={handleChange}
            defaultValue={owner.alternateEmail}
            className={`input-gray ${toggleValidColor(
              errors.alternateEmail,
              0
            )}`}
          />
          <div className=" validation">
            {toggleValidColor(errors.alternateEmail, 1)}
          </div>
        </div>
        <div className="w-100">
          <label className="onboarding-label" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            onChange={handleChange}
            defaultValue={owner.password}
            className={`input-gray ${toggleValidColor(errors.password, 0)}`}
          />
          <div className=" validation">
            {toggleValidColor(errors.password, 1)}
          </div>
        </div>
        <div className="v-center">
          <button
            type="button"
            className="btn btn--rounded btn--pink btn--size12 get-started-button"
            onClick={onSubmit}
          >
            Get Started
          </button>
        </div>
      </form>
    );
  }
}

export default BasicInfoStep;
