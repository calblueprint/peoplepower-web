import React from 'react';
import BasicInfo from './BasicInfo';
import ContactInfo from './ContactInfo';
import Bylaws from './Bylaws';
import ProjectGroups from './ProjectGroups';
import Payment from './Payment';
import formValidation from '../../lib/formValidation';
import { createPerson } from '../../lib/request';
import Confirmation from './Confirmation';

class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      street: '',
      city: '',
      apt: '',
      state: '',
      zipcode: '',
      phoneNumber: '',
      bylaw1: false,
      bylaw2: false,
      projectGroup: {},
      numShares: '',
      dividends: '',
      beneficiaries: [],
      billingAddressSame: false,
      ccnumber: '',
      expmonth: '',
      expyear: '',
      cvv: '',
      ccstreet: '',
      ccapt: '',
      ccstate: '',
      cczipcode: '',
      errors: {
        // object that holds all the error messages
        fname: '',
        lname: '',
        email: '',
        password: '',
        street: '',
        apt: '',
        city: '',
        state: '',
        zipcode: '',
        phoneNumber: '',
        bylaw1: '',
        bylaw2: '',
        projectGroup: '',
        numShares: '',
        dividends: false,
        beneficiaries: [],
        ccnumber: '',
        expmonth: '',
        expyear: '',
        cvv: '',
        ccstreet: '',
        ccapt: '',
        ccstate: '',
        cczipcode: ''
      },
      step: 4
    };
    this.handleChange = this.handleChange.bind(this);
    this.callBackBylawValidation = this.callBackBylawValidation.bind(this);
  }

  onSubmit = () => {
    // try {
    const {
      email,
      phoneNumber,
      fname,
      lname,
      street,
      apt,
      city,
      state,
      zipcode
    } = this.state;
    createPerson({
      fields: {
        Email: email,
        'Phone Number': phoneNumber,
        // "Owner": [owner],
        'Street 1': street,
        City: city,
        'Street 2': apt,
        State: state,
        Zipcode: zipcode,
        // "Tags": tags,
        // "User Login": [userLogin],
        Name: `${fname} ${lname}`
      }
    });
    // } catch (err) {
    //   console.log(err);
    // }
  };

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

  // updates the state whenever there is a change made
  handleChange = event => {
    const {
      bylaw1,
      bylaw2,
      street,
      apt,
      city,
      state,
      zipcode,
      billingAddressSame
    } = this.state;
    switch (event.target.name) {
      case 'bylaw1':
        this.setState({
          bylaw1: !bylaw1
        });
        break;
      case 'bylaw2':
        this.setState({
          bylaw2: !bylaw2
        });
        break;
      case 'billingAddressSame':
        if (!billingAddressSame) {
          this.setState({
            ccstreet: street,
            ccapt: apt,
            cccity: city,
            ccstate: state,
            cczipcode: zipcode
          });
        }
        this.setState({
          billingAddressSame: !billingAddressSame
        });
        break;
      case 'dividends':
        this.setState({
          dividends: event.target.value
        });
        break;
      case 'projectGroup':
        this.setState({
          projectGroup: event.target.value
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

  // function for validation of bylaws
  callBackBylawValidation() {
    const { errors } = this.state;
    this.setState({
      errors: { ...errors, bylaw1: 'Required' }
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
      city,
      state,
      zipcode,
      phoneNumber,
      bylaw1,
      bylaw2,
      projectGroup,
      numShares,
      dividends,
      beneficiaries,
      billingAddressSame,
      ccnumber,
      expmonth,
      expyear,
      cvv,
      ccstreet,
      ccapt,
      cccity,
      ccstate,
      cczipcode,
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
      city,
      state,
      zipcode,
      phoneNumber,
      bylaw1,
      bylaw2,
      projectGroup,
      numShares,
      dividends,
      beneficiaries,
      billingAddressSame,
      ccnumber,
      expmonth,
      expyear,
      cvv,
      ccstreet,
      ccapt,
      cccity,
      ccstate,
      cczipcode,
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
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleFormValidation={this.handleFormValidation}
            handleDividends={this.handleDividends}
          />
        );
      case 6:
        return (
          <Confirmation
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
