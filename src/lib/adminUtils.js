import {
  getOwnerById,
  updateProjectGroup,
  getProjectGroupById
} from './airtable/request';
import { Columns } from './airtable/schema';

const getAdminTable = async owner => {
  const ownerOfArr = owner[Columns.Owner.AdminOf];
  if (ownerOfArr && ownerOfArr.length === 1) {
    return ownerOfArr[0];
  }

  return -1;
};

// TODO: reevaluate this function.
// Can't the admin dashboard just deal in IDs instead of the actual objects?
const getOwnersFromProjectGroup = async projectGroupId => {
  const projectGroup = await getProjectGroupById(projectGroupId);
  const { Owner } = projectGroup;

  const ownersObjects = await Promise.all(
    Owner.map(ownerId => getOwnerById(ownerId))
  );

  // what is the point of this map??
  return ownersObjects.map(ownersObject => ownersObject);
};

const updateProjectGroupOwners = async (groupId, newOwners) => {
  return updateProjectGroup(groupId, {
    Owner: newOwners
  });
};

export { getAdminTable, getOwnersFromProjectGroup, updateProjectGroupOwners };
