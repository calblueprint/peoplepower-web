const constants = {
  LOGIN_TOKEN_NAME: 'loginToken',

  // AIRTABLE
  BASE_ID: 'appFaOwKhMXrRIQIp',
  ENDPOINT_URL: 'https://api.airtable.com',
  GRID_VIEW: 'Grid view',
  NUM_RECORDS: 1,

  // TABLES
  PERSON_TABLE: 'Person',
  OWNER_TABLE: 'Owner',
  PROJECT_GROUP_TABLE: 'Project Group',
  SUBSCRIBER_BILL_TABLE: 'Subscriber Bill',
  PAYMENT_TABLE: 'Payment',
  USER_LOGIN_TABLE: 'User Login',

  // TYPES
  SUBSCRIBER_OWNER: 'Subscriber',
  GENERAL_OWNER: 'General',

  // PAYPAL PAYMENT TYPES
  BILL_PAYMENT_TYPE: 'Bill Payment',
  BUY_SHARES_TYPE: 'Buy Shares',

  /**
   * TABLE FIELDS
   */

  // OWNER AND USER LOGIN
  PERSON_FIELD: 'Person',

  // USER LOGIN
  EMAIL_FIELD: 'Email',
  PASSWORD_FIELD: 'password',

  // OWNER
  ADMIN_OF_FIELD: 'Admin Of',
  SUBSCRIBER_OWNER_FIELD: 'Subscriber Owner',
  SUBSCRIBER_BILL_FIELD: 'Subscriber Bill',
  OWNER_TYPE_FIELD: 'Owner Type'
};

export default constants;
