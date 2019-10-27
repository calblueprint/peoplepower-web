import React, { Window } from 'react';
import BasicInfo from './BasicInfo';
import ContactInfo from './ContactInfo';
import Bylaws from './Bylaws';
import ProjectGroups from './ProjectGroups';
import Payment from './Payment';
import formValidation from '../../lib/formValidation';

class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      street: '',
      apt: '',
      state: '',
      zipcode: '',
      phoneNumber: '',
      bylaw: false,
      projectGroup: '',
      numShares: '',
      dividends: '',
      beneficiaries: [],
      paymentInfo: '',
      billingAddress: {
        street: '',
        apt: '',
        state: '',
        zipcode: ''
      },
      errors: {
        // object that holds all the error messages
        fname: '',
        lname: '',
        street: '',
        apt: '',
        state: '',
        zipcode: '',
        phoneNumber: '',
        bylaw: '',
        projectGroup: '',
        numShares: '',
        dividends: false,
        beneficiaries: [],
        payment_info: '',
        b_street: '',
        b_apt: '',
        b_state: '',
        b_zipcode: ''
      },
      step: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.callBackBylawValidation = this.callBackBylawValidation.bind(this);
  }

  // next function increments page up one and switches to that numbered page
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  // prev function decrements page down one and switches to that numbered page
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  onSubmit = () => {
    const { fname, lname } = this.state;
    Window.alert(`Your state values: \n 
            first name: ${fname} \n 
            last name: ${lname}`);
  };

  // updates the state whenever there is a change made
  handleChange = event => {
    const { bylaw } = this.state;
    switch (event.target.name) {
      case 'bylaw':
        this.setState({
          bylaw: !bylaw
        });
        break;
      case 'dividends':
        this.setState({
          dividends: event.target.value
        });
        break;
      default:
        this.setState({
          [event.target.name]: event.target.value
        });
    }
  };

  // validates the input divs
  handleFormValidation = event => {
    const { value, name } = event.target;
    const errorMessage = formValidation(name, value);
    const { errors } = this.state;

    this.setState({
      errors: { ...errors, [name]: errorMessage }
    });
  };

  // handle onClick for bylaw
  handleClick() {
    const { bylaw } = this.state;
    this.setState({
      bylaw: !bylaw
    });
  }

  // function for validation of bylaws
  callBackBylawValidation() {
    const { errors } = this.state;
    this.setState({
      errors: { ...errors, bylaw: 'Required' }
    });
  }

  render() {
    const { step } = this.state;
    const {
      fname,
      lname,
      email,
      password,
      street,
      apt,
      state,
      zipcode,
      phoneNumber,
      bylaw,
      projectGroup,
      numShares,
      dividends,
      beneficiaries,
      billingAddress,
      paymentInfo,
      errors,
      touched
    } = this.state;
    const values = {
      fname,
      lname,
      email,
      password,
      street,
      apt,
      state,
      zipcode,
      phoneNumber,
      bylaw,
      projectGroup,
      numShares,
      dividends,
      beneficiaries,
      billingAddress,
      paymentInfo,
      errors,
      touched
    };

    switch (step) {
      case 1:
        return (
          <BasicInfo
            nextStep={this.nextStep}
            values={values}
            handleChange={this.handleChange}
            handleFormValidation={this.handleFormValidation}
          />
        );
      case 2:
        return (
          <ContactInfo
            nextStep={this.nextStep}
            values={values}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleFormValidation={this.handleFormValidation}
          />
        );
      case 3:
        return (
          <Bylaws
            nextStep={this.nextStep}
            values={values}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            callBackBylawValidation={this.callBackBylawValidation}
            handleClick={this.handleClick}
          />
        );
      case 4:
        return (
          <ProjectGroups
            nextStep={this.nextStep}
            values={values}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleFormValidation={this.handleFormValidation}
          />
        );
      case 5:
        return (
          <Payment
            values={values}
            prevStep={this.prevStep}
            onSubmit={this.onSubmit}
            handleChange={this.handleChange}
            handleFormValidation={this.handleFormValidation}
            handleDividends={this.handleDividends}
          />
        );
      default:
        return <div>Page not Found</div>;
    }
  }
}

export default Onboarding;
