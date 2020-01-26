/* eslint no-restricted-imports: 0 */

/*
  THIS IS A GENERATED FILE
  Changes might be overwritten in the future, edit with caution!

  Wrapper functions around functions in airtable.js that interact with Airtable, designed
  to provide basic functionality

  If you're adding a new function: make sure you add a corresponding test (at least 1) for it in request.spec.js

*/

import { Tables, Columns } from './schema';
import {
  createRecord,
  updateRecord,
  getAllRecords,
  getRecordsByAttribute,
  getRecordById,
  deleteRecord
} from './airtable';

/*
 ******* CREATE RECORDS *******
 */

export const createPayment = async record => {
  return createRecord(Tables.Payment, record);
};

export const createOrganization = async record => {
  return createRecord(Tables.Organization, record);
};

export const createProjectGroup = async record => {
  return createRecord(Tables.ProjectGroup, record);
};

export const createPerson = async record => {
  return createRecord(Tables.Person, record);
};

export const createRateSchedule = async record => {
  return createRecord(Tables.RateSchedule, record);
};

export const createAddress = async record => {
  return createRecord(Tables.Address, record);
};

export const createTestDevelopment = async record => {
  return createRecord(Tables.TestDevelopment, record);
};

export const createSubscriberBill = async record => {
  return createRecord(Tables.SubscriberBill, record);
};

export const createAnnouncement = async record => {
  return createRecord(Tables.Announcement, record);
};

export const createPGEUsage = async record => {
  return createRecord(Tables.PGEUsage, record);
};

export const createPledgeInvite = async record => {
  return createRecord(Tables.PledgeInvite, record);
};

export const createSolarProject = async record => {
  return createRecord(Tables.SolarProject, record);
};

export const createUserLogin = async record => {
  return createRecord(Tables.UserLogin, record);
};

export const createOwner = async record => {
  return createRecord(Tables.Owner, record);
};

export const createGeneration = async record => {
  return createRecord(Tables.Generation, record);
};

/*
 ******* READ RECORDS *******
 */

export const getPaymentById = async id => {
  return getRecordById(Tables.Payment, id);
};

export const getAllPayments = async () => {
  return getAllRecords(Tables.Payment);
};

export const getOrganizationById = async id => {
  return getRecordById(Tables.Organization, id);
};

export const getAllOrganizations = async () => {
  return getAllRecords(Tables.Organization);
};

export const getProjectGroupById = async id => {
  return getRecordById(Tables.ProjectGroup, id);
};

export const getAllProjectGroups = async () => {
  return getAllRecords(Tables.ProjectGroup);
};

export const getPersonById = async id => {
  return getRecordById(Tables.Person, id);
};

export const getAllPersons = async () => {
  return getAllRecords(Tables.Person);
};

export const getRateScheduleById = async id => {
  return getRecordById(Tables.RateSchedule, id);
};

export const getAllRateSchedules = async () => {
  return getAllRecords(Tables.RateSchedule);
};

export const getAddressById = async id => {
  return getRecordById(Tables.Address, id);
};

export const getAllAddresss = async () => {
  return getAllRecords(Tables.Address);
};

export const getTestDevelopmentById = async id => {
  return getRecordById(Tables.TestDevelopment, id);
};

export const getAllTestDevelopments = async () => {
  return getAllRecords(Tables.TestDevelopment);
};

export const getSubscriberBillById = async id => {
  return getRecordById(Tables.SubscriberBill, id);
};

export const getAllSubscriberBills = async () => {
  return getAllRecords(Tables.SubscriberBill);
};

export const getAnnouncementById = async id => {
  return getRecordById(Tables.Announcement, id);
};

export const getAllAnnouncements = async () => {
  return getAllRecords(Tables.Announcement);
};

export const getAnnouncementsByProjectGroup = async value => {
  return getRecordsByAttribute(
    Tables.Announcement,
    Columns[Tables.Announcement].projectGroup,
    value
  );
};

export const getPGEUsageById = async id => {
  return getRecordById(Tables.PGEUsage, id);
};

export const getAllPGEUsages = async () => {
  return getAllRecords(Tables.PGEUsage);
};

export const getPledgeInviteById = async id => {
  return getRecordById(Tables.PledgeInvite, id);
};

export const getAllPledgeInvites = async () => {
  return getAllRecords(Tables.PledgeInvite);
};

export const getSolarProjectById = async id => {
  return getRecordById(Tables.SolarProject, id);
};

