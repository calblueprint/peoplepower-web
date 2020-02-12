import constants from '../constants';

const { SUBSCRIBER_OWNER, GENERAL_OWNER } = constants;

const Credentials = { ADMIN: 'A', GENERAL: 'G', SUBSCRIBER: 'S' };

function getCredentials(owner) {
  let credentials = '';

  if (owner == null || owner.onboardingStep !== -1) {
    return credentials;
  }

  // Assumes that admin is only owner of one project group
  if (owner.adminOfId && owner.adminOfId.length >= 0) {
    credentials += Credentials.ADMIN;
  }

  const { ownerTypes } = owner;

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
