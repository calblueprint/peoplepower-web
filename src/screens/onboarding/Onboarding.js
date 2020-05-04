import React from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import OnboardingData from './onboardingData';
import {
  validateField,
  updateOwnerFields,
  toggleValidColor,
  validateFieldSync
} from '../../lib/onboardingUtils';
import ProgressBar from './components/ProgressBar';
import Constants from '../../constants';
import {
  getPledgeInviteById,
  updatePledgeInvite
} from '../../lib/airtable/request';
import LoadingComponent from '../../components/LoadingComponent';

const { GENERAL_OWNER, PLEDGE_INVITE_USED } = Constants;

class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    // State should contain owner values, error messages
    this.state = {
      owner: {
        onboardingStep: 0,
        inviteToken: '',
        ownerTypes: [GENERAL_OWNER],
        isReceivingDividends: true,
        numberOfShares: 1
      },
      errors: {},
      loading: false
    };
  }

  componentDidMount() {
    this.refreshState();
  }

  componentDidUpdate(prevProps) {
    const { owner } = this.props;
    if (owner !== prevProps.owner) {
      this.refreshState();
    }
  }

  // Get latest values from props
  refreshState = async () => {
    const { owner, location } = this.props;

    // If there is a logged-in owner, copy it to state
    if (owner) {
      this.setState({
        owner: {
          ...owner
        }
      });
    } else {
      // Otherwise, check for invite in query string
      const inviteToken = qs.parse(location.search, {
        ignoreQueryPrefix: true
      }).invite;

      if (inviteToken) {
        // Download pledge invite and update state
        const pledgeInvite = await getPledgeInviteById(inviteToken);
        if (pledgeInvite && pledgeInvite.status !== PLEDGE_INVITE_USED) {
          this.setState(prevState => ({
            owner: {
              ...prevState.owner,
              firstName: pledgeInvite.firstName,
              lastName: pledgeInvite.lastName,
              numberOfShares: pledgeInvite.shareAmount,
              isReceivingDividends: pledgeInvite.wantsDividends,
              phoneNumber: pledgeInvite.phoneNumber,
              email: pledgeInvite.email,
              projectGroupId: pledgeInvite.projectGroupId,
              pledgeInviteId: pledgeInvite.id
            },
            inviteToken: pledgeInvite.id
          }));
        }
      }
    }
  };

  // Validate fields and update owner if no errors
  nextStep = async event => {
    const { owner, inviteToken } = this.state;
    if (event) {
      event.preventDefault();
    }

    // Keep track of whether we've found any errors
    let foundErrors = false;

    // For each field in this onboarding step, validate, and add to errors object
    const fieldsToValidate = OnboardingData[owner.onboardingStep].fields;
    const allErrorMessages = await Promise.all(
      fieldsToValidate.map(f => validateField(f, owner[f]))
    );
    const newErrors = {};
    allErrorMessages.forEach((errorMessage, i) => {
      const field = fieldsToValidate[i];
      newErrors[field] = errorMessage;
      if (errorMessage !== '') {
        foundErrors = true;
      }
    });
    this.setState({ errors: newErrors });
    if (!foundErrors) {
      this.setState({ loading: true });
      // Create/Update specific owner fields
      // State should be refreshed when data is successfully pulled from redux

      const newOwner = {
        ...owner,
        onboardingStep: owner.onboardingStep + 1
      };

      // If owner had invite, skip project group step
      if (newOwner.onboardingStep === 2 && newOwner.pledgeInviteId) {
        newOwner.onboardingStep += 1;
      }

      const fieldsToUpdate = [...OnboardingData[owner.onboardingStep].fields];

      // Update extra fields if user has a valid invitation
      if (inviteToken) {
        fieldsToUpdate.push('phoneNumber', 'projectGroupId', 'pledgeInviteId');
        updatePledgeInvite(inviteToken, {
          status: PLEDGE_INVITE_USED
        });
      }

      await updateOwnerFields(newOwner, fieldsToUpdate);
      this.setState({ loading: false });
    }
  };

  // Decrement step, no validation or airtable update
  prevStep = event => {
    const { owner } = this.state;
    event.preventDefault();

    // Decrement Step
    this.setState({
      owner: { ...owner, onboardingStep: owner.onboardingStep - 1 }
    });
  };

  // Handle a change in a step component
  handleChange = event => {
    const { name, value } = event.target;
    const { owner } = this.state;
    const newOwner = { ...owner };
    switch (name) {
      case 'certifyPermanentAddress':
      case 'bylaw1':
      case 'bylaw2':
        newOwner[name] = event.target.checked;
        break;
      case 'isReceivingDividends':
        newOwner[name] = value === 'on';
        break;
      case 'permanentStreet1':
      case 'permanentStreet2':
      case 'permanentCity':
      case 'permanentState':
      case 'permanentZipcode':
        if (owner.mailingAddressSame) {
          const mailingKey = name.replace('permanent', 'mailing');
          newOwner[mailingKey] = value;
        }
        newOwner[name] = value;

        break;
      case 'mailingAddressSame':
        if (value) {
          newOwner.mailingStreet1 = owner.permanentStreet1;
          newOwner.mailingStreet2 = owner.permanentStreet2;
          newOwner.mailingCity = owner.permanentCity;
          newOwner.mailingState = owner.permanentState;
          newOwner.mailingZipcode = owner.permanentZipcode;
          newOwner.mailingAddressSame = event.target.checked;
        }
        break;
      default:
        newOwner[name] = value;
    }
    this.setState({ owner: newOwner });
  };

  handleChangeBylaw = async event => {
    const { name } = event.target;
    const { owner, errors } = this.state;
    const newOwner = { ...owner };
    newOwner[name] = event.target.checked;
    this.setState({ owner: newOwner });
    const fieldsToValidate = ['bylaw1', 'bylaw2'];
    const allErrorMessages = fieldsToValidate.map(f =>
      validateFieldSync(f, owner[f])
    );
    const newErrors = {};
    allErrorMessages.forEach((errorMessage, i) => {
      const field = fieldsToValidate[i];
      newErrors[field] = errorMessage;
    });
    this.setState({ errors: { ...errors, [name]: newErrors[newOwner[name]] } });
  };

  onFinish = () => {
    const { owner } = this.state;
    const newOwner = { ...owner, onboardingStep: -1 };

    // Should trigger redux refresh navigating user away from onboarding
    updateOwnerFields(newOwner, []);
  };

  // Render the component based on the user's onboarding step
  render() {
    const { history } = this.props;
    const { owner, errors, loading } = this.state;
    const stepData = OnboardingData[owner.onboardingStep];
    const StepComponent = stepData.component;
    const showStyles = owner.onboardingStep > 0;
    if (loading) {
      return <LoadingComponent />;
    }
    return (
      <div
        className={showStyles ? 'flex onboarding-col template-center w-70' : ''}
      >
        {showStyles && (
          <div className="template-card">
            <h1 className="template-header">{stepData.header}</h1>
            <p className="template-body">{stepData.copy}</p>
            <ProgressBar step={owner.onboardingStep} />
          </div>
        )}
        <StepComponent
          owner={owner}
          errors={errors}
          onSubmit={this.nextStep}
          onBack={this.prevStep}
          onFinish={this.onFinish}
          handleChange={this.handleChange}
          handleChangeBylaw={this.handleChangeBylaw}
          toggleValidColor={toggleValidColor}
          history={history}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner
});
export default connect(mapStateToProps)(Onboarding);
