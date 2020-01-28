import { updateProjectGroup, getProjectGroupById } from './airtable/request';
import { refreshUserData } from './userDataUtils';
import { store } from './redux/store';

export default async function removeOwner(ownerRecord) {
  const projectGroupId = ownerRecord.projectGroup;
  const projectGroup = await getProjectGroupById(projectGroupId);

  const newOwners = projectGroup.owner.filter(
    ownerId => ownerId !== ownerRecord.ownerId
  );

  await updateProjectGroup(projectGroup.id, {
    owner: newOwners
  });

  // Download latest data, including new project group info
  const { userLogin } = store.getState().userData;
  await refreshUserData(userLogin);
}
