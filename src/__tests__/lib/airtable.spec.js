/* eslint no-restricted-imports: 0 */

import {
  createRecord,
  getAllRecords,
  getRecordById,
  getRecordsByAttribute,
  updateRecord,
  deleteRecord
} from '../../lib/airtable';

const RECORD_NOT_FOUND_ERR = 'Record not found';
const TEST_TABLE = 'Test (Development)';
const TEST_FIELD = 'Tag';
const TEST_TAG = '7_NuQ6a?';
const testId = 'rechutWysjm8RbJkq';

// the structures below are
// copies of records in Airtable.
// If different, Airtable is source of truth
const expectedTestResult = {
  ID: 'rechutWysjm8RbJkq',
  Name: 'TEST READ RECORD',
  Tag: TEST_TAG
};

const NUM_ENTRIES = 1;
const expectedTestResultsArr = [expectedTestResult];

const testNewRecord = {
  Name: 'TEST NEW RECORD',
  Tag: '83h)%uG9'
};

describe('consistency of test data', () => {
  test('expect true', async () => {
    expect(expectedTestResultsArr.length).toBe(NUM_ENTRIES);
  });
});

// Calls getAllRecords on the TEST_TABLE
// verifies that NUM_ENTRIES records are returned
// TODO: ensure the values in the array come back in the exact format we expect
describe('getAllRecords function', () => {
  test('expect resolve', async () => {
    const res = await getAllRecords(TEST_TABLE);
    expect(res.length).toBe(NUM_ENTRIES);
    expectedTestResultsArr.forEach((expectedRes, i) => {
      expect(res[i]).toStrictEqual(expectedRes);
    });
  });
});

// Calls getRecordsByAttribute on the TEST_TABLE, TEST_FIELD, and TEST_TAG
// verifies that getRecordsByAttribute returns the right record
describe('getRecordsByAttribute function', () => {
  test('expect resolve', async () => {
    const res = await getRecordsByAttribute(TEST_TABLE, TEST_FIELD, TEST_TAG);
    expect(res).toStrictEqual(expectedTestResultsArr);
  });
});

// Calls getRecordById on the TEST_TABLE and testId
// verifies that the getRecordById returns the right record
describe('getRecordById function', () => {
  test('expect resolve', async () => {
    const res = await getRecordById(TEST_TABLE, testId);
    expect(res).toStrictEqual(expectedTestResult);
  });
});

// Calls createRecord on the TEST_TABLE and testNewRecord. Then, calls deleteRecord on
// the TEST_TABLE and id
// verifies that the id is returned and res is equal to {}

// This test must run after the getRecordById test because it depends on getRecordById
// working correctly
describe('createRecord/updateRecord/deleteRecord functions', () => {
  test('expect resolve', async () => {
    jest.setTimeout(10000);
    let id;
    let res;
    // create record
    id = await createRecord(TEST_TABLE, testNewRecord);
    expect(id).not.toBe(null);

    // verifies that the right record has been created
    res = await getRecordById(TEST_TABLE, id);
    expect(res.Name).toStrictEqual(testNewRecord.Name);
    expect(res.Tag).toStrictEqual(testNewRecord.Tag);

    // update record
    const testUpdateRecord = {
      Name: testNewRecord.Name,
      Tag: testNewRecord.Tag
    };
    id = await updateRecord(TEST_TABLE, id, testUpdateRecord);
    expect(id).toStrictEqual(id);

    // verifies that the right record has been updated
    res = await getRecordById(TEST_TABLE, id);
    expect(res.Name).toStrictEqual(testNewRecord.Name);
    expect(res.Tag).toStrictEqual(testNewRecord.Tag);

    // delete record
    res = await deleteRecord(TEST_TABLE, id);
    expect(res).toStrictEqual({});

    try {
      res = await getRecordById(TEST_TABLE, id);
      throw new Error('Deleted record should not exist');
    } catch (err) {
      expect(err.message).toBe(RECORD_NOT_FOUND_ERR);
    }
  });
});
