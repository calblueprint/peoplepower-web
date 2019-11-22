import Cookies from 'universal-cookie';

const cookies = new Cookies();

const BASE_ID = 'appFaOwKhMXrRIQIp';

const Airtable = require('airtable');

Airtable.configure({
  endpointUrl: 'https://airlock-ppsolar.calblueprint.org/',
  apiKey: 'airlock'
});

const base = new Airtable().base(BASE_ID);

// const EMAIL_FIELD = 'Email';
// const PASSWORD_FIELD = 'Password';
// const GRID_VIEW = 'Grid view';
// const NUM_RECORDS = 1;

const LOGIN_TOKEN_NAME = 'loginToken';

// const table = 'User Login';

const registerUser = async (email, password) => {
  base.register({
    username: email,
    password
  });
};

const loginUser = async (email, passwordHash) => {
  try {
    const { user, token } = await base.login({
      username: email,
      password: passwordHash
    });
    console.log('SEE ME');
    console.log(user);
    console.log(token);
  } catch (err) {
    console.error(err);
  }
};

const getLoggedInUserId = () => {
  return cookies.get(LOGIN_TOKEN_NAME);
};

const logOut = () => {
  cookies.remove(LOGIN_TOKEN_NAME);
};

// export default loginUser;
export { loginUser, registerUser, getLoggedInUserId, logOut };
