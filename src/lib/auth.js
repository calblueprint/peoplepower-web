import Cookies from 'universal-cookie';
import secret from '../secret';
import {
  BASE_ID,
  LOGIN_TOKEN_NAME,
  EMAIL_FIELD,
  PASSWORD_FIELD,
  PERSON_FIELD,
  USER_LOGIN_TABLE,
  GRID_VIEW,
  NUM_RECORDS
} from '../constants';

const { key } = secret;

const cookies = new Cookies();

const Airtable = require('airtable');

const base = new Airtable({ apiKey: key }).base(BASE_ID);

const setLoginCookie = id => {
  cookies.set(LOGIN_TOKEN_NAME, id);
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
                console.log(record);
                const personId = record.get(PERSON_FIELD)[0];
                setLoginCookie(personId);
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

export { loginUser, setLoginCookie, getLoggedInUserId, logOut };
