import Cookies from 'universal-cookie';
import constants from '../constants';
import { getUserLoginsByEmail } from './request';
import { Columns } from './schema';

const { LOGIN_TOKEN_NAME } = constants;

const cookies = new Cookies();

const setLoginCookie = id => {
  cookies.set(LOGIN_TOKEN_NAME, id);
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
    console.log(record);
    const personId = record[Columns.UserLogin.Person][0];
    setLoginCookie(personId);
    return { match: true, found: true };
  }

  return { match: false, found: true };
};

const getLoggedInUserId = () => {
  return cookies.get(LOGIN_TOKEN_NAME);
};

const logOut = () => {
  cookies.remove(LOGIN_TOKEN_NAME);
};

export { loginUser, setLoginCookie, getLoggedInUserId, logOut };
