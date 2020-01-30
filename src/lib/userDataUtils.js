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
const refreshUserData = async userLogin => {
  // Save loading status to Redux
  store.dispatch(setLoadingForUserData());
  store.dispatch(setLoadingForAnnouncements());

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

  const credentials = getCredentials(owner);

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
