import {
  createPerson,
  createUserLogin,
  deletePerson,
  getAllProjectGroups,
  getAnnouncementsByProjectGroup,
  getUserLoginsByEmail,
  getPersonById,
  getOwnerById,
  getProjectGroupById,
  getSubscriberBillById,
  getSolarProjectById,
  updateSubscriberBill,
  updateOwner,
  updatePerson,
  updateUserLogin,
  createOwner,
  deleteOwner,
  deleteUserLogin
} from '../../lib/airtable/request';

const testPerson = 'recaUqFEg1nI91hyi';
const testOwner = 'reckNsjHnv0IpwN5M';
const testProjectGroup = 'recxJehaSlKk8IiS9';
const testSubscriberBill = 'recBd7TIFJfjh2k7U';
const testSolarProject = 'rec9BemtHIasDI2aQ';
const testUserLogin = 'recMc8BUEWE5gIP7f';
const testEmail = 'sample@peoplepower.com';

const billFieldToModify = 'balance';
const newBalance = 1999;
const oldBalance = 1996;
const testNewSubscriberBill = {};
testNewSubscriberBill[billFieldToModify] = newBalance;

const personFieldToModify = 'name';
const newPersonName = 'NEW PERSON';
const oldPersonName = 'SAMPLE PERSON';
const testNewPerson = {};
testNewPerson[personFieldToModify] = newPersonName;

const ownerFieldToModify = 'numberOfShares';
const newNumberOfShares = 99;
const oldNumberOfShares = 1;
const testNewOwner = {};
testNewOwner[ownerFieldToModify] = newNumberOfShares;

const userLoginFieldToModify = 'email';
const newEmail = 'new_sample@peoplepower.com';
const oldEmail = 'sample@peoplepower.com';
const testNewUserLogin = {};
testNewUserLogin[userLoginFieldToModify] = newEmail;

const nameMap = {};
nameMap[testPerson] = 'name';
nameMap[testOwner] = 'person';
nameMap[testProjectGroup] = 'name';
nameMap[testSubscriberBill] = 'balance';
nameMap[testSolarProject] = 'name';

const expectedResultsMap = {};
expectedResultsMap[testPerson] = 'SAMPLE PERSON';
expectedResultsMap[testOwner] = ['recaUqFEg1nI91hyi'];
expectedResultsMap[testProjectGroup] = 'SAMPLE PROJECT GROUP';
expectedResultsMap[testSubscriberBill] = 1996;
expectedResultsMap[testSolarProject] = 'SAMPLE SOLAR PROJECT';

const testPersonToCreate = {
  email: 'new_person@pppower.com',
  phoneNumber: '1111111111',
  name: 'NEW PERSON',
  street: 'NEW PERSON STREET',
  city: 'NEW PERSON CITY',
  state: 'NEW PERSON STATE',
  apt: 'NEW PERSON APT',
  zipcode: 'NEW PERSON ZIPCODE',
  onboardingStep: 6,
  mailingStreet: 'NEW PERSON MAILING STREET',
  mailingApt: 'NEW PERSON MAILING APT',
  mailingCity: 'NEW PERSON MAILING CITY',
  mailingState: 'NEW PERSON MAILING STATE',
  mailingZipcode: 'NEW PERSON MAILING ZIPCODE'
};

const testOwnerToCreate = {
  ownerType: ['General', 'Subscriber']
};

const testUserLoginToCreate = {
  email: 'new_person@pppower.com',
  password: 'apple_jacks'
};

// the describe(...) clause the function being tested
// the test(...) claus describes the expected behavior

describe('getAllProjectGroups function', () => {
  test('expect list of all project groups', async () => {
    const res = await getAllProjectGroups();
    expect(res.length).not.toBe(undefined);
  });
});

describe('getAnnouncementsByProjectGroup function', () => {
  test('expect list of announcements', async () => {
    const res = await getAnnouncementsByProjectGroup(testProjectGroup);
    expect(res.length).not.toBe(undefined);
  });
});

describe('getUserLoginsByEmail function', () => {
  test('expect list of users', async () => {
    const res = await getUserLoginsByEmail(testEmail);
    expect(res.length).not.toBe(undefined);
  });
});

