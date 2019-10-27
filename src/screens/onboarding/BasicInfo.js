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
    const fields = ['fname', 'lname'];
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
      <form>
        <div>
          <label>
            First Name
            <input
              name="fname"
              placeholder="First Name"
              onChange={handleChange}
              defaultValue={values.fname}
              className={`${
                errors.fname !== '' ? 'b-is-not-valid' : 'b-is-invalid'
              }`}
              onBlur={handleFormValidation}
            />
          </label>
        </div>
        <div>{errors.fname ? errors.fname : '\u00A0'}</div>
        <div>
          <label>
            Last Name
            <input
              name="lname"
              placeholder="Last Name"
              onChange={handleChange}
              defaultValue={values.lname}
              className={`${
                errors.lname !== '' ? 'b-is-not-valid' : 'b-is-invalid'
              }`}
              onBlur={handleFormValidation}
            />
          </label>
        </div>
        <div>{errors.lname ? errors.lname : '\u00A0'}</div>
        <button type="button" onClick={this.nextButton}>
          Next
        </button>
      </form>
    );
  }
}

export default BasicInfo;
