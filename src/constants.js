const constants = {
  LOGIN_TOKEN_NAME: 'loginToken',

  // TYPES
  SUBSCRIBER_OWNER: 'Subscriber',
  GENERAL_OWNER: 'General',

  // PAYPAL PAYMENT TYPES
  BILL_PAYMENT_TYPE: 'Bill Payment',
  BUY_SHARES_TYPE: 'Buy Shares',
  SHARE_PRICE: 100,
  MAX_SHARES: 10,

  // TRANSACTION TYPES AND STATUS
  BILL_TYPE: 'Bill',
  ONLINE_PAYMENT_TYPE: 'Online Payment',
  COMPLETED_STATUS: 'Completed',
  PENDING_STATUS: 'Pending',

  // ROUTES
  HOME_ROUTE: '/',
  SIGNUP_ROUTE: '/onboarding',

  // INVITE TYPES
  PLEDGE_INVITE_USED: 'Used',

  // BILL GENERATION
  BACKEND_URL: 'https://peoplepower-node.herokuapp.com',
  BILL_ACTIVE_STATUS: 'Active',
  TRANSACTION_DATE_FORMAT: 'M/DD/YYYY'
};

export default constants;
