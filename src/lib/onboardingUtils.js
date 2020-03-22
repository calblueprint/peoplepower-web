/* eslint-disable no-await-in-loop */
import React from 'react';
import States from '../assets/states.json';
import {
  getOwnersByEmail,
  getAllProjectGroups,
  updateOwner,
  createOwner
} from './airtable/request';
import { refreshUserData } from './userDataUtils';
import Error from '../assets/error.svg';

// Helper functions to validate owner record fields

// Ensure value exists
// Allows custom error message
const validateExistence = (
  value,
  error = 'Please enter this required field.'
) => {
  return value ? '' : error;
};

const errorText = (
  <div className="error-container">
    <img src={Error} alt="error" className="error-icon" />
    <div className="error-text">
      Please certify the above address in order to proceed.
    </div>
  </div>
);
const validateCertifyPermanentAddress = (value, error = errorText) => {
  return value ? '' : error;
};

// Ensure valid and unique email
const validateEmail = value => {
  // No such thing as perfect regex email validation but this is supposed to be pretty thorough! Ideally we validate by sending them an email
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value) ? '' : 'Please enter a valid email address.';
};

const validateUniqueEmail = async value => {
  const owners = await getOwnersByEmail(value);
  return owners.length === 0
    ? ''
    : 'It looks like an account with this email already exists.';
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
  const upperCaseValue = value.toUpperCase();
  if (States.map(s => s.toUpperCase()).indexOf(upperCaseValue) !== -1) {
    if (upperCaseValue !== 'CA') {
      return 'Not California';
    }
    return '';
  }
  return 'Invalid State';
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
  certifyPermanentAddress: [validateCertifyPermanentAddress],
  isReceivingDividends: [],
  projectGroup: [v => validateExistence(v, 'Please choose a group')] // Custom error message
};

// Asynchronously validate field
const validateField = async (name, value) => {
  let validators = ValidatorData[name];

  // Set Default Validator
  if (!validators) {
    validators = [validateExistence];
  }

  for (let i = 0; i < validators.length; i += 1) {
    const validateFunc = validators[i];
    const error = await validateFunc(value);
    if (error !== '') {
      return error;
    }
  }

  return '';
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
  const ownerUpdate = fields.reduce(
    (value, field) => ({ ...value, [field]: owner[field] }),
    { onboardingStep: owner.onboardingStep } // 1 field constant throughout all
  );
  if (owner.id) {
    await updateOwner(owner.id, ownerUpdate);
    refreshUserData(owner.id);
  } else {
    const ownerId = await createOwner(ownerUpdate);
    refreshUserData(ownerId);
  }
};

export { validateField, getAvailableProjectGroups, updateOwnerFields };
