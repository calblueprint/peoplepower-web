import React from 'react';
import BasicInfo from './BasicInfo';
import ContactInfo from './ContactInfo';
import Bylaws from './Bylaws';
import ProjectGroups from './ProjectGroups';
import Payment from './Payment';
import Complete from './Complete';
import formValidation from '../../lib/formValidation';
import { getLoggedInUserId } from '../../lib/auth';
import { createPersonOwnerUserLoginRecord } from '../../lib/onboardingUtils';
import Template from './Template';
import { getRecord } from '../../lib/request';

class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userLoginId: '',
      personId: '',
      fname: '',
      lname: '',
      email: '',
      altEmail: '',
      password: '',
      street: '',
      city: '',
      apt: '',
      state: '',
      zipcode: '',
      phoneNumber: '',
      mailingAddressSame: false,
      mailingStreet: '',
      mailingCity: '',
      mailingApt: '',
      mailingState: '',
      mailingZipcode: '',
      mailingPhoneNumber: '',
      bylaw1: false,
      bylaw2: false,
      projectGroup: '',
      noProjectGroup: false,
      numShares: 1, // TODO(dfangshuo): 0 causes a bug
      dividends: '',
      beneficiaries: [],
      billingAddressSame: false,
      ccnumber: '',
      expmonth: '',
      expyear: '',
      cvv: '',
      billingStreet: '',
      billingApt: '',
      billingState: '',
      billingZipcode: '',
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
        mailingStreet: '',
        mailingCity: '',
        mailingApt: '',
        mailingState: '',
        mailingZipcode: '',
        mailingPhoneNumber: '',
        bylaw1: '',
        bylaw2: '',
        projectGroup: '',
        numShares: 0,
        dividends: '',
        beneficiaries: [],
        ccNumber: '',
        expmonth: '',
        expyear: '',
        cvv: '',
        billingStreet: '',
        billingApt: '',
        billingCity: '',
        billingState: '',
        billingZipcode: ''
      },
      step: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.callBackBylawValidation = this.callBackBylawValidation.bind(this);
    this.selectNoProjectGroup = this.selectNoProjectGroup.bind(this);
  }

  componentDidMount() {
    const id = getLoggedInUserId();
    const { step, numShares, projectGroup, dividends } = this.state;
    // Person does not have a User Id
    if (!id) {
      return;
    }

    this.setState({ userId: id });
    getRecord('Person', id)
      .then(personRecord => {
        this.setState({
          step: personRecord.record['Onboarding Step'],
          userLoginId: personRecord.record['User Login'][0],
          personId: personRecord.record.Owner[0],
          fname: personRecord.record.Name.split(' ')[0],
          lname: personRecord.record.Name.split(' ')[1],
          email: personRecord.record.Email,
          altEmail: personRecord.record['Alternative Email'],
          street: personRecord.record.Street,
          apt: personRecord.record.Apt,
          city: personRecord.record.City,
          state: personRecord.record.State,
          zipcode: personRecord.record.Zipcode,
          phoneNumber: personRecord.record['Phone Number'],
          mailingStreet: personRecord.record['Mailing Street'],
          mailingApt: personRecord.record['Mailing Apt'],
          mailingCity: personRecord.record['Mailing City'],
          mailingState: personRecord.record['Mailing State'],
          mailingZipcode: personRecord.record['Mailing Zipcode'],
          mailingPhoneNumber: personRecord.record['Mailing Phone Number'],
          billingStreet: personRecord.record['Billing Street'],
          billingApt: personRecord.record['Billing Apt'],
          billingCity: personRecord.record['Billing City'],
          billingState: personRecord.record['Billing State'],
          billingZipcode: personRecord.record['Billing Zipcode'],
          dividends: personRecord.record.Dividends,
          password: personRecord.record.Password
        });
        const { Owner: owner } = personRecord.record;
        return getRecord('Owner', owner);
      })
      .then(ownerRecord => {
        if (step > 3) {
          this.setState({
            projectGroup: ownerRecord.record['Project Group'][0],
            numShares: ownerRecord.record['Number of Shares']
          });

          if (step > 3 && projectGroup === {}) {
            this.setState({
              noProjectGroup: true
            });
          } else if (step > 4) {
            this.setState({
              bylaw1: true,
              bylaw2: true
            });
          }
        }
      });
    if (numShares === '') {
      this.setState({
        numShares: 0
      });
    }
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

  // updates the state whenever there is a change made
  handleChange = event => {
    const {
      bylaw1,
      bylaw2,
      noProjectGroup,
      street,
      apt,
      city,
      state,
      zipcode,
      phoneNumber,
      billingAddressSame,
      mailingAddressSame
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
      case 'noProjectGroup':
        this.setState({
          noProjectGroup: !noProjectGroup
        });
        break;
      case 'billingAddressSame':
        if (!billingAddressSame) {
          this.setState({
            billingStreet: street,
            billingApt: apt,
            billingCity: city,
            billingState: state,
            billingZipcode: zipcode
          });
        }
        this.setState({
          billingAddressSame: !billingAddressSame
        });
        break;
      case 'mailingAddressSame':
        if (!mailingAddressSame) {
          this.setState({
            mailingStreet: street,
            mailingApt: apt,
            mailingCity: city,
            mailingState: state,
            mailingZipcode: zipcode,
            mailingPhoneNumber: phoneNumber
          });
        }
        this.setState({
          mailingAddressSame: !mailingAddressSame
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
      case 'numShares':
        this.setState({
          numShares: event.target.value
        });
        break;
      default:
        console.log(event.target.name + event.target.value);
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

  selectNoProjectGroup = () => {
    const { noProjectGroup } = this.state;
    this.setState({ noProjectGroup: !noProjectGroup });
  };

  // function for validation of bylaws
  callBackBylawValidation() {
    const { errors } = this.state;
    this.setState({
      errors: { ...errors, bylaw1: 'Required' }
    });
  }

  render() {
    const { step, noProjectGroup } = this.state;

    switch (step) {
      case 1:
        return (
          <BasicInfo
            nextStep={this.nextStep}
            values={this.state}
            handleChange={this.handleChange}
            handleFormValidation={this.handleFormValidation}
          />
        );
      case 2:
        return Template(
          <ContactInfo
            nextStep={this.nextStep}
            values={this.state}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleFormValidation={this.handleFormValidation}
            createPersonOwnerUserLoginRecord={createPersonOwnerUserLoginRecord}
          />,
          2
        );
      case 3:
        return Template(
          <ProjectGroups
            nextStep={this.nextStep}
            values={this.state}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleFormValidation={this.handleFormValidation}
            selectNoProjectGroup={this.selectNoProjectGroup}
            noProjectGroup={noProjectGroup}
          />,
          3
        );
      case 4:
        return Template(
          <Bylaws
            nextStep={this.nextStep}
            values={this.state}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            callBackBylawValidation={this.callBackBylawValidation}
            handleClick={this.handleClick}
          />,
          4
        );
      case 5:
        return Template(
          <Payment
            values={this.state}
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleFormValidation={this.handleFormValidation}
            handleDividends={this.handleDividends}
          />,
          5
        );
      case 6:
        return Template(
          <Complete
            values={this.state}
            prevStep={this.prevStep}
            onSubmit={this.onSubmit}
            handleChange={this.handleChange}
            handleFormValidation={this.handleFormValidation}
            handleDividends={this.handleDividends}
          />,
          6
        );
      default:
        return <div>Page not Found</div>;
    }
  }
}

export default Onboarding;
