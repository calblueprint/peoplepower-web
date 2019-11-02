import secret from '../secret';

const { key } = secret;
/* Helper functions intended to streamline our requests to the AirTable API. */

const Airtable = require('airtable');

// API KEY will reside in ENV variables later.
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: key
});

const base = Airtable.base('appFaOwKhMXrRIQIp');

// ******** READ RECORDS ******** //

// Given a table and record ID, return the associated record object using a Promise.
function getRecordWithPromise(table, id) {
  return new Promise((resolve, reject) => {
    base(table).find(id, (err, record) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('Retrieved', record.get('ID'), record.fields);
      resolve({ record: record.fields });
    });
  });
}

// Given a table and record ID, return the associated record object.
function getRecord(table, id) {
  base(table).find(id, function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Retrieved', record.get('ID'), record.fields);
  });
}

/* 
	GENERAL SEARCH
	Given the desired table, field type (column), and field ('nick wong' or 'aivant@pppower.io'), 
	return the associated record object.
*/
function getRecordsFromAttribute(table, fieldType, field) {
  return new Promise((resolve, reject) => {
    console.log(`Searching for ${field}`);
    base(table)
      .select({
        view: 'Grid view',
        filterByFormula: `{${fieldType}}='${field}'`
      })
      .firstPage(function(err, records) {
        if (err) {
          console.error(err);
          reject(err);
        }
        if (records.length < 1) {
          console.log(`No record was retrieved using this ${fieldType}.`);
          reject(new Error(`No record was retrieved using this ${fieldType}.`));
        }

        resolve({ records });
        // records.forEach(function(record) {
        // 	console.log('Retrieved', record.fields);
        // 	return record
        // });
      });
  });
}

/* 
	******** CREATE RECORDS ********
	You can pass in UP TO 10 record objects. Each obj should have one key, fields,
 	contailing all cell values by field name. Linked records are represented as an array of IDs.
 */

// Given a person object, create a record of that person.
function createPerson(person) {
  /* EXAMPLE OBJECT TO CREATE PERSON
	{
		"fields": {
		  "Email": email,
		  "Phone Number": phoneNumber,
		  "Owner": [owner],
		  "Address": [address],
		  "Tags": tags,
		  "User Login": [userLogin],
		  "Name": name
		}
	} 
*/

  base('Person').create([person], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function(record) {
      console.log(
        `Successfully created ${record.get(
          'Name'
        )} (${record.getId()})'s record.`
      );
    });
  });
}

/* 
	******** UPDATE RECORDS ********
	An UPDATE will only update the fields you specify, leaving the rest as they were. 
	A REPLACE will perform a destructive update and clear all unspecified cell values. 

	- Max 10 records to be updated at once.
	- Each obj should have an ID key and a fields key.

	EXAMPLE UPDATE OBJECT TO PASS INTO updatePerson():
	// {
	//   "id": "recfnsL4HDoNHril6",
	//   "fields": {
	//     "Email": "nickwong@berkeley.edu",
	//     "Phone Number": "(504) 123-4567",
	//     "Owner": [
	//       "recsnkM5ms2NJhVW0"
	//     ],
	//     "Address": [
	//       "reci2wCQQ5HnL5r4A"
	//     ],
	//     "Tags": 112,
	//     "User Login": [
	//       "rec9ycakLxIUbTLef"
	//     ],
	//     "Name": "Nick Wong"
	//   }
	// }
*/

function updatePerson(updatedPerson) {
  base('Person').update([updatedPerson], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function(record) {
      console.log(record.get('Email'));
    });
  });
}

export {
  getRecord,
  createPerson,
  updatePerson,
  getRecordsFromAttribute,
  getRecordWithPromise
};
