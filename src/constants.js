export default {
  LOGIN_TOKEN_NAME: 'loginToken',

  // TYPES
  SUBSCRIBER_OWNER: 'Subscriber',
  GENERAL_OWNER: 'General',

  PAYPAL_TRANSACTION_FEE_FRACTION: 0.029,
  PAYPAL_TRANSACTION_FLAT_FEE_IN_DOLLARS: 0.3,

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
  TRANSACTION_DATE_FORMAT: 'M/DD/YYYY',

  // EQUIVALENCY DATA
  // Numbers and functions sourced from
  // https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references
  KWH_TO_COAL: energyInKwH =>
    (energyInKwH * 7.07 * 10 ** -4) / (9.08 * 10 ** -4),
  KWH_TO_TRASH_BAGS: energyInKwH =>
    (energyInKwH * 7.07 * 10 ** -4) / (2.35 * 10 ** -2),
  KWH_TO_VEHICLE_MILES: energyInKwH =>
    (energyInKwH * 7.07 * 10 ** -4) / (4.03 * 10 ** -4),

  // MISC
  BUG_REPORT_URL: 'https://airtable.com/shrY9otlnVK9gyfrl'
};
