import {
  getPersonById,
  getOwnerById,
  getSolarProjectById,
  getProjectGroupById,
  getAnnouncementsByProjectGroup
} from './airtable/request';
import { store } from './redux/store';
import {
  saveUserData,
  deauthenticateAndClearUserData,
  fetchUserData
} from './redux/userDataSlice';
import {
  clearAnnouncements,
  saveAnnouncements,
  fetchAnnouncements
} from './redux/communitySlice';
import { applyCredentials } from './credentials';

// TODO: validate records fetched using validator functions
const refreshUserData = async userLogin => {
  // Save loading status to Redux
  store.dispatch(fetchUserData());
  store.dispatch(fetchAnnouncements());

  // Fetch all the data

  const owner = await getOwnerById(userLogin.owner);
  const person = await getPersonById(userLogin.person);

  const projectGroup = await getProjectGroupById(owner.projectGroup);
  const announcements = await getAnnouncementsByProjectGroup(
    owner.projectGroup
  );

  let solarProjects = [];
  const solarProjectIds = projectGroup.solarProject;
  if (solarProjectIds) {
    const solarProjectPromises = solarProjectIds.map(id =>
      getSolarProjectById(id)
    );

    solarProjects = await Promise.all(solarProjectPromises);
  }

  const credentials = await applyCredentials(owner);

  // Save fetched user data to the redux store
  const userData = {
    userLogin,
    person,
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
