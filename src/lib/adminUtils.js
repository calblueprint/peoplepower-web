import {
  updateProjectGroup,
  getProjectGroupById,
  createPledgeInvite,
  getOwnersByIds
} from './airtable/request';
import { refreshUserData } from './userDataUtils';
import { store } from './redux/store';
import constants from '../constants';

export async function removeOwner(owner) {
  const projectGroup = await getProjectGroupById(owner.projectGroupId);

  const newOwnerIds = projectGroup.ownerIds.filter(id => id !== owner.id);

  await updateProjectGroup(projectGroup.id, {
    ownerIds: newOwnerIds
  });

  // Refresh local copy of data after updating owners
  const { owner: loggedInOwner } = store.getState().userData;
  await refreshUserData(loggedInOwner.id);
}

export async function getOwnerRecordsForProjectGroup(projectGroup) {
  const allOwners = await getOwnersByIds(projectGroup.ownerIds);

  // Ensure onboarding users aren't considered
  return allOwners.filter(o => o.onboardingStep === -1);
}

export async function inviteMember(pledgeInvite) {
  return createPledgeInvite(pledgeInvite);
}

export async function triggerEmail(pledgeInviteId) {
  try {
    const emailInvite = await fetch(`${constants.BACKEND_URL}/invite`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pledgeInviteId
      })
    });

    const emailResponse = await emailInvite.json();
    const { status } = emailResponse;
    return status;
  } catch (err) {
    return 'error';
  }
}
