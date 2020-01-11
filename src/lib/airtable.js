/* eslint no-restricted-imports: 0 */

/*
  Helper functions that makes airtable API calls directly

  Not meant to be called directly by functions outside of request.js

  If you're adding a new function: make sure you add a corresponding test (at least 1) for it in airtable.spec.js
*/

import Airtable from 'airtable';
import constants from '../constants';

const { BASE_ID, ENDPOINT_URL, GRID_VIEW } = constants;

const key = process.env.REACT_APP_AIRTABLE_API_KEY;

// API KEY will reside in ENV variables later.
Airtable.configure({
  endpointUrl: ENDPOINT_URL,
  apiKey: key
});

const base = Airtable.base(BASE_ID);

// ******** CRUD ******** //
// Given a table and a record object, create a record on Airtable.
function createRecord(table, record) {
  return new Promise(function(resolve, reject) {
    base(table).create([{ fields: record }], function(err, records) {
      if (err) {
        reject(err);
        return;
      }

      const expectedLen = 1;
      if (records.length !== expectedLen) {
        reject(
          new Error(
            `${records.length} records returned from creating 1 record. Expected: ${expectedLen}`
          )
        );
        return;
      }

      resolve(records[0].getId());
    });
  });
}

// TODO(dfangshuo): pagination?
// TODO(dfangshuo): current implementation only fetches the first page
function getAllRecords(table) {
  return new Promise(function(resolve, reject) {
    base(table)
      .select({
        view: GRID_VIEW
      })
      .eachPage(
        function page(records, fetchNextPage) {
          if (records === null || records.length < 1) {
            const msg = `No record was retrieved using this ${table}.`;
            reject(msg);
            return;
          }

          resolve(records.map(record => record.fields));

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          }
        }
      );
  });
}

// Given a table and record ID, return the associated record object using a Promise.
function getRecordById(table, id) {
  return new Promise(function(resolve, reject) {
    base(table).find(id, function(err, record) {
      if (err) {
        reject(err);
        return;
      }

      resolve(record.fields);
    });
  });
}

// TODO(dfangshuo): current implementation only returns the first page
/*
  Given the desired table, field type (column), and field ('nick wong' or 'aivant@pppower.io'),
  return the associated record object.
*/
function getRecordsByAttribute(table, fieldType, field) {
  return new Promise(function(resolve, reject) {
    base(table)
      .select({
        view: GRID_VIEW,
        filterByFormula: `{${fieldType}}='${field}'`
      })
      .firstPage((err, records) => {
        if (err) {
          reject(err);
          return;
        }
        if (!records || records.length < 1) {
          console.log(`No record was retrieved using this ${fieldType}.`);
          reject(new Error(`No record was retrieved using this ${fieldType}.`));
          return;
        }

        resolve(records.map(record => record.fields));
      });
  });
}

// Given a table and a record object, update a record on Airtable.
function updateRecord(table, id, updatedRecord) {
  return new Promise(function(resolve, reject) {
    base(table).update(
      [
        {
          id,
          fields: updatedRecord
        }
      ],
      function(err, records) {
        if (err) {
          reject(err);
          return;
        }

        const expectedLen = 1;
        if (records.length !== expectedLen) {
          reject(
            new Error(
              `${records.length} records returned from creating 1 record. Expected: ${expectedLen}`
            )
          );
          return;
        }

        resolve(records[0].id); // TODO(dfangshuo)
      }
    );
  });
}

function deleteRecord(table, id) {
  return new Promise(function(resolve, reject) {
    base(table).destroy([id], function(err, deletedRecords) {
      if (err) {
        reject(err);
        return;
      }
      const expectedLen = 1;
      if (deletedRecords.length !== expectedLen) {
        reject(
          new Error(
            `${deletedRecords.length} records returned from deleting ${expectedLen} record(s). Expected: ${expectedLen}`
          )
        );
        return;
      }

      resolve(deletedRecords[0].fields);
    });
  });
}

export {
  createRecord,
  getAllRecords,
  getRecordById,
  getRecordsByAttribute,
  updateRecord,
  deleteRecord
};
