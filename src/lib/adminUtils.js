import {
  updateProjectGroup,
  getProjectGroupById,
  getOwnerById
} from './airtable/request';
import { refreshUserData } from './userDataUtils';
import { store } from './redux/store';

export async function removeOwner(ownerRecord) {
  const projectGroupId = ownerRecord.projectGroup;
  const projectGroup = await getProjectGroupById(projectGroupId);

  const newOwners = projectGroup.owner.filter(
    ownerId => ownerId !== ownerRecord.ownerId
  );

  await updateProjectGroup(projectGroup.id, {
    owners: newOwners
  });

  // Refresh local copy of data after updating owners
  const { userLogin } = store.getState().userData;
  await refreshUserData(userLogin);
}

export function getOwnerRecordsForProjectGroup(projectGroup) {
  const ownerPromises = projectGroup.owners.map(getOwnerById);
  return Promise.all(ownerPromises);
}
