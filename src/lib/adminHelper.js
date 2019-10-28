import { getRecordWithPromise } from './request';

// TABLES
const PERSON_TABLE = 'Person';
const OWNER_TABLE = 'Owner';
const PROJECT_GROUP_TABLE = 'Project Group';

// FIELDS
const ADMIN_OF = 'Admin Of';

const getOwnerFromPerson = async personId => {
  const recordMap = await getRecordWithPromise(PERSON_TABLE, personId);
  const { record } = recordMap;
  const { Owner } = record;

  if (Owner.length !== 1) {
    throw new Error('Owner returned from person != 1');
  }

  return Owner[0];
};

const getAdminTable = async personId => {
  const ownerId = await getOwnerFromPerson(personId);
  const recordMap = await getRecordWithPromise(OWNER_TABLE, ownerId);
  const { record } = recordMap;

  const ownerOfArr = record[ADMIN_OF];
  if (ownerOfArr.length === 1) {
    return ownerOfArr[0];
  }

  return -1;
};

const getOwnersFromProjectGroup = async groupId => {
  const recordMap = await getRecordWithPromise(PROJECT_GROUP_TABLE, groupId);
  const { record } = recordMap;
  const { Owner } = record;

  const ownersObjects = await Promise.all(
    Owner.map(ownerId => getRecordWithPromise(OWNER_TABLE, ownerId))
  );
  return ownersObjects.map(ownersObject => ownersObject.record);
};

export { getAdminTable, getOwnersFromProjectGroup };
