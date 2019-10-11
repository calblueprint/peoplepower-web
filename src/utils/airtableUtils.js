import Cookies from 'universal-cookie';
const cookies = new Cookies();

const APIKEY = ''; //PASS IN AS ENVIRONMENT VARIABLE
const BASE_ID = 'appFaOwKhMXrRIQIp';

const Airtable = require('airtable');
const base = new Airtable({apiKey: APIKEY}).base(BASE_ID);

const EMAIL_FIELD = 'Email';
const ID_FIELD = 'ID';
const PASSWORD_FIELD = 'Password';
const GRID_VIEW = "Grid view";
const NUM_RECORDS = 1;

const LOGIN_TOKEN_NAME = 'loginToken';

const table = 'User Login';

var loginUser = (email, passwordHash) => {
    return new Promise((resolve, reject) => {
        base(table).select({
            maxRecords: NUM_RECORDS,
            view: GRID_VIEW,
            filterByFormula: "({" + EMAIL_FIELD + "}='" + email + "')",
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            
            records.forEach(function(record) {
                let record_email = record.get(EMAIL_FIELD);
                if (record_email === email) {
                    if (record.get(PASSWORD_FIELD) === passwordHash) {
                        cookies.set(LOGIN_TOKEN_NAME, record.get(ID_FIELD));
                        resolve({match: true, found:true});
                        return;
                    } else {
                        resolve({match: false, found:true});
                    }
                } 
            });
            
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
            
        }, function done(err) {
            if (err) { 
                reject(err);
                return; 
            }
            resolve({match: false, found: false});
        });

    });
}

var isLoggedIn = email => {
    return cookies.get(LOGIN_TOKEN_NAME);
}

var logOut = () => {
    cookies.remove(LOGIN_TOKEN_NAME);
}

// export default loginUser;
export {loginUser, isLoggedIn, logOut };