import constants from '../../constants';
import { getRecord } from '../../lib/request';

const { PERSON_TABLE } = constants;

const inputResultMapping = {};
const TEST_PERSON_RECORD = 'recCxB46wmgbGEgi7';
inputResultMapping[TEST_PERSON_RECORD] = 'TEST - DO NOT DELETE';

describe('getRecord function', () => {
  test('expect resolve', async () => {
    const res = await getRecord(PERSON_TABLE, TEST_PERSON_RECORD);
    expect(res.record.ID).toBe(inputResultMapping[TEST_PERSON_RECORD]);
  });
});
