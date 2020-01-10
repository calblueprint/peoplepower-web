/* eslint no-restricted-imports: 0 */

/*

  Wrapper functions around functions in airtable.js that interact with Airtable, designed
  to provide basic functionality

  If you're adding a new function: make sure you add a corresponding test (at least 1) for it in request.spec.js

*/

import constants from '../constants';
import {
  createRecord,
  updateRecord,
  getAllRecords,
  getRecordsByAttribute,
  getRecordById,
  deleteRecord
} from './airtable';

const {
  ANNOUNCEMENT_TABLE,
  EMAIL_FIELD,
  OWNER_TABLE,
  SUBSCRIBER_BILL_TABLE,
  USER_LOGIN_TABLE,
  PAYMENT_TABLE,
  PERSON_TABLE,
  PROJECT_GROUP_FIELD,
  PROJECT_GROUP_TABLE,
  SOLAR_PROJECT_TABLE
} = constants;

/*
 ****** READ RECORDS *******
 */

const getAllProjectGroups = async () => {
  return getAllRecords(PROJECT_GROUP_TABLE);
};

const getAnnouncementsForProjectGroup = async projectGroup => {
  return getRecordsByAttribute(
    ANNOUNCEMENT_TABLE,
    PROJECT_GROUP_FIELD,
    projectGroup
  );
};

const getPersonById = async id => {
  return getRecordById(PERSON_TABLE, id);
};

const getOwnerById = async id => {
  return getRecordById(OWNER_TABLE, id);
};

const getUserLoginsByEmail = async email => {
  return getRecordsByAttribute(USER_LOGIN_TABLE, EMAIL_FIELD, email);
};

const getProjectGroupById = async id => {
  return getRecordById(PROJECT_GROUP_TABLE, id);
};

const getSubscriberBillById = async id => {
  return getRecordById(SUBSCRIBER_BILL_TABLE, id);
};

const getSolarProjectById = async id => {
  return getRecordById(SOLAR_PROJECT_TABLE, id);
};

/*
 ******** CREATE RECORDS ********

  EXAMPLE OBJECT TO CREATE A PERSON:
    {
      "Email": email,
      "Phone Number": phoneNumber,
      "Owner": [owner],
      "Address": [address],
      "Tags": tags,
      "User Login": [userLogin],
      "Name": name
    }

    Make sure linked records are represented as an array:
    "Owner": [recsnkM5ms2NJhVW0]
  */

// Given a person object, create a record of that person.
function createPerson(record) {
  return createRecord(PERSON_TABLE, record);
}

function createOwner(record) {
  return createRecord(OWNER_TABLE, record);
}

function createUserLogin(record) {
  return createRecord(USER_LOGIN_TABLE, record);
}

function createPaymentRecord(record) {
  return createRecord(PAYMENT_TABLE, record);
}

function createAnnouncementRecord(record) {
  return createRecord(ANNOUNCEMENT_TABLE, record);
}

/*
 ******* UPDATE RECORDS *******
 */
function updateBill(id, updatedBill) {
  return updateRecord(SUBSCRIBER_BILL_TABLE, id, updatedBill);
}

function updatePerson(id, updatedPerson) {
  return updateRecord(PERSON_TABLE, id, updatedPerson);
}

function updateOwner(id, updatedOwner) {
  return updateRecord(OWNER_TABLE, id, updatedOwner);
}

function updateProjectGroup(id, updatedProjectGroup) {
  return updateRecord(PROJECT_GROUP_TABLE, id, updatedProjectGroup);
}

function updateUserLogin(id, newLogin) {
  return updateRecord(USER_LOGIN_TABLE, id, newLogin);
}

/*
 ******* DELETE RECORDS *******
 */

function deletePerson(personId) {
  return deleteRecord(PERSON_TABLE, personId);
}

function deleteOwner(ownerId) {
  return deleteRecord(OWNER_TABLE, ownerId);
}

function deleteUserLogin(userLoginId) {
  return deleteRecord(USER_LOGIN_TABLE, userLoginId);
}

export {
  createPerson,
  createAnnouncementRecord,
  createPaymentRecord,
  createOwner,
  createUserLogin,
  deletePerson,
  deleteOwner,
  deleteUserLogin,
  getAllProjectGroups,
  getAnnouncementsForProjectGroup,
  getPersonById,
  getProjectGroupById,
  getOwnerById,
  getSubscriberBillById,
  getSolarProjectById,
  getUserLoginsByEmail,
  updatePerson,
  updateOwner,
  updateProjectGroup,
  updateBill,
  updateUserLogin
};
