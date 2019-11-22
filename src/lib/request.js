/* 
  Helper functions intended to streamline our requests to the AirTable API. 
*/

import secret from '../secret';

const { key } = secret;

const Airtable = require('airtable');

// API KEY will reside in ENV variables later.
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: key
});

const base = Airtable.base('appFaOwKhMXrRIQIp');

// ******** READ RECORDS ******** //

// Given a table and record ID, return the associated record object using a Promise.
function getRecord(table, id) {
  return new Promise((resolve, reject) => {
    base(table).find(id, (err, record) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ record: record.fields });
    });
  });
}

/* 
  GENERAL SEARCH
  Given the desired table, field type (column), and field ('nick wong' or 'aivant@pppower.io'), 
  return the associated record object.
*/
function getRecordFromAttribute(table, fieldType, field) {
  return new Promise((resolve, reject) => {
    base(table)
      .select({
        view: 'Grid view',
        maxRecords: 1,
        filterByFormula: `{${fieldType}}='${field}'`
      })
      .firstPage(function(err, records) {
        if (err) {
          reject(err);
        }
        if (records === null || records.length < 1) {
          const msg = `No record was retrieved using this ${fieldType}.`;
          reject(msg);
        } else {
          records.forEach(function(record) {
            resolve(record.fields);
            return record;
          });
        }
      });
  });
}

/* 
	******** CREATE RECORDS ********
  You can create a person record using the `create` method with the Airtable API.
  It looks like this:

    base('Person').create([person], function callback(err, records) {))

	You can pass in UP TO 10 person record objects into the array parameter `person`. 
  The `person` variable should look like the example below.
  
  EXAMPLE OBJECT TO CREATE A PERSON: 
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

    Make sure linked records are represented as an array:
    "Owner": [recsnkM5ms2NJhVW0]
  */

// Given a person object, create a record of that person.
function createPerson(person) {
  return new Promise((resolve, reject) => {
    base('Person').create([person], function(err, records) {
      if (err) {
        reject(err);
        return;
      }
      records.forEach(function(record) {
        resolve(record.getId());
      });
    });
  });
}

// Given a table and a record object, create a record on Airtable.
function createRecord(table, record) {
  return new Promise((resolve, reject) => {
    base(table).create([record], function(err, records) {
      if (err) {
        reject(err);
        return;
      }
      records.forEach(function(r) {
        resolve(r.getId());
      });
    });
  });
}

/* 
	******** UPDATE RECORDS ********
  When updating methods, you can either use the `update` or `replace` method. It looks like this:

    base('Person').update([updatedPerson], function callback(err, records) {}) 
      or 
    base('Person').replace([replacedPerson], function callback(err, records) {})

	Using `update` will only update the fields you specify, leaving the rest as they were. 
	Using `replace` will perform a destructive update and clear all unspecified cell values. 

	- Max 10 records to be updated/replaced per call.
    - Depends on how many records you put in `[updatedPerson]`
	- Each obj should have an ID key and a fields key.

  NOTE! Make sure linked records are represented as an array:
  "Owner": [recsnkM5ms2NJhVW0]

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
  return new Promise((resolve, reject) => {
    base('Person').update([updatedPerson], function(err, records) {
      if (err) {
        reject(err);
        return;
      }
      records.forEach(function(record) {
        resolve(record.get('Name'));
      });
    });
  });
}

// Given a table and a record object, update a record on Airtable.
function updateRecord(table, updatedRecord) {
  return new Promise((resolve, reject) => {
    base(table).update([updatedRecord], function(err, records) {
      if (err) {
        reject(err);
        return;
      }
      records.forEach(function(record) {
        resolve(record.get('ID'));
      });
    });
  });
}

export {
  getRecord,
  getRecordFromAttribute,
  createPerson,
  createRecord,
  updatePerson,
  updateRecord
};
