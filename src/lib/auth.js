import Cookies from 'universal-cookie';
import constants from '../constants';
import { getPersonById, getUserLoginsByEmail } from './airtable/request';
import { Columns } from './airtable/schema';

const { LOGIN_TOKEN_NAME } = constants;

const cookies = new Cookies();

const setLoginCookie = (id, name) => {
  cookies.set(LOGIN_TOKEN_NAME, { id, name });
};

const loginUser = async (email, passwordHash) => {
  const records = await getUserLoginsByEmail(email);
  if (records.length !== 1) {
    return new Error(
      `Unexpected number ${records.length} of users found for ${email}`
    );
  }

  const record = records[0];
  if (record[Columns.UserLogin.Password] === passwordHash) {
    const personId = record[Columns.UserLogin.Person][0];
    const personRecord = await getPersonById(personId);
    const { Name: name } = personRecord;

    setLoginCookie(personId, name);
    return { match: true, found: true };
  }

  return { match: false, found: true };
};

const getLoggedInUserId = () => {
  const cookie = cookies.get(LOGIN_TOKEN_NAME);
  if (!cookie) {
    return undefined;
  }

  return cookie.id;
};

const getLoggedInUserName = () => {
  const cookie = cookies.get(LOGIN_TOKEN_NAME);
  if (!cookie) {
    return undefined;
  }

  return cookie.name;
};

const logOut = () => {
  cookies.remove(LOGIN_TOKEN_NAME);
};

export {
  loginUser,
  setLoginCookie,
  getLoggedInUserId,
  getLoggedInUserName,
  logOut
};
