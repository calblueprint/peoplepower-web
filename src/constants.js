const LOGIN_TOKEN_NAME = 'loginToken';

// AIRTABLE
const BASE_ID = 'appFaOwKhMXrRIQIp';
const ENDPOINT_URL = 'https://api.airtable.com';
const GRID_VIEW = 'Grid view';
const NUM_RECORDS = 1;

// TABLES
const PERSON_TABLE = 'Person';
const OWNER_TABLE = 'Owner';
const PROJECT_GROUP_TABLE = 'Project Group';
const SUBSCRIBER_BILL_TABLE = 'Subscriber Bill';
const PAYMENT_TABLE = 'Payment';
const USER_LOGIN_TABLE = 'User Login';

// TYPES
const SUBSCRIBER_OWNER = 'Subscriber';
const GENERAL_OWNER = 'General';

// PAYPAL PAYMENT TYPES
const BILL_PAYMENT_TYPE = 'Bill Payment';
const BUY_SHARES_TYPE = 'Buy Shares';

/**
 * TABLE FIELDS
 */

// OWNER AND USER LOGIN
const PERSON_FIELD = 'Person';

// USER LOGIN
const EMAIL_FIELD = 'Email';
const PASSWORD_FIELD = 'password';

// OWNER
const ADMIN_OF_FIELD = 'Admin Of';
const SUBSCRIBER_OWNER_FIELD = 'Subscriber Owner';
const SUBSCRIBER_BILL_FIELD = 'Subscriber Bill';
const OWNER_TYPE_FIELD = 'Owner Type';

export {
  BASE_ID,
  BILL_PAYMENT_TYPE,
  BUY_SHARES_TYPE,
  ENDPOINT_URL,
  GRID_VIEW,
  PERSON_TABLE,
  EMAIL_FIELD,
  PASSWORD_FIELD,
  OWNER_TABLE,
  OWNER_TYPE_FIELD,
  PROJECT_GROUP_TABLE,
  SUBSCRIBER_OWNER,
  SUBSCRIBER_OWNER_FIELD,
  SUBSCRIBER_BILL_TABLE,
  PAYMENT_TABLE,
  PERSON_FIELD,
  SUBSCRIBER_BILL_FIELD,
  GENERAL_OWNER,
  LOGIN_TOKEN_NAME,
  USER_LOGIN_TABLE,
  ADMIN_OF_FIELD,
  NUM_RECORDS
};
