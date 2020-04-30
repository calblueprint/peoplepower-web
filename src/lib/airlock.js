import { getOwnersByEmail } from './airtable/request';
import { base, toAirtableFormat } from './airtable/airtable';
import { refreshUserData, clearUserData } from './userDataUtils';
import { Tables } from './airtable/schema';

const AUTHENTICATION_ERR_STRING = 'AUTHENTICATION_REQUIRED';

// Given a table and a record object, create a record on Airtable.
const createUserWithAirlock = (email, password, record) => {
  const transformedRecord = toAirtableFormat(record, Tables.Owner);
  return base.register({
    username: email,
    password,
    fields: transformedRecord
  });
};

const loginUser = async (email, password) => {
  try {
    const res = await base.login({ username: email, password });
    // failed to authenticate
    if (!res.body.success) {
      return { match: false, found: false };
    }

    const records = await getOwnersByEmail(email);
    if (records.length > 1) {
      // TODO: We could/should ultimately try and handle this case smoothly
      // This error case represents a database structure issue, but it
      // doesn't have to cause a frontend error realistically
      return new Error(
        `Unexpected number ${records.length} of users found for ${email}`
      );
    }
    // no such user exists
    if (records.length === 0) {
      return { match: false, found: false };
    }

    const owner = records[0];
    refreshUserData(owner.id);
    return { match: true, found: true };
  } catch (err) {
    if (err.error === AUTHENTICATION_ERR_STRING) {
      return { match: false, found: true };
    }
    console.warn(err);
    return { match: false, found: false };
  }
};

const logOut = async () => {
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

export { loginUser, logOut, createUserWithAirlock };
