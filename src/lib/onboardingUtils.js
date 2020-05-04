/* eslint-disable no-await-in-loop */
import React from 'react';
import USStates from '../assets/usStates.json';
import {
  getAllProjectGroups,
  updateOwner,
  deleteOwner
} from './airtable/request';
import { refreshUserData, clearUserData } from './redux/userData';
import ErrorIcon from '../assets/error.svg';
import { signupUser } from './airlock/airlock';

// Helper functions to validate owner record fields

// Ensure value exists
// Allows custom error message
const validateExistence = (
  value,
  error = 'Please enter this required field.'
) => {
  return value ? '' : error;
};

// Validation Styling
const toggleValidColor = (input, type) => {
  if (!type) {
    return input !== '' && typeof input !== 'undefined' ? 'b-is-not-valid' : '';
  }
  return !input ? '\u00A0' : input;
};

// User must check this box
const validateCertifyPermanentAddress = value => {
  return value ? (
    ''
  ) : (
    <div className="error-container">
      <img src={ErrorIcon} alt="error" className="mr-1" />
      <div className="error-text">
        Please certify the above address in order to proceed.
      </div>
    </div>
  );
};

// Ensure valid email using regex
const validateEmail = value => {
  if (value && value.length === 0) {
    return '';
  }
  // No such thing as perfect regex email validation but this is supposed to be pretty thorough! Ideally we validate by sending them an email
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value) ? '' : 'Please enter a valid email address.';
};

// Ensure valid alternate email using regex (allowed to be empty)
const validateAlternateEmail = value => {
  if (!value || value.length === 0) {
    return '';
  }
  // No such thing as perfect regex email validation but this is supposed to be pretty thorough! Ideally we validate by sending them an email
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value) ? '' : 'Please enter a valid email address.';
};

// Ensure email is unique
// TODO: Replace this with a call to the backend
const validateUniqueEmail = async value => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const url = `${SERVER_URL}/uniqueEmail?email=${value}`;
  const response = await fetch(url);
  const result = await response.json();
  return result.unique
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
const ValidateUSState = value => {
  const upperCaseValue = value.toUpperCase();
  if (USStates.map(s => s.toUpperCase()).indexOf(upperCaseValue) !== -1) {
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

const validatePhoneNumber = value => {
  // validated phone numbers in this form:
  // (123) 456-7890
  // (123)456-7890
  // 123-456-7890
  // 123.456.7890
  // 1234567890
  // +31636363634
  // 075-63546725
  const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  return re.test(value) ? '' : 'Please enter a valid phone number.';
};

// Specify special validation functions for fields
// Default for all fields: [validateExistence]
const ValidatorData = {
  email: [validateExistence, validateEmail, validateUniqueEmail],
  phoneNumber: [validateExistence, validatePhoneNumber],
  password: [validateExistence, validatePassword],
  permanentState: [validateExistence, ValidateUSState],
  mailingState: [validateExistence, ValidateUSState],
  permanentZipcode: [validateExistence, validateNumber, validateZipcode],
  mailingZipcode: [validateExistence, validateNumber, validateZipcode],
  numberOfShares: [validateExistence, validateNumber, validateShares],
  mailingAddressSame: [],
  alternateEmail: [validateAlternateEmail],
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

const validateFieldSync = (name, value) => {
  let validators = ValidatorData[name];

  // Set Default Validator
  if (!validators) {
    validators = [validateExistence];
  }

  for (let i = 0; i < validators.length; i += 1) {
    const validateFunc = validators[i];
    const error = validateFunc(value);
    if (error !== '') {
      return error;
    }
  }

  return '';
};

// Get all project groups that are public
const getAvailableProjectGroups = async () => {
  const projectGroups = await getAllProjectGroups();

  // TODO: double check this logic
  const selectableGroups = projectGroups.filter(group => group.isPublic);
  const defaultGroup = projectGroups.find(group => group.isDefault);
  return { selectableGroups, defaultGroup };
};

// Update or Create the owner with the given fields
const updateOwnerFields = async (owner, fields) => {
  // Ensure that only the fields that are supposed to be updated are updated
  const ownerUpdate = fields.reduce(
    (value, field) => ({ ...value, [field]: owner[field] }),
    { onboardingStep: owner.onboardingStep } // 1 field constant throughout all
  );

  // If owner exists, update it, else, create.
  if (owner.id) {
    await updateOwner(owner.id, ownerUpdate);
    refreshUserData(owner.id);
  } else {
    // TODO: Error Handling
    const id = await signupUser(
      ownerUpdate.email,
      ownerUpdate.password,
      { ...ownerUpdate, password: undefined } // Remove password from owner update
    );
    refreshUserData(id);
  }
};

// Delete user and return to homepage. This is used if the user does not live in california
const returnToHomepage = owner => {
  deleteOwner(owner.id);
  clearUserData();
};

export {
  validateField,
  validateFieldSync,
  getAvailableProjectGroups,
  updateOwnerFields,
  returnToHomepage,
  toggleValidColor,
  validateEmail,
  validateUniqueEmail,
  validateNumber,
  validateExistence,
  validateZipcode
};
