import React from 'react';
import { connect } from 'react-redux';
import { updateOwner } from '../../lib/airtable/request';
import { OnboardingData } from '../../lib/onboardingUtils';

class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    // State should contain owner values, error messages, and helper values
    this.state = {
      owner: {},
      errors: {},
      bylaw1: false,
      bylaw2: false,
      mailingAddressSame: false
    };
  }

  componentDidMount() {
    // Pull existing onboarding data and set up things based on onboarding step
    this.refreshState();
  }

  componentDidUpdate(prevProps) {
    const { owner } = this.props;
    if (owner !== prevProps.owner) {
      this.refreshState();
    }
  }

  refreshState = () => {
    const { owner, isLoadingUserData } = this.props;

    if (isLoadingUserData) {
      return;
    }

    this.setState({ owner: { ...owner } });

    // TODO: set Bylaw values to true based on step
  };

  nextStep = async () => {
    const { owner } = this.state;

    // Validate each field and add to error object
    let foundErrors = false;
    const newErrors = OnboardingData[owner.step].fields.reduce(
      async (errorsPromise, field) => {
        const errors = await errorsPromise;
        const errorMessages = await validateField(field, owner[field]);
        errors[field] = errorMessages;

        if (errorMessages) {
          foundErrors = true;
        }

        return errorsAcc;
      },
      Promise.resolve({})
    );

    this.setState({ errors: newErrors });

    if (!foundErrors) {
      // Save to Airtable and update Step
      // TODO: Account for step 0 where owner doesn't exist
      const newOwner = { ...owner, step: owner.step + 1 };
      await updateOwner(owner.id, newOwner);

      // Note: Should we refresh redux? Perhaps with a partial update
      this.setState({ owner: newOwner });
    }
  };

  // Note, some sort of validation needs to happen on prevStep, that or nextStep only performs a partial update
  prevStep = () => {
    const { owner } = this.state;

    // Decrement Step
    this.setState({ owner: { ...owner, step: owner.step - 1 } });
  };

  handleChange = event => {
    const { name, value } = event.target;
    const { owner, mailingAddressSame } = this.state;
    const newOwner = { ...owner };
    switch (name) {
      case 'permanentStreet1':
      case 'permanentStreet2':
      case 'permanentCity':
      case 'permanentState':
      case 'permanentZipcode':
        if (mailingAddressSame) {
          const mailingKey = name.replace('permanant', 'mailing');
          newOwner[mailingKey] = value;
        }
        break;
      case 'mailingAddressSame':
        newOwner.mailingStreet1 = owner.permanentStreet1;
        newOwner.mailingStreet2 = owner.permanentStreet2;
        newOwner.mailingCity = owner.permanentCity;
        newOwner.mailingState = owner.permanentState;
        newOwner.mailingZipcode = owner.permanentZipcode;
        break;
      default:
        newOwner[name] = value;
    }
    this.setState({ owner: newOwner });
  };

  render() {
    const { owner } = this.state;
    const stepData = OnboardingData[step];
    const StepComponent = stepData.component;
    return (
      <div className="flex onboarding-col template-center w-70">
        <div className="template-card">
          <h1 className="template-header">{stepData.header}</h1>
          <p className="template-body">{stepData.copy}</p>
          <ProgressBar step={owner.step} />
        </div>
        <StepComponent />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  isLoadingUserData: state.userData.isLoadingUserData
});
export default connect(mapStateToProps)(Onboarding);
