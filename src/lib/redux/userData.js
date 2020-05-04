import {
  getProjectGroupById,
  getOwnerById,
  getSolarProjectsByIds,
  getAnnouncementsByIds
} from '../airtable/request';
import { store } from './store';
import {
  saveUserData,
  deauthenticateAndClearUserData,
  setLoadingForUserData,
  setLoading,
  unsetLoading
} from './userDataSlice';
import {
  clearAnnouncements,
  saveAnnouncements,
  setLoadingForAnnouncements
} from './communitySlice';

const setAppIsLoading = isLoading => {
  if (isLoading) {
    store.dispatch(setLoading());
  } else {
    store.dispatch(unsetLoading());
  }
};

// Function takes in an ownerId and fetches the latest owner object and all associated user data
const refreshUserData = async (ownerId, loadSilently = false) => {
  if (!loadSilently) {
    // Save loading status to Redux
    store.dispatch(setLoadingForUserData());
    store.dispatch(setLoadingForAnnouncements());
  }

  // Fetch latest version of owner
  const owner = await getOwnerById(ownerId);

  // Fetch all the data

  let projectGroup = {};
  let announcements = [];
  let solarProjects = [];

  if (owner.projectGroupId) {
    projectGroup = await getProjectGroupById(owner.projectGroupId);
    announcements = await getAnnouncementsByIds(
      projectGroup.announcementIds || []
    );

    const { solarProjectIds } = projectGroup;
    if (solarProjectIds) {
      solarProjects = await getSolarProjectsByIds(solarProjectIds);
    }
  }

  // Save fetched user data to the redux store
  const userData = {
    owner,
    projectGroup,
    solarProjects
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

const startLoading = () => {
  store.dispatch(setLoadingForUserData());
};

export { refreshUserData, clearUserData, startLoading, setAppIsLoading };
