import React from 'react';
import { connect } from 'react-redux';
import { updateOwner } from '../../lib/airtable/request';
import { OnboardingData, validateField } from '../../lib/onboardingUtils';
import ProgressBar from './components/ProgressBar';

class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    // State should contain owner values, error messages
    this.state = {
      owner: {},
      errors: {}
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
  };

  nextStep = async event => {
    const { owner } = this.state;
    event.preventDefault();

    // Validate each field and add to error object
    let foundErrors = false;
    const newErrors = OnboardingData[owner.step].fields.reduce(
      async (errorsPromise, field) => {
        const errors = await errorsPromise;
        const errorMessages = await validateField(field, owner[field]);

        // Take just the first error
        if (errorMessages) {
          foundErrors = true;
          const [firstError] = errorMessages;
          errors[field] = firstError;
        }

        return errors;
      },
      Promise.resolve({})
    );

    this.setState({ errors: newErrors });

    if (!foundErrors) {
      // Save to Airtable and update Step
      // TODO: Account for step 0 where owner doesn't exist
      const newOwner = { ...owner, step: owner.step + 1 };

      // according to fang shuo deng this should be in it's own util file
      // which makes sense so that we can create/update partial record
      await updateOwner(owner.id, newOwner);

      // Note: Should we refresh redux? Perhaps with a partial update
      this.setState({ owner: newOwner });
    }
  };

  // Note, some sort of validation needs to happen on prevStep, that or nextStep only performs a partial update
  prevStep = event => {
    const { owner } = this.state;
    event.preventDefault();

    // Decrement Step
    this.setState({ owner: { ...owner, step: owner.step - 1 } });
  };

  handleChange = event => {
    const { name, value } = event.target;
    const { owner } = this.state;
    const newOwner = { ...owner };
    switch (name) {
      case 'permanentStreet1':
      case 'permanentStreet2':
      case 'permanentCity':
      case 'permanentState':
      case 'permanentZipcode':
        if (owner.mailingAddressSame) {
          const mailingKey = name.replace('permanant', 'mailing');
          newOwner[mailingKey] = value;
        }
        break;
      case 'mailingAddressSame':
        if (value) {
          newOwner.mailingStreet1 = owner.permanentStreet1;
          newOwner.mailingStreet2 = owner.permanentStreet2;
          newOwner.mailingCity = owner.permanentCity;
          newOwner.mailingState = owner.permanentState;
          newOwner.mailingZipcode = owner.permanentZipcode;
          newOwner.mailingAddressSame = value;
        }
        break;
      default:
        newOwner[name] = value;
    }
    this.setState({ owner: newOwner });
  };

  render() {
    const { owner, errors } = this.state;
    const stepData = OnboardingData[owner.step];
    const StepComponent = stepData.component;
    return (
      <div className="flex onboarding-col template-center w-70">
        <div className="template-card">
          <h1 className="template-header">{stepData.header}</h1>
          <p className="template-body">{stepData.copy}</p>
          <ProgressBar step={owner.step} />
        </div>
        <StepComponent
          owner={owner}
          errors={errors}
          onSubmit={this.nextStep}
          onBack={this.prevStep}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  isLoadingUserData: state.userData.isLoadingUserData
});
export default connect(mapStateToProps)(Onboarding);
