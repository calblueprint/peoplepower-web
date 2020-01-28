import constants from '../constants';

const { SUBSCRIBER_OWNER, GENERAL_OWNER } = constants;

function getCredentials(owner) {
  let credentials = '';

  // TODO: Will this ever be the case? Is this check necessary
  if (owner == null) {
    return credentials;
  }

  if (owner.adminOf && owner.adminOf.length >= 0) {
    credentials += 'A';
  }

  const ownerTypes = owner.ownerType;

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
  getCredentials,
  isAdmin,
  isSubscriberOwner,
  isGeneralOwner,
  isSignedIn
};
