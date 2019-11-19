import key from './api_key';
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
function getRecord(table, id) {
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

function getMultipleFromAttr(table, fieldType, field) {
  return new Promise((resolve, reject) => {
    base(table)
      .select({
        view: 'Grid view',
        maxRecords: 10,
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
          resolve(records);
        }
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
  getMultipleFromAttr,
  createPerson,
  createRecord,
  updatePerson,
  updateRecord
};
