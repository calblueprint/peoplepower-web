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

describe('getRecordById function', () => {
  test('expect resolve', async () => {
    const res = await getRecordById(TEST_TABLE, testId);
    expect(res).toStrictEqual(expectedTestResult);
  });
});

describe('getAllRecords function', () => {
  test('expect resolve', async () => {
    const res = await getAllRecords(TEST_TABLE);
    expect(res.length).toBe(NUM_ENTRIES);
  });
});

describe('getRecordsByAttribute function', () => {
  test('expect resolve', async () => {
    const res = await getRecordsByAttribute(TEST_TABLE, TEST_FIELD, TEST_TAG);
    expect(res).not.toBe(undefined);
  });
});

describe('createRecord/deleteRecord function', () => {
  test('expect resolve', async () => {
    // create record
    const id = await createRecord(TEST_TABLE, testNewRecord);
    expect(id).not.toBe(null);

    // delete record
    const res = await deleteRecord(TEST_TABLE, id);
    expect(res).toStrictEqual({});
  });
});

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
