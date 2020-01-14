import {
  getPersonById,
  getOwnerById,
  getUserLoginById
} from './airtable/request';
import validatePersonRecord from './validatorUtils';
import { Columns } from './airtable/schema';

// throw an exception on error
const getOwnerIdFromPersonId = async loggedInUserId => {
  const personRecord = await getPersonById(loggedInUserId);
  validatePersonRecord(personRecord);
  return personRecord.Owner[0];
};

// TODO: validate records fetched using validator functions
const fetchAllUserData = async personId => {
  const person = await getPersonById(personId);
  const ownerId = person[Columns.Person.Owner];
  const userLoginId = person[Columns.Person.UserLogin];

  const owner = await getOwnerById(ownerId);
  const userLogin = await getUserLoginById(userLoginId);
  return { person, owner, userLogin };
};

export { getOwnerIdFromPersonId, fetchAllUserData };
