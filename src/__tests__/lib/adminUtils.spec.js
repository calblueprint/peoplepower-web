import { updateProjectGroupOwners } from '../../lib/adminUtils';

const testGroupId = 'recxJehaSlKk8IiS9';
const testAdminId = 'reckNsjHnv0IpwN5M';
const testOwnerIdToAddBack = 'recu2EuvrrPYYG0T4';

describe('updateProjectGroupOwners function', () => {
  test('expect true', async () => {
    let res = await updateProjectGroupOwners(testGroupId, [testAdminId]);
    expect(res).toStrictEqual(testGroupId);
    res = await updateProjectGroupOwners(testGroupId, [
      testAdminId,
      testOwnerIdToAddBack
    ]);
    expect(res).toStrictEqual(testGroupId);
  });
});