export const getAllSolarProjects = async () => {
  return getAllRecords(Tables.SolarProject);
};

export const getUserLoginById = async id => {
  return getRecordById(Tables.UserLogin, id);
};

export const getAllUserLogins = async () => {
  return getAllRecords(Tables.UserLogin);
};

export const getUserLoginsByEmail = async value => {
  return getRecordsByAttribute(
    Tables.UserLogin,
    Columns[Tables.UserLogin].email,
    value
  );
};

export const getOwnerById = async id => {
  return getRecordById(Tables.Owner, id);
};

export const getAllOwners = async () => {
  return getAllRecords(Tables.Owner);
};

export const getGenerationById = async id => {
  return getRecordById(Tables.Generation, id);
};

export const getAllGenerations = async () => {
  return getAllRecords(Tables.Generation);
};

/*
 ******* UPDATE RECORDS *******
 */

export const updatePayment = async (id, recordUpdates) => {
  return updateRecord(Tables.Payment, id, recordUpdates);
};

export const updateOrganization = async (id, recordUpdates) => {
  return updateRecord(Tables.Organization, id, recordUpdates);
};

export const updateProjectGroup = async (id, recordUpdates) => {
  return updateRecord(Tables.ProjectGroup, id, recordUpdates);
};

export const updatePerson = async (id, recordUpdates) => {
  return updateRecord(Tables.Person, id, recordUpdates);
};

export const updateRateSchedule = async (id, recordUpdates) => {
  return updateRecord(Tables.RateSchedule, id, recordUpdates);
};

export const updateAddress = async (id, recordUpdates) => {
  return updateRecord(Tables.Address, id, recordUpdates);
};

export const updateTestDevelopment = async (id, recordUpdates) => {
  return updateRecord(Tables.TestDevelopment, id, recordUpdates);
};

export const updateSubscriberBill = async (id, recordUpdates) => {
  return updateRecord(Tables.SubscriberBill, id, recordUpdates);
};

export const updateAnnouncement = async (id, recordUpdates) => {
  return updateRecord(Tables.Announcement, id, recordUpdates);
};

export const updatePGEUsage = async (id, recordUpdates) => {
  return updateRecord(Tables.PGEUsage, id, recordUpdates);
};

export const updatePledgeInvite = async (id, recordUpdates) => {
  return updateRecord(Tables.PledgeInvite, id, recordUpdates);
};

export const updateSolarProject = async (id, recordUpdates) => {
  return updateRecord(Tables.SolarProject, id, recordUpdates);
};

export const updateUserLogin = async (id, recordUpdates) => {
  return updateRecord(Tables.UserLogin, id, recordUpdates);
};

export const updateOwner = async (id, recordUpdates) => {
  return updateRecord(Tables.Owner, id, recordUpdates);
};

export const updateGeneration = async (id, recordUpdates) => {
  return updateRecord(Tables.Generation, id, recordUpdates);
};

/*
 ******* DELETE RECORDS *******
 */

export const deletePayment = async id => {
  return deleteRecord(Tables.Payment, id);
};
export const deleteOrganization = async id => {
  return deleteRecord(Tables.Organization, id);
};
export const deleteProjectGroup = async id => {
  return deleteRecord(Tables.ProjectGroup, id);
};
export const deletePerson = async id => {
  return deleteRecord(Tables.Person, id);
};
export const deleteRateSchedule = async id => {
  return deleteRecord(Tables.RateSchedule, id);
};
export const deleteAddress = async id => {
  return deleteRecord(Tables.Address, id);
};
export const deleteTestDevelopment = async id => {
  return deleteRecord(Tables.TestDevelopment, id);
};
export const deleteSubscriberBill = async id => {
  return deleteRecord(Tables.SubscriberBill, id);
};
export const deleteAnnouncement = async id => {
  return deleteRecord(Tables.Announcement, id);
};
export const deletePGEUsage = async id => {
  return deleteRecord(Tables.PGEUsage, id);
};
export const deletePledgeInvite = async id => {
  return deleteRecord(Tables.PledgeInvite, id);
};
export const deleteSolarProject = async id => {
  return deleteRecord(Tables.SolarProject, id);
};
export const deleteUserLogin = async id => {
  return deleteRecord(Tables.UserLogin, id);
};
export const deleteOwner = async id => {
  return deleteRecord(Tables.Owner, id);
};
export const deleteGeneration = async id => {
  return deleteRecord(Tables.Generation, id);
};
