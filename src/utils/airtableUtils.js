let Airtable = require('airtable');
let base = new Airtable({apiKey: 'keynBwo2mtqgvUUy4'}).base('appFaOwKhMXrRIQIp');

let EMAIL_FIELD = 'Email';
let PASSWORD_FIELD = 'Password';
let GRID_VIEW = "Grid view";
let NUM_RECORDS = 1;

let table = 'User Login';

module.exports.loginUser = (username, passwordHash) => {
    return new Promise((resolve, reject) => {
        base(table).select({
            // Selecting the first 3 records in Grid view:
            maxRecords: NUM_RECORDS,
            view: GRID_VIEW,
            // filterByFormula: ,
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            
            records.forEach(function(record) {
                // console.log("I RAN");
                let name = record.get(EMAIL_FIELD);
                if (name === username) {
                    if (record.get(PASSWORD_FIELD) === passwordHash) {
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

// let username = 'Joshua Goh';
// let table = 'Table 1';
// loginUser(table, username, '222').then(function({item, found}) {
//     //do something
//     if (found) {
//         console.log(item);
//     } else {
//         console.log("not found");
//     }
// }).catch(function(item) {
//     console.log("ccaught");
// });

