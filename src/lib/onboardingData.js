import ContactInfoStep from '../screens/onboarding/steps/ContactInfoStep';
import BasicInfoStep from '../screens/onboarding/steps/BasicInfoStep';
import ProjectGroupStep from '../screens/onboarding/steps/ProjectGroupStep';
import PaymentStep from '../screens/onboarding/steps/PaymentStep';
import CompleteStep from '../screens/onboarding/steps/CompleteStep';
import BylawStep from '../screens/onboarding/steps/BylawStep';

// Maps Step to Component and Fields via Indices
const OnboardingData = [
  {
    component: BasicInfoStep,
    fields: ['firstName', 'lastName', 'email', 'alternativeEmail', 'password'],
    copy: '',
    header: ''
  },
  {
    component: ContactInfoStep,
    fields: [
      'permanentStreet1',
      'permanentStreet2',
      'permanentCity',
      'permanentState',
      'permanentZipcode',
      'mailingStreet1',
      'mailingStreet2',
      'mailingCity',
      'mailingState',
      'mailingZipcode',
      'phoneNumber',
      'mailingAddressSame',
      'certifyPermanentAddress'
    ],
    copy:
      'Tell us some general contact information so we can get started setting up your account.',
    header: 'Welcome Aboard!'
  },
  {
    component: ProjectGroupStep,
    fields: ['projectGroupId'],
    copy:
      'Project groups in People Power represent the different communities involved in our cooperative. ',
    header: 'Select your project group'
  },
  {
    component: BylawStep,
    fields: ['bylaw1', 'bylaw2'],
    copy: '',
    header: 'Owner Agreement and Acknowledgment'
  },
  {
    component: PaymentStep,
    fields: ['isReceivingDividends', 'numberOfShares'],
    copy: '',
    header: 'Purchase shares'
  },
  {
    component: CompleteStep,
    fields: [],
    copy: '',
    header: 'Registration complete!'
  }
];

export default OnboardingData;
