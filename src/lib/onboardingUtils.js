import States from '../assets/states.json';
import {
  getOwnersByEmail,
  getAllProjectGroups,
  updateOwner,
  createOwner
} from './airtable/request';
import { refreshUserData } from './userDataUtils';

// Helper functions to validate owner record fields

// Ensure value exists
// Allows custom error message
const validateExistence = (value, error = 'Required') => {
  return value ? '' : error;
};

// Ensure valid and unique email
const validateEmail = value => {
  return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)
    ? ''
    : 'Invalid Email';
};

const validateUniqueEmail = async value => {
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
  email: [validateExistence, validateEmail, validateUniqueEmail],
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

const getAvailableProjectGroups = async () => {
  const projectGroups = await getAllProjectGroups();

  // TODO: double check this logic
  const selectableGroups = projectGroups.filter(
    group => group.isPublic && !group.isDefault
  );
  const defaultGroup = projectGroups.find(group => group.isDefault);
  return { selectableGroups, defaultGroup };
};

const updateOwnerFields = async (owner, fields) => {
  console.log('Received Owner Update:');
  console.log(owner);
  const ownerUpdate = fields.reduce(
    (value, field) => ({ ...value, [field]: owner[field] }),
    { onboardingStep: owner.onboardingStep } // 1 pre-existing field
  );
  console.log('Selected Fields');
  console.log(ownerUpdate);
  if (owner.id) {
    await updateOwner(owner.id, ownerUpdate);
    refreshUserData(owner.id);
  } else {
    const ownerId = await createOwner(ownerUpdate);
    refreshUserData(ownerId);
  }
};

export { validateField, getAvailableProjectGroups, updateOwnerFields };
