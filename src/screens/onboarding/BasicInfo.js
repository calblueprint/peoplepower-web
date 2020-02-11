import React from 'react';
import Tooltip from './components/Tooltip';
import '../../styles/main.css';
import '../../styles/Onboarding.css';

class BasicInfo extends React.PureComponent {
  // validates then moves on if no error messages

  render() {
    const { owner, errors, onSubmit, handleChange } = this.props;
    return (
      <form className="center card flex onboarding-col">
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
              className={` input-gray ${
                errors.firstName !== '' ? 'b-is-not-valid' : 'b-is-invalid'
              }`}
            />
          </div>
          <div className="w-50">
            <div style={{ marginBottom: '20px' }} />
            <input
              name="lastName"
              placeholder="Last name"
              onChange={handleChange}
              defaultValue={owner.lastName}
              className={` input-gray ${
                errors.lastName !== '' ? 'b-is-not-valid' : 'b-is-invalid'
              }`}
            />
          </div>
        </div>
        <div className="flex onboarding-row">
          <div className="w-50 pr-1 validation">
            {errors.firstName ? errors.firstName : '\u00A0'}
          </div>
          <div className="w-50 validation">
            {errors.lastName ? errors.lastName : '\u00A0'}
          </div>
        </div>
        <div className="w-100">
          <label className="onboarding-label" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            placeholder="Enter your Email address"
            onChange={handleChange}
            defaultValue={owner.email}
            className={`input-gray ${
              errors.email !== '' ? 'b-is-not-valid' : 'b-is-invalid'
            }`}
          />
          <div className=" validation">
            {errors.email ? errors.email : '\u00A0'}
          </div>
        </div>
        <div className="w-100">
          <label className="onboarding-label left pr-half" htmlFor="altEmail">
            Alternative Email
            <Tooltip
              label={
                'We’ll use this email to reach you if we can’t\ncontact you at your primary email.'
              }
            />
          </label>
          <input
            name="alternateEmail"
            placeholder="Enter an Email address"
            onChange={handleChange}
            defaultValue={owner.alternateEmail}
            className={`input-gray ${
              errors.alternateEmail !== '' ? 'b-is-not-valid' : 'b-is-invalid'
            }`}
          />
          <div className=" validation">
            {errors.alternateEmail ? errors.alternateEmail : '\u00A0'}
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
            className={`input-gray ${
              errors.password !== '' ? 'b-is-not-valid' : 'b-is-invalid'
            }`}
          />
          <div className=" validation">
            {errors.password ? errors.password : '\u00A0'}
          </div>
        </div>
        <div className="v-center">
          <button
            type="button"
            className="btn btn--rounded btn--pink btn--size12 getstarted-button"
            onClick={onSubmit}
          >
            Get Started
          </button>
        </div>
      </form>
    );
  }
}

export default BasicInfo;
