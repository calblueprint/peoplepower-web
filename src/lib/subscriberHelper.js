import { getRecord, getRecordsFromAttribute } from './request';

// TABLES
const USER_LOGIN_TABLE = 'User Login';
const SUBSCRIBER_BILL_TABLE = 'Subscriber Bill';
const OWNER_TABLE = 'Owner';
const PERSON_TABLE = 'Person';

// FIELDS
const SUBSCRIBER_OWNER = 'Subscriber Owner';
const PERSON = 'Person';

const areDiffBills = (b1, b2) => {
  if (b1 === b2) return false;
  if (b1 === null || b2 === null) return true;
  if (b1.length !== b2.length) return true;

  for (let i = 0; i < b1.length; i += 1) {
    if (b1[i] !== b2[i]) {
      return true;
    }
  }

  return false;
};

const centsToDollars = cents => {
  return (cents / 100).toFixed(2);
};

// VALIDATION FUNCTIONS
const validateRecordAndField = record => {
  if (record == null) {
    throw Error('getRecord returned null');
  }
  if (record.record == null) {
    throw Error('record returned by getRecord has no field record');
  }
};

const validateUserLoginRecord = record => {
  validateRecordAndField(record);
  if (record.record.Person == null) {
    throw Error('record.record.Person of getRecord is null');
  }
  if (record.record.Person.length < 1) {
    throw Error('record.record.Person has length < 1');
  }
};

const validatePersonRecord = record => {
  validateRecordAndField(record);
  if (record.record.ID == null) {
    throw Error('record.record.ID of getRecord is null');
  }
};

const validateSubscriberOwnerRecord = res => {
  if (res == null) {
    throw Error('getRecordsFromAttribute returned null');
  }

  if (res.records == null) {
    throw Error(
      'result returned by getRecordsFromAttribute has no field records'
    );
  }

  if (res.records.length < 1) {
    throw Error('record.records has length < 1');
  }

  if (res.records[0] == null) {
    throw Error('res.records has no 0th item');
  }

  if (res.records[0].fields == null) {
    throw Error('res.records[0] has no field fields');
  }

  if (res.records[0].fields[SUBSCRIBER_OWNER] == null) {
    throw Error(`res.records[0] has no field ${SUBSCRIBER_OWNER}`);
  }
};

// throw an exception on error
const getUserFromLoginId = async loggedInUserId => {
  const record = await getRecord(USER_LOGIN_TABLE, loggedInUserId);
  validateUserLoginRecord(record);

  const personId = record.record.Person[0]; // TODO: potential null ptr exception
  const personRecord = await getRecord(PERSON_TABLE, personId);
  validatePersonRecord(personRecord);

  return personRecord.record.ID;
};

// throw an exception on error
const getSubscriberOwnerFromUser = async user => {
  const res = await getRecordsFromAttribute(OWNER_TABLE, PERSON, user);
  validateSubscriberOwnerRecord(res);
  return res.records[0].fields[SUBSCRIBER_OWNER];
};

const getSubscriberBills = async (loggedInUserId, callback) => {
  try {
    const user = await getUserFromLoginId(loggedInUserId);
    const ownerId = await getSubscriberOwnerFromUser(user);
    console.log('OWNER ID');
    console.log(ownerId);
    const res = await getRecordsFromAttribute(
      SUBSCRIBER_BILL_TABLE,
      SUBSCRIBER_OWNER,
      ownerId
    );
    const { records } = res;

    const bills = [];
    let isLatest = true;
    records.forEach(record => {
      bills.push({
        'Statement Date': record.fields['Statement Date'],
        'Start Date': record.fields['Start Date'],
        'End Date': record.fields['End Date'],
        'Rate Schedule': record.fields['Rate Schedule'],
        'Estimated Rebate': record.fields['Estimated Rebate'],
        'Total Estimated Rebate': record.fields['Total Estimated Rebate'],
        'Amount Due on Previous': record.fields['Amount Due on Previous'],
        'Amount Received Since Previous':
          record.fields['Amount Received Since Previous'],
        'Amount Due': record.fields['Amount Due'],
        'Is Latest': isLatest
      });
      isLatest = false;
    });

    callback(bills);
  } catch (err) {
    console.error(err);
    callback(null);
  }
};

export {
  areDiffBills,
  centsToDollars,
  getUserFromLoginId,
  getSubscriberOwnerFromUser,
  getSubscriberBills
};