describe('getPersonById function', () => {
  test('expect person record', async () => {
    const res = await getPersonById(testPerson);
    expect(res).not.toBe(undefined);

    const key = nameMap[testPerson];
    const value = expectedResultsMap[testPerson];
    expect(res[key]).toStrictEqual(value);
  });
});

describe('getOwnerById function', () => {
  test('expect owner record', async () => {
    const res = await getOwnerById(testOwner);
    expect(res).not.toBe(undefined);

    const key = nameMap[testOwner];
    const value = expectedResultsMap[testOwner];
    expect(res[key]).toStrictEqual(value);
  });
});

describe('getProjectGroupById function', () => {
  test('expect project group record', async () => {
    const res = await getProjectGroupById(testProjectGroup);
    expect(res).not.toBe(undefined);

    const key = nameMap[testProjectGroup];
    const value = expectedResultsMap[testProjectGroup];
    expect(res[key]).toStrictEqual(value);
  });
});

describe('getSubscriberBillById function', () => {
  test('expect subscriber bill record', async () => {
    const res = await getSubscriberBillById(testSubscriberBill);
    expect(res).not.toBe(undefined);

    const key = nameMap[testSubscriberBill];
    const value = expectedResultsMap[testSubscriberBill];
    expect(res[key]).toStrictEqual(value);
  });
});

describe('getSolarProjectById function', () => {
  test('expect solar project record', async () => {
    const res = await getSolarProjectById(testSolarProject);
    expect(res).not.toBe(undefined);

    const key = nameMap[testSolarProject];
    const value = expectedResultsMap[testSolarProject];
    expect(res[key]).toStrictEqual(value);
  });
});

describe('updateSubscriberBill function', () => {
  test('expect id of updated bill', async () => {
    let res = await updateSubscriberBill(
      testSubscriberBill,
      testNewSubscriberBill
    );
    expect(res).toBe(testSubscriberBill);

    const testOldBill = {};
    testOldBill[billFieldToModify] = oldBalance;

    res = await updateSubscriberBill(testSubscriberBill, testOldBill);
    expect(res).toBe(testSubscriberBill);
  });
});

describe('updatePerson function', () => {
  test('expect id of updated person', async () => {
    let res = await updatePerson(testPerson, testNewPerson);
    expect(res).toBe(testPerson);

    const testOldPerson = {};
    testOldPerson[personFieldToModify] = oldPersonName;

    res = await updatePerson(testPerson, testOldPerson);
    expect(res).toBe(testPerson);
  });
});

describe('updateOwner function', () => {
  test('expect id of updated owner', async () => {
    let res = await updateOwner(testOwner, testNewOwner);
    expect(res).toBe(testOwner);
    const testOldOwner = {};
    testOldOwner[ownerFieldToModify] = oldNumberOfShares;

    res = await updateOwner(testOwner, testOldOwner);
    expect(res).toBe(testOwner);
  });
});

describe('updateUserLogin function', () => {
  test('expect id of updated user login', async () => {
    let res = await updateUserLogin(testUserLogin, testNewUserLogin);
    expect(res).toBe(testUserLogin);

    const testOldUserLogin = {};
    testOldUserLogin[userLoginFieldToModify] = oldEmail;

    res = await updateUserLogin(testUserLogin, testOldUserLogin);
    expect(res).toBe(testUserLogin);
  });
});

describe('createPerson/deletePerson function', () => {
  test('expect id of created person and {} after deletion', async () => {
    // create person
    const id = await createPerson(testPersonToCreate);
    expect(id).not.toBe(null);

    // delete person
    const res = await deletePerson(id);
    expect(res).toStrictEqual({});
  });
});

describe('createOwner/deleteOwner function', () => {
  test('expect id of created owner and {} after deletion', async () => {
    // create owner
    const id = await createOwner(testOwnerToCreate);
    expect(id).not.toBe(null);

    // delete owner
    const res = await deleteOwner(id);
    expect(res).toStrictEqual({});
  });
});

describe('createUserLogin/deleteUserLogin function', () => {
  test('expect id of created user login and {} after deletion', async () => {
    // create owner
    const id = await createUserLogin(testUserLoginToCreate);
    expect(id).not.toBe(null);

    // delete owner
    const res = await deleteUserLogin(id);
    expect(res).toStrictEqual({});
  });
});
