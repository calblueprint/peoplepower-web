import { getAdminTable } from './adminUtils';
import constants from '../constants';
import { Columns } from './airtable/schema';

const { SUBSCRIBER_OWNER, GENERAL_OWNER } = constants;

async function applyCredentials(owner) {
  let credentials = '';

  // TODO: Will this ever be the case? Is this check necessary
  if (owner == null) {
    return credentials;
  }

  const isAdminPayload = await getAdminTable(owner);
  if (isAdminPayload !== -1) {
    credentials += 'A';
  }

  const ownerTypes = owner[Columns.Owner.OwnerType];

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
