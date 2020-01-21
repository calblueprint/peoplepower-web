import {
  createPersonOwnerUserLoginRecord,
  rollbackPersonWithRetries,
  rollbackOwnerWithRetries
} from '../../lib/onboarding/onboardingUtils';
import { deleteUserLogin } from '../../lib/airtable/request';

// Calls createPersonOwnerUserLoginRecord on dummy data
// verifies that the createPersonOwnerUserLoginRecord returns createdOwnerId, createdPersonId, createdUserLoginId
// TODO: doesn't check that records are actually created on Airtable
describe('createPersonOwnerUserLoginRecord function', () => {
  test('expect { createdOwnerId, createdPersonId, createdUserLoginId }', async () => {
    jest.setTimeout(10000);
    const {
      createdOwnerId,
      createdPersonId,
      createdUserLoginId
    } = await createPersonOwnerUserLoginRecord(
      'to_delete@pppower.com',
      'to_delete',
      '1111111111',
      'TO DELETE',
      'TO DELETE STREET',
      'TO DELETE APT',
      'TO DELETE CITY',
      'TO DELETE STATE',
      'TO DELETE ZIPCODE',
      'TO DELETE MAILING STREET',
      'TO DELETE MAILING APT',
      'TO DELETE MAILING CITY',
      'TO DELETE MAILING STATE',
      'TO DELETE MAILING ZIPCODE'
    );
    expect(createdOwnerId).not.toBe(undefined);
    expect(createdPersonId).not.toBe(undefined);
    expect(createdUserLoginId).not.toBe(undefined);

    await rollbackPersonWithRetries(createdPersonId);
    await rollbackOwnerWithRetries(createdOwnerId);

    // clean up
    const res = await deleteUserLogin(createdUserLoginId);
    expect(res).toStrictEqual({});
  });
});
