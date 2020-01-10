/* eslint no-restricted-imports: 0 */

import {
  createRecord,
  getAllRecords,
  getRecordById,
  getRecordsByAttribute,
  updateRecord,
  deleteRecord
} from '../../lib/airtable';

const TEST_TABLE = 'Test (Development)';
const TEST_FIELD = 'Tag';
const TEST_TAG = '7_NuQ6a?';
const NUM_ENTRIES = 1;
const testId = 'rechutWysjm8RbJkq';
const expectedTestResult = {
  ID: 'rechutWysjm8RbJkq',
  Name: 'TEST READ RECORD',
  Tag: TEST_TAG
};

const testNewRecord = {
  Name: 'TEST NEW RECORD',
  Tag: '83h)%uG9'
};

// Calls getRecordById on the TEST_TABLE and testId
// verifies that the getRecordById returns the right record
describe('getRecordById function', () => {
  test('expect resolve', async () => {
    const res = await getRecordById(TEST_TABLE, testId);
    expect(res).toStrictEqual(expectedTestResult);
  });
});

// Calls getAllRecords on the TEST_TABLE
// verifies that NUM_ENTRIES records are returned
// TODO: ensure the values in the array come back in the exact format we expect
describe('getAllRecords function', () => {
  test('expect resolve', async () => {
    const res = await getAllRecords(TEST_TABLE);
    expect(res.length).toBe(NUM_ENTRIES);
  });
});

// Calls getRecordsByAttribute on the TEST_TABLE, TEST_FIELD, and TEST_TAG
// verifies that result is not undefined
// TODO: doesn't actuallly check that the right record is returned
describe('getRecordsByAttribute function', () => {
  test('expect resolve', async () => {
    const res = await getRecordsByAttribute(TEST_TABLE, TEST_FIELD, TEST_TAG);
    expect(res).not.toBe(undefined);
  });
});

// Calls createRecord on the TEST_TABLE and testNewRecord. Then, calls deleteRecord on
// the TEST_TABLE and id
// verifies that the id is returned and res is equal to {}
// TODO: doesn't actually check that the record is created/destroyed on Airtable
describe('createRecord/deleteRecord function', () => {
  test('expect resolve', async () => {
    // create record
    const id = awt createRecord(TEST_TABLE, testNewRecord);
    expect(id).not.toBe(null);

    // delete record
    const res = await deleteRecord(TEST_TABLE, id);
    expect(res).toStrictEqual({});
  });
});

// Calls updateRecord on the TEST_TABLE, testId, and testUpdateRecord, then reverts the changes
// verifies that the updateRecord returns the right id
// TODO: doesn't actually check that the record is updated on Airtable
describe('updateRecord function', () => {
  // update record
  test('expect resolve', async () => {
    let testUpdateRecord = {
      Name: testNewRecord.Name,
      Tag: testNewRecord.Tag
    };
    let id = await updateRecord(TEST_TABLE, testId, testUpdateRecord);
    expect(id).toStrictEqual(testId);

    // revert updates
    testUpdateRecord = {
      Name: expectedTestResult.Name,
      Tag: expectedTestResult.Tag
    };
    id = await updateRecord(TEST_TABLE, testId, testUpdateRecord);
    expect(id).toStrictEqual(testId);
  });
});
