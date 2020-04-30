import ContactInfoStep from './steps/ContactInfoStep';
import BasicInfoStep from './steps/BasicInfoStep';
import ProjectGroupStep from './steps/ProjectGroupStep';
import PaymentStep from './steps/PaymentStep';
import CompleteStep from './steps/CompleteStep';
import BylawStep from './steps/BylawStep';
import PaymentDetailsStep from './steps/PaymentDetailsStep';

// Maps Step to Component and Fields via Indices
const OnboardingData = [
  {
    component: BasicInfoStep,
    fields: [
      'firstName',
      'lastName',
      'email',
      'alternateEmail',
      'password',
      'ownerTypes',
      'isReceivingDividends',
      'numberOfShares'
    ],
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
    component: PaymentDetailsStep,
    fields: ['isReceivingDividends', 'numberOfShares'],
    copy: '',
    header: 'Purchase shares'
  },
  {
    component: PaymentStep,
    fields: [],
    copy: '',
    header: 'Finish Payment'
  },
  {
    component: CompleteStep,
    fields: [],
    copy:
      'Great! Congrats on finishing onboarding. Click to go to your dashboard!',
    header: 'Registration complete!'
  }
];

export default OnboardingData;
