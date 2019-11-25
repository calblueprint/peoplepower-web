import Cookies from 'universal-cookie';
import keys from './api_key';

const { key } = keys;

const cookies = new Cookies();

const BASE_ID = 'appFaOwKhMXrRIQIp';

const Airtable = require('airtable');

const base = new Airtable({ apiKey: key }).base(BASE_ID);

const EMAIL_FIELD = 'Email';
const PASSWORD_FIELD = 'Password';
const GRID_VIEW = 'Grid view';
const NUM_RECORDS = 1;

const LOGIN_TOKEN_NAME = 'loginToken';

// tables
const USER_LOGIN_TABLE = 'User Login';
const PERSON_TABLE = 'Person';
const OWNER_TABLE = 'Owner';

const createPersonOwnerUserLoginRecord = async (
  email,
  password,
  phoneNumber,
  fullName,
  street,
  apt,
  city,
  state,
  zipcode
) => {
  // create a person record without an owner field nor user login field
  let createdPersonId;
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
    createdPersonId = createdPerson[0].id;
  } catch (err) {
    console.error(err);
    return false;
  }

  // create an owner record
  let createdOwnerId;
  try {
    const createdOwner = await base(OWNER_TABLE).create([
      {
        fields: {
          Person: [createdPersonId]
          // "Owner Type": [  // TODO: how do we determine owner type at this point? @aivantg
          //   "General",
          //   "Subscriber"
          // ],
        }
      }
    ]);
    createdOwnerId = createdOwner[0].id;
  } catch (err) {
    console.error(err);
    return false;
  }

  // create a user login record
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
    console.error(err);
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
