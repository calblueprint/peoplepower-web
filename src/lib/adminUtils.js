import {
  getOwnerById,
  updateProjectGroup,
  getProjectGroupById
} from './airtable/request';

const getAdminTable = async owner => {
  const ownerOfArr = owner.adminOf;
  if (ownerOfArr && ownerOfArr.length === 1) {
    return ownerOfArr[0];
  }

  return -1;
};

// TODO: reevaluate this function.
// Can't the admin dashboard just deal in IDs instead of the actual objects?
const getOwnersFromProjectGroup = async projectGroupId => {
  const projectGroup = await getProjectGroupById(projectGroupId);

  const ownersObjects = await Promise.all(
    projectGroup.owner.map(ownerId => getOwnerById(ownerId))
  );

  // what is the point of this map??
  return ownersObjects.map(ownersObject => ownersObject);
};

const updateProjectGroupOwners = async (groupId, newOwners) => {
  return updateProjectGroup(groupId, {
    owner: newOwners
  });
};

export { getAdminTable, getOwnersFromProjectGroup, updateProjectGroupOwners };
