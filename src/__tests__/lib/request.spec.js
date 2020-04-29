// TODO: tests after airlock
// import {
//   getAllProjectGroups,
//   getAnnouncementsByProjectGroupId,
//   getOwnerById,
//   getProjectGroupById,
//   // getSubscriberBillById,
//   getSolarProjectById,
//   // updateSubscriberBill,
//   getOwnersByEmail,
//   updateOwner,
//   createOwner,
//   deleteOwner
// } from '../../lib/airtable/request';

// const testOwner = 'recG1RskfrRXd1RgS';
// const testProjectGroup = 'recxJehaSlKk8IiS9';
// const testSubscriberBill = 'recBd7TIFJfjh2k7U';
// const testSolarProject = 'rec9BemtHIasDI2aQ';
// const testEmail = 'sample@peoplepower.com';

// const billFieldToModify = 'balance';
// const newBalance = 1999;
// // const oldBalance = 1996;
// const testNewSubscriberBill = {};
// testNewSubscriberBill[billFieldToModify] = newBalance;

// const ownerFieldToModify = 'numberOfShares';
// const newNumberOfShares = 99;
// const oldNumberOfShares = 1;
// const testNewOwner = {};
// testNewOwner[ownerFieldToModify] = newNumberOfShares;

// const nameMap = {};
// nameMap[testOwner] = 'firstName';
// nameMap[testProjectGroup] = 'name';
// nameMap[testSubscriberBill] = 'balance';
// nameMap[testSolarProject] = 'name';

// const expectedResultsMap = {};
// expectedResultsMap[testOwner] = 'Test';
// expectedResultsMap[testProjectGroup] = 'SAMPLE PROJECT GROUP';
// expectedResultsMap[testSubscriberBill] = 1996;
// expectedResultsMap[testSolarProject] = 'SAMPLE SOLAR PROJECT';

// // const testPersonToCreate = {
// //   email: 'new_person@pppower.com',
// //   phoneNumber: '1111111111',
// //   name: 'NEW PERSON',
// //   street: 'NEW PERSON STREET',
// //   city: 'NEW PERSON CITY',
// //   state: 'NEW PERSON STATE',
// //   apt: 'NEW PERSON APT',
// //   zipcode: 'NEW PERSON ZIPCODE',
// //   onboardingStep: 6,
// //   mailingStreet: 'NEW PERSON MAILING STREET',
// //   mailingApt: 'NEW PERSON MAILING APT',
// //   mailingCity: 'NEW PERSON MAILING CITY',
// //   mailingState: 'NEW PERSON MAILING STATE',
// //   mailingZipcode: 'NEW PERSON MAILING ZIPCODE'
// // };

// const testOwnerToCreate = {
//   ownerTypes: ['General', 'Subscriber']
// };

// // const testUserLoginToCreate = {
// //   email: 'new_person@pppower.com',
// //   password: 'apple_jacks'
// // };

// // the describe(...) clause the function being tested
// // the test(...) claus describes the expected behavior

// describe('getAllProjectGroups function', () => {
//   test('expect list of all project groups', async () => {
//     const res = await getAllProjectGroups();
//     expect(res.length).not.toBe(undefined);
//   });
// });

// describe('getAnnouncementsByProjectGroup function', () => {
//   test('expect list of announcements', async () => {
//     const res = await getAnnouncementsByProjectGroupId(testProjectGroup);
//     expect(res.length).not.toBe(undefined);
//   });
// });

// describe('getOwnersByEmail function', () => {
//   test('expect list of users', async () => {
//     const res = await getOwnersByEmail(testEmail);
//     expect(res.length).not.toBe(undefined);
//   });
// });

// describe('getOwnerById function', () => {
//   test('expect owner record', async () => {
//     const res = await getOwnerById(testOwner);
//     expect(res).not.toBe(undefined);

//     const key = nameMap[testOwner];
//     const value = expectedResultsMap[testOwner];
//     expect(res[key]).toStrictEqual(value);
//   });
// });

// describe('getProjectGroupById function', () => {
//   test('expect project group record', async () => {
//     const res = await getProjectGroupById(testProjectGroup);
//     expect(res).not.toBe(undefined);

//     const key = nameMap[testProjectGroup];
//     const value = expectedResultsMap[testProjectGroup];
//     expect(res[key]).toStrictEqual(value);
//   });
// });

// // describe('getSubscriberBillById function', () => {
// //   test('expect subscriber bill record', async () => {
// //     const res = await getSubscriberBillById(testSubscriberBill);
// //     expect(res).not.toBe(undefined);

// //     const key = nameMap[testSubscriberBill];
// //     const value = expectedResultsMap[testSubscriberBill];
// //     expect(res[key]).toStrictEqual(value);
// //   });
// // });

// describe('getSolarProjectById function', () => {
//   test('expect solar project record', async () => {
//     const res = await getSolarProjectById(testSolarProject);
//     expect(res).not.toBe(undefined);

//     const key = nameMap[testSolarProject];
//     const value = expectedResultsMap[testSolarProject];
//     expect(res[key]).toStrictEqual(value);
//   });
// });

// // describe('updateSubscriberBill function', () => {
// //   test('expect id of updated bill', async () => {
// //     let res = await updateSubscriberBill(
// //       testSubscriberBill,
// //       testNewSubscriberBill
// //     );
// //     expect(res).toBe(testSubscriberBill);

// //     const testOldBill = {};
// //     testOldBill[billFieldToModify] = oldBalance;

// //     res = await updateSubscriberBill(testSubscriberBill, testOldBill);
// //     expect(res).toBe(testSubscriberBill);
// //   });
// // });

// describe('updateOwner function', () => {
//   test('expect id of updated owner', async () => {
//     let res = await updateOwner(testOwner, testNewOwner);
//     expect(res).toBe(testOwner);
//     const testOldOwner = {};
//     testOldOwner[ownerFieldToModify] = oldNumberOfShares;

//     res = await updateOwner(testOwner, testOldOwner);
//     expect(res).toBe(testOwner);
//   });
// });

// describe('createOwner/deleteOwner function', () => {
//   test('expect id of created owner and {} after deletion', async () => {
//     // create owner
//     const id = await createOwner(testOwnerToCreate);
//     expect(id).not.toBe(null);

//     // delete owner
//     const res = await deleteOwner(id);
//     expect(res).toStrictEqual({});
//   });
// });
