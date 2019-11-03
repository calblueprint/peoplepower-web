import React from 'react';
import formValidation from '../../lib/formValidation';

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // validates then moves on if no error messages
  nextButton = e => {
    e.preventDefault();
    const { values, nextStep } = this.props;
    const { errors } = values;
    const fields = ['fname', 'lname', 'email', 'password'];
    const errorsMessages = [];

    for (let i = 0; i < fields.length; i += 1) {
      const errorMessage = formValidation(fields[i], values[fields[i]]);
      errors[fields[i]] = errorMessage;
      if (errorMessage !== '') {
        errorsMessages.push(errorMessage);
      }
    }

    if (!(errorsMessages && errorsMessages.length > 0)) {
      nextStep();
    } else {
      this.forceUpdate();
    }
  };

  render() {
    const { values, handleChange, handleFormValidation } = this.props;
    const { errors } = values;
    return (
      <form className="center card flex column">
        <div className="header">Tell us about yourself!</div>
        <div className="flex row">
          <div className="w-50 pr-1">
            <input
              name="fname"
              placeholder="First Name"
              onChange={handleChange}
              defaultValue={values.fname}
              className={` input-gray ${
                errors.fname !== '' ? 'b-is-not-valid' : 'b-is-invalid'
              }`}
              onBlur={handleFormValidation}
            />
          </div>
          <div className="w-50">
            <input
              name="lname"
              placeholder="Last Name"
              onChange={handleChange}
              defaultValue={values.lname}
              className={` input-gray ${
                errors.lname !== '' ? 'b-is-not-valid' : 'b-is-invalid'
              }`}
              onBlur={handleFormValidation}
            />
          </div>
        </div>
        <div className="flex row">
          <div className="w-50 pr-1 validation">
            {errors.fname ? errors.fname : '\u00A0'}
          </div>
          <div className="w-50 validation">
            {errors.lname ? errors.lname : '\u00A0'}
          </div>
        </div>
        <div className="w-100">
          <input
            name="email"
            placeholder="Email address"
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
          <input
            name="password"
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
          <button type="button" onClick={this.nextButton}>
            Get started
          </button>
        </div>
      </form>
    );
  }
}

export default BasicInfo;
