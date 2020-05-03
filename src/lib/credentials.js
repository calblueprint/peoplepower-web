/**
 *
 * Credentials and util functions for specifying credentials of users
 * based on their data stored on Airtable
 *
 */

import constants from '../constants';

const { SUBSCRIBER_OWNER, GENERAL_OWNER } = constants;

const Credentials = {
  ADMIN: 'A',
  GENERAL: 'G',
  SUBSCRIBER: 'S',
  ONBOARDING: 'O',
  SUPERADMIN: 'X'
};

// Gets credentials for a given owner
function getCredentials(owner) {
  let credentials = '';

  if (owner == null) {
    return credentials;
  }

  if (owner.onboardingStep !== -1) {
    credentials += Credentials.ONBOARDING;
    return credentials;
  }

  // Assumes that admin is only owner of one project group
  if (owner.adminOfId && owner.adminOfId.length >= 0) {
    credentials += Credentials.ADMIN;
  }

  if (owner.isSuperAdmin) {
    credentials += Credentials.SUPERADMIN;
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

// Helper functions to check whether a user has a certain credential

function isOnboarding(credentials) {
  return credentials.includes(Credentials.ONBOARDING);
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

function isSuperAdmin(credentials) {
  return credentials.includes(Credentials.SUPERADMIN);
}

export {
  getCredentials,
  isAdmin,
  isSubscriberOwner,
  isGeneralOwner,
  isSuperAdmin,
  isSignedIn,
  isOnboarding,
  Credentials
};
