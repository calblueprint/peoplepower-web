import Cookies from 'universal-cookie';
import keys from './api_key';

const { key } = keys;

const cookies = new Cookies();

const BASE_ID = 'appFaOwKhMXrRIQIp';

const Airtable = require('airtable');

const base = new Airtable({ apiKey: key }).base(BASE_ID);

const EMAIL_FIELD = 'Email';
const PASSWORD_FIELD = 'password';
const GRID_VIEW = 'Grid view';
const NUM_RECORDS = 1;

const LOGIN_TOKEN_NAME = 'loginToken';

// tables
const USER_LOGIN_TABLE = 'User Login';
const PERSON_TABLE = 'Person';
const OWNER_TABLE = 'Owner';

const DEFAULT_NUM_RETRIES = 3;

const createPersonWithRetries = async (
  email,
  phoneNumber,
  fullName,
  street,
  city,
  state,
  apt,
  zipcode,
  numRetries
) => {
  // create a person record without an owner field nor user login field
  try {
    const createdPerson = await base(PERSON_TABLE).create([
      {
        fields: {
          Email: email,
          'Phone Number': phoneNumber,
          Name: fullName,
          Street: street,
          City: city,
          State: state,
          Apt: apt,
          Zipcode: zipcode
        }
      }
    ]);
    return createdPerson[0].id;
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
      numRetries - 1
    );
  }
};

const createOwnerWithRetries = async (createdPersonId, numRetries) => {
  try {
    const createdOwner = await base(OWNER_TABLE).create([
      {
        fields: {
          Person: [createdPersonId],
          'Owner Type': ['General']
        }
      }
    ]);
    return createdOwner[0].id;
  } catch (err) {
    if (numRetries === 0) {
      throw err;
    }

    return createOwnerWithRetries(createdPersonId, numRetries - 1);
  }
};

const createUserLoginWithRetries = async (
  createdPersonId,
  createdOwnerId,
  email,
  password,
  numRetries
) => {
  try {
    await base(USER_LOGIN_TABLE).create([
      {
        fields: {
          Person: [createdPersonId],
          Owner: [createdOwnerId],
          Email: email,
          password
        }
      }
    ]);
    return true;
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
    await base(PERSON_TABLE).destroy([createdPersonId]);
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
    await base(OWNER_TABLE).destroy([createdOwnerId]);
  } catch (err) {
    if (numRetries === 0) {
      console.error(`ATTENTION: ${err}`);

      // take any additional action here to notify admin to rectify inconsistency
    }
    await rollbackPersonWithRetries(createdOwnerId, numRetries - 1);
  }
};

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
  numRetries = DEFAULT_NUM_RETRIES
) => {
  // necessary IDs
  let createdPersonId;
  let createdOwnerId;

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
      numRetries
    );
  } catch (err) {
    console.error(err);
    return false;
  }

  // create an owner record
  try {
    createdOwnerId = await createOwnerWithRetries(createdPersonId, numRetries);
  } catch (err) {
    console.error(err);

    // if fail to create an owner record, rollback the created person
    await rollbackPersonWithRetries(createdPersonId, numRetries);

    return false;
  }

  // create a user login record
  try {
    return await createUserLoginWithRetries(
      createdPersonId,
      createdOwnerId,
      email,
      password,
      numRetries - 1
    );
  } catch (err) {
    console.error(err);

    // if fail to create a User Login record, rollback the created person and owner
    await rollbackPersonWithRetries(createdPersonId, numRetries);
    await rollbackOwnerWithRetries(createdOwnerId, numRetries);

    return false;
  }
};

const loginUser = (email, passwordHash) => {
  return new Promise((resolve, reject) => {
    base(USER_LOGIN_TABLE)
      .select({
        maxRecords: NUM_RECORDS,
        view: GRID_VIEW,
        filterByFormula: `({${EMAIL_FIELD}}='${email}')`
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          records.forEach(record => {
            const recordEmail = record.get(EMAIL_FIELD);
            if (recordEmail === email) {
              if (record.get(PASSWORD_FIELD) === passwordHash) {
                const personId = record.get('Person')[0];
                cookies.set(LOGIN_TOKEN_NAME, personId);
                resolve({ match: true, found: true });
              } else {
                resolve({ match: false, found: true });
              }
            }
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve({ match: false, found: false });
        }
      );
  });
};

const getLoggedInUserId = () => {
  return cookies.get(LOGIN_TOKEN_NAME);
};

const logOut = () => {
  cookies.remove(LOGIN_TOKEN_NAME);
};

// export default loginUser;
export {
  createPersonOwnerUserLoginRecord,
  loginUser,
  getLoggedInUserId,
  logOut
};
