import {
  getProjectGroupById,
  getAnnouncementsByProjectGroupId,
  getOwnerById,
  getSolarProjectsByIds
} from './airtable/request';
import { store } from './redux/store';
import {
  saveUserData,
  deauthenticateAndClearUserData,
  setLoadingForUserData
} from './redux/userDataSlice';
import {
  clearAnnouncements,
  saveAnnouncements,
  setLoadingForAnnouncements
} from './redux/communitySlice';
import { getCredentials } from './credentials';

// Function takes in an ownerId and fetches the latest owner object and all associated user data
const refreshUserData = async ownerId => {
  // Save loading status to Redux
  store.dispatch(setLoadingForUserData());
  store.dispatch(setLoadingForAnnouncements());

  // Fetch latest version of owner
  const owner = await getOwnerById(ownerId);

  // Fetch all the data

  let projectGroup = {};
  let announcements = [];
  let solarProjects = [];

  if (owner.projectGroupId) {
    projectGroup = await getProjectGroupById(owner.projectGroupId);
    announcements = await getAnnouncementsByProjectGroupId(projectGroup.id);

    const { solarProjectIds } = projectGroup;
    if (solarProjectIds) {
      solarProjects = await getSolarProjectsByIds(solarProjectIds);
    }
  }

  const credentials = getCredentials(owner);

  // Save fetched user data to the redux store
  const userData = {
    owner,
    projectGroup,
    solarProjects,
    credentials
  };
  store.dispatch(saveUserData(userData));

  // Refresh announcements data
  store.dispatch(clearAnnouncements());
  store.dispatch(saveAnnouncements(announcements));
};

const clearUserData = () => {
  store.dispatch(deauthenticateAndClearUserData());
  store.dispatch(clearAnnouncements());
};

export { refreshUserData, clearUserData };
