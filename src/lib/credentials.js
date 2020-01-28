import { getAdminTable } from './adminUtils';
import constants from '../constants';

const { SUBSCRIBER_OWNER, GENERAL_OWNER } = constants;

const Credentials = { ADMIN: 'A', GENERAL: 'G', SUBSCRIBER: 'S' };

async function getCredentials(owner) {
  let credentials = '';

  // TODO: Will this ever be the case? Is this check necessary
  if (owner == null) {
    return credentials;
  }

  const isAdminPayload = await getAdminTable(owner);
  if (isAdminPayload !== -1) {
    credentials += Credentials.ADMIN;
  }

  const ownerTypes = owner.ownerType;

  if (ownerTypes.includes(SUBSCRIBER_OWNER)) {
    credentials += Credentials.SUBSCRIBER;
  }

  if (ownerTypes.includes(GENERAL_OWNER)) {
    credentials += Credentials.GENERAL;
  }

  return credentials;
}

function isSignedIn(credentials) {
  return credentials !== '';
}

function isAdmin(credentials) {
  return credentials.includes(Credentials.ADMIN);
}

function isSubscriberOwner(credentials) {
  return credentials.includes(Credentials.SUBSCRIBER);
}

function isGeneralOwner(credentials) {
  return credentials.includes(Credentials.GENERAL);
}

export {
  getCredentials,
  isAdmin,
  isSubscriberOwner,
  isGeneralOwner,
  isSignedIn,
  Credentials
};
