import { getPersonById } from './request';
import validatePersonRecord from './validator';

// throw an exception on error
const getOwnerIdFromPersonId = async loggedInUserId => {
  const personRecord = await getPersonById(loggedInUserId);
  validatePersonRecord(personRecord);
  return personRecord.Owner[0];
};

export default getOwnerIdFromPersonId;
