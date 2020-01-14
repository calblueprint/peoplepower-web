import { getUserLoginsByEmail } from './airtable/request';
import { Columns } from './airtable/schema';
import { store } from './redux/store';
import { authenticate } from './redux/userDataSlice';
import { refreshUserData, clearUserData } from './userDataUtils';

const loginUser = async (email, passwordHash) => {
  const records = await getUserLoginsByEmail(email);

  if (records.length > 1) {
    // Todo: We could/should ultimately try and handle this case smoothly
    // This error case represents a database structure issue, but it
    // doesn't have to cause a frontend error realistically
    return new Error(
      `Unexpected number ${records.length} of users found for ${email}`
    );
  }

  if (records.length === 0) {
    return { match: false, found: false };
  }

  const userLogin = records[0];
  if (userLogin[Columns.UserLogin.Password] === passwordHash) {
    // TODO: Replace with airlock auth token.
    // For now we can access airtable without restriction
    const key = 'temp_token';

    // Save key to redux store
    store.dispatch(authenticate(key));
    refreshUserData(userLogin);
    return { match: true, found: true };
  }

  return { match: false, found: true };
};

const logOut = () => {
  clearUserData();
};

export { loginUser, logOut };
