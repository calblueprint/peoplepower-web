import React from 'react';
import { connect } from 'react-redux';
import OnboardingData from '../../lib/onboardingData';
import { validateField, updateOwnerFields } from '../../lib/onboardingUtils';
import ProgressBar from './components/ProgressBar';
import constants from '../../constants';

const { GENERAL_OWNER } = constants;

class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    // State should contain owner values, error messages
    this.state = {
      owner: { onboardingStep: 0, ownerTypes: [GENERAL_OWNER] },
      errors: {}
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

  refreshState = () => {
    const { owner } = this.props;

    if (owner) {
      // Account for edge case of project group id being wrapped in an array
      this.setState({
        owner: { ...owner, projectGroupId: owner.projectGroupId[0] }
      });
    }
  };

  nextStep = async event => {
    const { owner } = this.state;
    event.preventDefault();

    // Keep track of whether we've found any errors
    let foundErrors = false;

    // For each field in this onboarding step, validate, and add to errors object
    const newErrors = OnboardingData[owner.onboardingStep].fields.reduce(
      async (errorsPromise, field) => {
        const errors = await errorsPromise;
        const errorMessages = await validateField(field, owner[field]);

        // Take just the first error
        if (errorMessages !== []) {
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
      // Create/Update specific owner fields
      // State should be refreshed when data is successfully pulled from redux
      const newOwner = { ...owner, onboardingStep: owner.onboardingStep + 1 };

      // Account for edge case of project group ID needing to be wrapped in an array
      if (newOwner.projectGroupId) {
        newOwner.projectGroupId = [newOwner.projectGroupId];
      }

      await updateOwnerFields(
        newOwner,
        OnboardingData[owner.onboardingStep].fields
      );
    }
  };

  // Note, some sort of validation needs to happen on prevStep, that or nextStep only performs a partial update
  prevStep = event => {
    const { owner } = this.state;
    event.preventDefault();

    // Decrement Step
    this.setState({
      owner: { ...owner, onboardingStep: owner.onboardingStep - 1 }
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    const { owner } = this.state;
    const newOwner = { ...owner };
    switch (name) {
      case 'certifyPermanentAddress':
      case 'bylaw1':
      case 'bylaw2':
      case 'isReceivingDividends':
        newOwner[name] = event.target.checked;
        break;
      case 'permanentStreet1':
      case 'permanentStreet2':
      case 'permanentCity':
      case 'permanentState':
      case 'permanentZipcode':
        if (owner.mailingAddressSame) {
          const mailingKey = name.replace('permanant', 'mailing');
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

  render() {
    const { owner, errors } = this.state;
    const stepData = OnboardingData[owner.onboardingStep];
    const StepComponent = stepData.component;
    const showStyles = owner.onboardingStep > 0;
    return (
      <div
        className={showStyles ? 'flex onboarding-col template-center w-70' : ''}
      >
        {showStyles && (
          <div className="template-card">
            <h1 className="template-header">{stepData.header}</h1>
            <p className="template-body">{stepData.copy}</p>
            <ProgressBar step={owner.step} />
          </div>
        )}
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
  owner: state.userData.owner
});
export default connect(mapStateToProps)(Onboarding);
