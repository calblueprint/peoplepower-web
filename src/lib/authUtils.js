import { getOwnersByEmail } from './airtable/request';
import { base } from './airtable/airtable';
import { store } from './redux/store';
import { authenticate } from './redux/userDataSlice';
import { refreshUserData, clearUserData } from './userDataUtils';

const loginUser = async (email, passwordHash) => {
  console.log(await base.login({ username: email, password: passwordHash }));
  const records = await getOwnersByEmail(email);
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

  const owner = records[0];
  if (owner.password === passwordHash) {
    // TODO: Replace with airlock auth token.
    // For now we can access airtable without restriction
    const key = 'temp_token';

    // Save key to redux store
    store.dispatch(authenticate(key));
    refreshUserData(owner.id);
    return { match: true, found: true };
  }

  return { match: false, found: true };
};

const logOut = () => {
  clearUserData();
};

export { loginUser, logOut };
