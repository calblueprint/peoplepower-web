import {
  getPersonById,
  getOwnerById,
  getSolarProjectById,
  getProjectGroupById,
  getAnnouncementsByProjectGroup
} from './airtable/request';
import { store } from './redux/store';
import { Columns } from './airtable/schema';
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
import { applyCredentials } from './credentials';

// TODO: validate records fetched using validator functions
// This function takes in a userLogin record
// (because the Login logic already looks up the user login record)
const refreshUserData = async userLogin => {
  // Save loading status to Redux
  store.dispatch(setLoadingForUserData());
  store.dispatch(setLoadingForAnnouncements());

  // Fetch all the data
  const ownerId = userLogin[Columns.UserLogin.Owner];
  const personId = userLogin[Columns.UserLogin.Person];

  const owner = await getOwnerById(ownerId);
  const person = await getPersonById(personId);

  const projectGroupId = owner[Columns.Owner.ProjectGroup];
  const projectGroup = await getProjectGroupById(projectGroupId);
  const announcements = await getAnnouncementsByProjectGroup(projectGroupId);

  let solarProjects = [];
  const solarProjectIds = projectGroup[Columns.ProjectGroup.SolarProject];
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
