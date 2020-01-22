import React from 'react';
import formValidation from '../../lib/onboarding/formValidation';
import Tooltip from '../../components/Tooltip';
import { updatePerson, updateUserLogin } from '../../lib/airtable/request';
import '../../styles/main.css';
import '../../styles/Onboarding.css';

class BasicInfo extends React.Component {
  // validates then moves on if no error messages
  nextButton = async e => {
    e.preventDefault();
    const { values, nextStep, toggleNavbar } = this.props;
    const {
      errors,
      userId,
      userLoginId,
      fname,
      lname,
      email,
      password,
      altEmail
    } = values;
    const inputTypes = ['fname', 'lname', 'email', 'password', 'altEmail'];
    const errorsMessages = [];

    for (let i = 0; i < inputTypes.length; i += 1) {
      const errorMessage = formValidation(inputTypes[i], values[inputTypes[i]]);
      errors[inputTypes[i]] = errorMessage;
      if (errorMessage !== '') {
        errorsMessages.push(errorMessage);
      }
    }

    if (!(errorsMessages && errorsMessages.length > 0)) {
      if (userId) {
        const name = `${fname} ${lname}`;
        const updatedPerson = {
          name,
          email,
          alternativeEmail: altEmail
        };

        const newLogin = {
          email,
          password
        };

        await updatePerson(userId, updatedPerson);
        await updateUserLogin(userLoginId, newLogin);
      }

      toggleNavbar();
      nextStep();
    } else {
      this.forceUpdate();
    }
  };

  render() {
    const { values, handleChange, handleFormValidation } = this.props;
    const { errors } = values;
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
              name="fname"
              placeholder="First name"
              onChange={handleChange}
              defaultValue={values.fname}
              className={` input-gray ${
                errors.fname !== '' ? 'b-is-not-valid' : 'b-is-invalid'
              }`}
              onBlur={handleFormValidation}
            />
          </div>
          <div className="w-50">
            <div style={{ marginBottom: '20px' }} />
            <input
              name="lname"
              placeholder="Last name"
              onChange={handleChange}
              defaultValue={values.lname}
              className={` input-gray ${
                errors.lname !== '' ? 'b-is-not-valid' : 'b-is-invalid'
              }`}
              onBlur={handleFormValidation}
            />
          </div>
        </div>
        <div className="flex onboarding-row">
          <div className="w-50 pr-1 validation">
            {errors.fname ? errors.fname : '\u00A0'}
          </div>
          <div className="w-50 validation">
            {errors.lname ? errors.lname : '\u00A0'}
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
            defaultValue={values.email}
            className={`input-gray ${
              errors.email !== '' ? 'b-is-not-valid' : 'b-is-invalid'
            }`}
            onBlur={handleFormValidation}
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
            name="altEmail"
            placeholder="Enter your Email address"
            onChange={handleChange}
            defaultValue={values.altEmail}
            className={`input-gray ${
              errors.altEmail !== '' ? 'b-is-not-valid' : 'b-is-invalid'
            }`}
            onBlur={handleFormValidation}
          />
          <div className=" validation">
            {errors.altEmail ? errors.altEmail : '\u00A0'}
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
            defaultValue={values.password}
            className={`input-gray ${
              errors.password !== '' ? 'b-is-not-valid' : 'b-is-invalid'
            }`}
            onBlur={handleFormValidation}
          />
          <div className=" validation">
            {errors.password ? errors.password : '\u00A0'}
          </div>
        </div>
        <div className="v-center">
          <button
            type="button"
            className="pink-rounded-button getstarted-button"
            onClick={this.nextButton}
          >
            Get Started
          </button>
        </div>
      </form>
    );
  }
}

export default BasicInfo;
