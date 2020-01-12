import { setLoginCookie } from './auth';
import {
  createPerson,
  createOwner,
  createUserLogin,
  deleteOwner,
  deletePerson
} from './request';

const DEFAULT_NUM_RETRIES = 3;

// Returns created person's ID
const createPersonWithRetries = async (
  email,
  phoneNumber,
  fullName,
  street,
  city,
  state,
  apt,
  mailingStreet,
  mailingApt,
  mailingCity,
  mailingState,
  mailingZipcode,
  zipcode,
  numRetries
) => {
  // create a person record without an owner field nor user login field
  try {
    return await createPerson({
      Email: email,
      'Phone Number': phoneNumber,
      Name: fullName,
      Street: street,
      City: city,
      State: state,
      Apt: apt,
      Zipcode: zipcode,
      'Onboarding Step': 3,
      'Mailing Street': mailingStreet,
      'Mailing Apt': mailingApt,
      'Mailing City': mailingCity,
      'Mailing State': mailingState,
      'Mailing Zipcode': mailingZipcode
    });
  } catch (err) {
    if (numRetries === 0) {
      throw err;
    }

    return createPersonWithRetries(
      email,
      phoneNumber,
      fullName,
      street,
      city,
      state,
      apt,
      zipcode,
      mailingStreet,
      mailingApt,
      mailingCity,
      mailingState,
      mailingZipcode,
      numRetries - 1
    );
  }
};

// Returns created owner's ID
const createOwnerWithRetries = async (createdPersonId, numRetries) => {
  try {
    return await createOwner({
      Person: [createdPersonId],
      'Owner Type': ['General']
    });
  } catch (err) {
    if (numRetries === 0) {
      throw err;
    }

    return createOwnerWithRetries(createdPersonId, numRetries - 1);
  }
};

// Returns true or false based on success
const createUserLoginWithRetries = async (
  createdPersonId,
  createdOwnerId,
  email,
  password,
  numRetries
) => {
  try {
    const userLoginId = await createUserLogin({
      Person: [createdPersonId],
      Owner: [createdOwnerId],
      Email: email,
      password
    });

    return userLoginId;
  } catch (err) {
    if (numRetries === 0) {
      throw err;
    }

    return createUserLoginWithRetries(
      createdPersonId,
      createdOwnerId,
      email,
      password,
      numRetries - 1
    );
  }
};

// TODO: UNTESTED FUNCTION
const rollbackPersonWithRetries = async (createdPersonId, numRetries) => {
  try {
    await deletePerson(createdPersonId);
  } catch (err) {
    if (numRetries === 0) {
      console.error(`ATTENTION: ${err}`);

      // take any additional action here to notify admin to rectify inconsistency
    }
    await rollbackPersonWithRetries(createdPersonId, numRetries - 1);
  }
};

// TODO:UNTESTED FUNCTION
const rollbackOwnerWithRetries = async (createdOwnerId, numRetries) => {
  try {
    await deleteOwner(createdOwnerId);
  } catch (err) {
    if (numRetries === 0) {
      console.error(`ATTENTION: ${err}`);

      // take any additional action here to notify admin to rectify inconsistency
    }
    await rollbackPersonWithRetries(createdOwnerId, numRetries - 1);
  }
};

// returns person and owner ID in object
const createPersonOwnerUserLoginRecord = async (
  email,
  password,
  phoneNumber,
  fullName,
  street,
  apt,
  city,
  state,
  zipcode,
  mailingStreet,
  mailingApt,
  mailingCity,
  mailingState,
  mailingZipcode,
  numRetries = DEFAULT_NUM_RETRIES
) => {
  // necessary IDs
  let createdPersonId;
  let createdOwnerId;
  let createdUserLoginId;

  try {
    createdPersonId = await createPersonWithRetries(
      email,
      phoneNumber,
      fullName,
      street,
      city,
      state,
      apt,
      zipcode,
      mailingStreet,
      mailingApt,
      mailingCity,
      mailingState,
      mailingZipcode,
      numRetries
    );
  } catch (err) {
    console.error(err);
    return {};
  }

  // create an owner record
  try {
    createdOwnerId = await createOwnerWithRetries(createdPersonId, numRetries);
  } catch (err) {
    console.error(err);

    // if fail to create an owner record, rollback the created person
    await rollbackPersonWithRetries(createdPersonId, numRetries);

    return {};
  }

  // create a user login record
  try {
    createdUserLoginId = await createUserLoginWithRetries(
      createdPersonId,
      createdOwnerId,
      email,
      password,
      numRetries - 1
    );
    setLoginCookie(createdPersonId, fullName);
    return { createdOwnerId, createdPersonId, createdUserLoginId };
  } catch (err) {
    console.error(err);

    // if fail to create a User Login record, rollback the created person and owner
    await rollbackPersonWithRetries(createdPersonId, numRetries);
    await rollbackOwnerWithRetries(createdOwnerId, numRetries);

    return {};
  }
};

export {
  createPersonOwnerUserLoginRecord,
  rollbackPersonWithRetries,
  rollbackOwnerWithRetries
};
