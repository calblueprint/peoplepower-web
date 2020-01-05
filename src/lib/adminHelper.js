import { getRecord } from './request';
import constants from '../constants';

const {
  BASE_ID,
  PERSON_TABLE,
  OWNER_TABLE,
  PROJECT_GROUP_TABLE,
  ADMIN_OF_FIELD
} = constants;

const Airtable = require('airtable');

const base = Airtable.base(BASE_ID);

const getOwnerFromPerson = async personId => {
  const recordMap = await getRecord(PERSON_TABLE, personId);
  const { record } = recordMap;
  const { Owner } = record;

  if (Owner && Owner.length !== 1) {
    throw new Error('Owner returned from person != 1');
  }

  return Owner[0];
};

const getAdminTable = async ownerId => {
  const recordMap = await getRecord(OWNER_TABLE, ownerId);
  const { record } = recordMap;

  const ownerOfArr = record[ADMIN_OF_FIELD];
  if (ownerOfArr && ownerOfArr.length === 1) {
    return ownerOfArr[0];
  }

  return -1;
};

const getOwnersFromProjectGroup = async groupId => {
  const recordMap = await getRecord(PROJECT_GROUP_TABLE, groupId);
  const { record } = recordMap;
  const { Owner } = record;

  const ownersObjects = await Promise.all(
    Owner.map(ownerId => getRecord(OWNER_TABLE, ownerId))
  );
  return ownersObjects.map(ownersObject => ownersObject.record);
};

const removeOwnerFromProjectGroup = async (id, newOwners) => {
  return new Promise((resolve, reject) => {
    base(PROJECT_GROUP_TABLE).update(
      [
        {
          id,
          fields: {
            Owner: newOwners
          }
        }
      ],
      function(err) {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(true);
      }
    );
  });
};

export {
  getAdminTable,
  getOwnersFromProjectGroup,
  getOwnerFromPerson,
  removeOwnerFromProjectGroup
};
