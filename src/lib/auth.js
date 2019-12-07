import Cookies from 'universal-cookie';
import secret from './secret';

const { key } = secret;

const cookies = new Cookies();

const BASE_ID = 'appFaOwKhMXrRIQIp';

const Airtable = require('airtable');

const base = new Airtable({ apiKey: key }).base(BASE_ID);

const EMAIL_FIELD = 'Email';
const PASSWORD_FIELD = 'password';
const GRID_VIEW = 'Grid view';
const NUM_RECORDS = 1;

const LOGIN_TOKEN_NAME = 'loginToken';

const table = 'User Login';

const loginUser = (email, passwordHash) => {
  return new Promise((resolve, reject) => {
    base(table)
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

export { loginUser, getLoggedInUserId, logOut };
