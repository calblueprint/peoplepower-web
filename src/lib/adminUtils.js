import {
  updateProjectGroup,
  getProjectGroupById,
  getOwnerById
} from './airtable/request';
import { refreshUserData } from './userDataUtils';
import { store } from './redux/store';

export async function removeOwner(owner) {
  const projectGroup = await getProjectGroupById(owner.projectGroupId);

  const newOwnerIds = projectGroup.ownerIds.filter(id => id !== owner.id);

  await updateProjectGroup(projectGroup.id, {
    ownerIds: newOwnerIds
  });

  // Refresh local copy of data after updating owners
  const { owner: loggedInOwner } = store.getState().userData;
  await refreshUserData(loggedInOwner);
}

export function getOwnerRecordsForProjectGroup(projectGroup) {
  const ownerPromises = projectGroup.ownerIds.map(getOwnerById);
  return Promise.all(ownerPromises);
}
