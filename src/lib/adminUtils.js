import {
  updateProjectGroup,
  getProjectGroupById,
  createPledgeInvite,
  getOwnersByIds,
  getOwnersByEmail
} from './airtable/request';
import { refreshUserData } from './userDataUtils';
import { store } from './redux/store';
import constants from '../constants';
import USStates from '../assets/states.json';

const validateExistence = (
  value,
  error = 'Please enter this required field.'
) => {
  return value ? '' : error;
};

export function toggleValidColor(input, type) {
  switch (type) {
    case 0:
      return input !== '' && typeof input !== 'undefined'
        ? 'b-is-not-valid'
        : 'b-is-valid';
    case 1:
      return !input ? '\u00A0' : input;
    case 2:
      return input !== '' && typeof input !== 'undefined'
        ? 'b-is-not-valid'
        : null;
    default:
      return null;
  }
}

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

// Ensure value is a number
const validateNumber = value => {
  return !Number.isNaN(value) ? '' : 'Must be a number';
};

// Ensure shares is a valid number
const validateShares = value => {
  if (value > 10) {
    return 'Max number of shares is 10';
  }
  if (value < 0) {
    return 'Min number of shares is 0';
  }
  return '';
};

// Ensure State is a real state (either abbreivation or full name)
const ValidateUSState = value => {
  const upperCaseValue = value.toUpperCase();
  if (USStates.map(s => s.toUpperCase()).indexOf(upperCaseValue) !== -1) {
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
  inviteEmail: [validateExistence, validateEmail, validateUniqueEmail],
  inviteShareAmount: [validateExistence, validateNumber, validateShares],
  updateEmail: [validateExistence, validateEmail, validateUniqueEmail],
  updateState: [validateExistence, ValidateUSState],
  updateZipcode: [validateExistence, validateNumber, validateZipcode],
  updateStreet2: []
};

// Asynchronously validate field
export async function validateField(name, value) {
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
}

export async function removeOwner(owner) {
  const projectGroup = await getProjectGroupById(owner.projectGroupId);

  const newOwnerIds = projectGroup.ownerIds.filter(id => id !== owner.id);

  await updateProjectGroup(projectGroup.id, {
    ownerIds: newOwnerIds
  });

  // Refresh local copy of data after updating owners
  const { owner: loggedInOwner } = store.getState().userData;
  await refreshUserData(loggedInOwner.id);
}

export async function getOwnerRecordsForProjectGroup(projectGroup) {
  const allOwners = await getOwnersByIds(projectGroup.ownerIds);

  // Ensure onboarding users aren't considered
  return allOwners.filter(o => o.onboardingStep === -1);
}

export async function inviteMember(pledgeInvite) {
  return createPledgeInvite(pledgeInvite);
}

export async function triggerEmail(pledgeInviteId) {
  try {
    const emailInvite = await fetch(`${constants.BACKEND_URL}/invite`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pledgeInviteId
      })
    });

    const emailResponse = await emailInvite.json();
    const { status } = emailResponse;
    return status;
  } catch (err) {
    return 'error';
  }
}
