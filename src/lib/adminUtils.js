import {
  updateProjectGroup,
  getProjectGroupById,
  createPledgeInvite,
  getOwnersByIds
} from './airtable/request';
import { refreshUserData } from './redux/userData';
import {
  validateExistence,
  validateEmail,
  validateUniqueEmail,
  validateNumber,
  validateZipcode
} from './onboardingUtils';
import { store } from './redux/store';
import USStates from '../assets/states.json';

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
    return '';
  }
  return 'Invalid State';
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
    const emailInvite = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/invite`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pledgeInviteId
        })
      }
    );

    const emailResponse = await emailInvite.json();
    const { status } = emailResponse;
    return status;
  } catch (err) {
    return 'error';
  }
}
