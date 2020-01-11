import {
  getPersonById,
  getOwnerById,
  getProjectGroupById,
  updateProjectGroup
} from './request';
import { Columns } from './schema';

const getOwnerFromPerson = async personId => {
  const { Owner } = await getPersonById(personId);

  if (Owner && Owner.length !== 1) {
    throw new Error('Owner returned from person != 1');
  }

  return Owner[0];
};

const getAdminTable = async ownerId => {
  const owner = await getOwnerById(ownerId);

  const ownerOfArr = owner[Columns.Owner.AdminOf];
  if (ownerOfArr && ownerOfArr.length === 1) {
    return ownerOfArr[0];
  }

  return -1;
};

const getOwnersFromProjectGroup = async groupId => {
  const { Owner } = await getProjectGroupById(groupId);

  const ownersObjects = await Promise.all(
    Owner.map(ownerId => getOwnerById(ownerId))
  );
  return ownersObjects.map(ownersObject => ownersObject);
};

const updateProjectGroupOwners = async (groupId, newOwners) => {
  return updateProjectGroup(groupId, {
    Owner: newOwners
  });
};

export {
  getAdminTable,
  getOwnersFromProjectGroup,
  getOwnerFromPerson,
  updateProjectGroupOwners
};
