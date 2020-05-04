import { base, toAirtableFormat } from '../airtable/airtable';
import { refreshUserData, clearUserData } from '../redux/userData';
import { Tables } from '../airtable/schema';

const AUTHENTICATION_ERR_STRING = 'AUTHENTICATION_REQUIRED';

// Given a table and a record object, create a record on Airtable.
const signupUser = async (email, password, record) => {
  const transformedRecord = toAirtableFormat(record, Tables.Owner);
  const res = await base.register({
    username: email,
    password,
    fields: transformedRecord
  });
  return res.body.user.id;
};

// Log in a user given email and password
const loginUser = async (email, password) => {
  try {
    const res = await base.login({ username: email, password });
    // failed to authenticate
    if (!res.body.success) {
      return { match: false, found: false };
    }
    refreshUserData(res.body.user.id);
    return { match: true, found: true };
  } catch (err) {
    if (err.error === AUTHENTICATION_ERR_STRING) {
      return { match: false, found: true };
    }
    console.warn(err);
    return { match: false, found: false };
  }
};

// Log a user out and clear their user data
const logoutUser = async () => {
  try {
    const res = await base.logout();
    if (!res.body.success) {
      return false;
    }
    clearUserData();
    return true;
  } catch (error) {
    console.warn(error);
    return false;
  }
};

export { loginUser, logoutUser, signupUser };
