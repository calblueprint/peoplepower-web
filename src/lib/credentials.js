import { getOwnerFromPerson, getAdminTable } from './adminUtils';
import { getOwnerById } from './request';
import constants from '../constants';

const { OWNER_TYPE_FIELD, SUBSCRIBER_OWNER, GENERAL_OWNER } = constants;

async function applyCredentials(userId) {
  let credentials = '';

  if (userId == null) {
    return credentials;
  }

  const ownerId = await getOwnerFromPerson(userId);
  const isAdminPayload = await getAdminTable(ownerId);
  if (isAdminPayload !== -1) {
    credentials += 'A';
  }

  const ownerRecord = await getOwnerById(ownerId);
  const ownerTypes = ownerRecord[OWNER_TYPE_FIELD];

  if (ownerTypes.includes(SUBSCRIBER_OWNER)) {
    credentials += 'S';
  }

  if (ownerTypes.includes(GENERAL_OWNER)) {
    credentials += 'G';
  }

  return credentials;
}

function isSignedIn(credentials) {
  return credentials !== '';
}

function isAdmin(credentials) {
  return credentials.includes('A');
}

function isSubscriberOwner(credentials) {
  return credentials.includes('S');
}

function isGeneralOwner(credentials) {
  return credentials.includes('G');
}

export {
  applyCredentials,
  isAdmin,
  isSubscriberOwner,
  isGeneralOwner,
  isSignedIn
};
