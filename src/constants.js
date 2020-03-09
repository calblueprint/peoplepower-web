const constants = {
  LOGIN_TOKEN_NAME: 'loginToken',

  // TYPES
  SUBSCRIBER_OWNER: 'Subscriber',
  GENERAL_OWNER: 'General',

  // PAYPAL PAYMENT TYPES
  BILL_PAYMENT_TYPE: 'Bill Payment',
  BUY_SHARES_TYPE: 'Buy Shares',

  // TRANSACTION TYPES AND STATUS
  BILL_TYPE: 'Bill',
  ONLINE_PAYMENT_TYPE: 'Online Payment',
  COMPLETED_STATUS: 'Completed',
  PENDING_STATUS: 'Pending',

  // ROUTES
  HOME_ROUTE: '/',
  SIGNUP_ROUTE: '/onboarding',

  // BILL GENERATION
  BILL_GENERATION_URL: 'https://peoplepower-node.herokuapp.com/generate'
};

export default constants;
