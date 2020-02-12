import {
  getSolarProjectById,
  getProjectGroupById,
  getAnnouncementsByProjectGroupId,
  getOwnerById
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

// TODO: validate records fetched using validator functions
// This function takes in a userLogin record
// (because the Login logic already looks up the user login record)
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
      const solarProjectPromises = solarProjectIds.map(id =>
        getSolarProjectById(id)
      );

      solarProjects = await Promise.all(solarProjectPromises);
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
