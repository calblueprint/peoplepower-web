import React from 'react';
import formValidation from '../../lib/formValidation';
import '../../styles/Onboarding.css';
import tooltip from '../../components/tooltip';
import { updatePerson, updateRecord } from '../../lib/request';

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // validates then moves on if no error messages
  nextButton = e => {
    e.preventDefault();
    const { values, nextStep } = this.props;
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
    const fields = ['fname', 'lname', 'email', 'password', 'altEmail'];
    const errorsMessages = [];

    for (let i = 0; i < fields.length; i += 1) {
      const errorMessage = formValidation(fields[i], values[fields[i]]);
      errors[fields[i]] = errorMessage;
      if (errorMessage !== '') {
        errorsMessages.push(errorMessage);
      }
    }

    if (!(errorsMessages && errorsMessages.length > 0)) {
      if (userId) {
        const updatedPerson = {
          id: userId,
          fields: {
            Name: `${fname} + " " + ${lname}`,
            Email: email,
            'Alternative Email': altEmail
          }
        };

        const newLogin = {
          id: userLoginId,
          fields: {
            Email: email,
            password
          }
        };

        updatePerson(updatedPerson).then(() => {
          return updateRecord('User Login', newLogin);
        });
      }
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
            {tooltip(
              'We’ll use this email to reach you if we can’t\ncontact you at your primary email.'
            )}
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
            className="getstarted-button"
            onClick={this.nextButton}
          >
            Get started
          </button>
        </div>
      </form>
    );
  }
}

export default BasicInfo;
