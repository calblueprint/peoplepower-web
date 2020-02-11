import States from '../assets/states.json';
import { getOwnersByEmail } from './airtable/request';
import ContactInfo from '../screens/onboarding/ContactInfo';
import BasicInfo from '../screens/onboarding/BasicInfo';
import ProjectGroups from '../screens/onboarding/ProjectGroups';
import Payment from '../screens/onboarding/Payment';
import Complete from '../screens/onboarding/Complete';
import Bylaws from '../screens/onboarding/Bylaws';

// Helper functions to validate owner record fields

// Ensure value exists
// Allows custom error message
const validateExistence = (value, error = 'Required') => {
  return value ? '' : error;
};

// Ensure valid and unique email
const validateEmail = async value => {
  if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)) {
    return 'Invalid Email';
  }

  const owners = await getOwnersByEmail(value);
  return owners.length === 0 ? '' : 'Email is already taken';
};

// TODO: Add Better Password Rules
// Ensure valid password
const validatePassword = value => {
  return value.length >= 6 ? '' : 'Must be at least 6 characters';
};

// Ensure value is a number
const validateNumber = value => {
  return !Number.isNaN(value) ? '' : 'Must be a number';
};

// Ensure shares is a valid number
const validateShares = value => {
  if (value > 10) {
    return 'Max number of shares is 10';
  }
  if (value < 1) {
    return 'Min number of shares is 1';
  }
  return '';
};

// Ensure State is a real state (either abbreivation or full name)
const validateState = value => {
  return States.map(s => s.toUpperCase()).indexOf(value.toUpperCase()) !== -1
    ? ''
    : 'Invalid State';
};

// Ensure Zipcode is of valid length
const validateZipcode = value => {
  return value.length === 5 ? '' : 'Must be 5 digits';
};

// Specify special validation functions for fields
// Default for all fields: [validateExistence]
const ValidatorData = {
  email: [validateExistence, validateEmail],
  password: [validateExistence, validatePassword],
  permanentState: [validateExistence, validateState],
  mailingState: [validateExistence, validateState],
  permanentZipcode: [validateExistence, validateNumber, validateZipcode],
  mailingZipcode: [validateExistence, validateNumber, validateZipcode],
  numberOfShares: [validateExistence, validateNumber, validateShares],
  mailingAddressSame: [],
  alternateEmail: [],
  permanentStreet2: [],
  mailingStreet2: [],
  projectGroup: [v => validateExistence(v, 'Please choose a group')] // Custom error message
};

// Asynchronously validate field
const validateField = async (name, value) => {
  let validators = ValidatorData[name];

  // Set Default Validator
  if (!validators) {
    validators = [validateExistence];
  }

  // For each validator, compute error message
  const errors = await Promise.all(validators.map(f => f(value)));

  // filter out empty strings
  return errors.filter(e => e !== '');
};

// Maps Step to Component and Fields via Indices
const OnboardingData = [
  {
    component: BasicInfo,
    fields: ['firstName', 'lastName', 'email', 'alternativeEmail', 'password'],
    copy: '',
    header: ''
  },
  {
    component: ContactInfo,
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
      'phoneNumber'
    ],
    copy:
      'Tell us some general contact information so we can get started setting up your account.',
    header: 'Welcome Aboard!'
  },
  {
    component: ProjectGroups,
    fields: [],
    copy:
      'Project groups in People Power represent the different communities involved in our cooperative. ',
    header: 'Select your project group'
  },
  {
    component: Bylaws,
    fields: [],
    copy: '',
    header: 'Owner Agreement and Acknowledgment'
  },
  { component: Payment, fields: [], copy: '', header: 'Purchase shares' },
  {
    component: Complete,
    fields: [],
    copy: '',
    header: 'Registration complete!'
  }
];

export { validateField, OnboardingData };
