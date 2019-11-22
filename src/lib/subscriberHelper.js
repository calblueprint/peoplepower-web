import { createRecord, getRecord, getRecordsFromAttribute } from './request';

// TABLES
const SUBSCRIBER_BILL_TABLE = 'Subscriber Bill';
const OWNER_TABLE = 'Owner';
const PERSON_TABLE = 'Person';
const PAYMENT_TABLE = 'Payment';

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
const getOwnerIdFromId = async loggedInUserId => {
  const personRecord = await getRecord(PERSON_TABLE, loggedInUserId);
  validatePersonRecord(personRecord);
  return personRecord.record.Owner[0];
};

const getBillsFromOwnerId = async ownerId => {
  const owner = await getRecord(OWNER_TABLE, ownerId);
  return owner.record['Subscriber Bill'];
};

// throw an exception on error
const getSubscriberOwnerFromPerson = async user => {
  const res = await getRecordsFromAttribute(OWNER_TABLE, PERSON, user);
  validateSubscriberOwnerRecord(res);
  return res.records[0].fields[SUBSCRIBER_OWNER];
};

const getSubscriberBills = async (loggedInUserId, callback) => {
  try {
    const ownerId = await getOwnerIdFromId(loggedInUserId);
    const billIds = await getBillsFromOwnerId(ownerId);

    const billPromises = [];
    billIds.forEach(billId => {
      billPromises.push(getRecord(SUBSCRIBER_BILL_TABLE, billId));
    });

    const billObjects = await Promise.all(billPromises);

    const bills = [];
    let isLatest = true;
    billObjects.forEach(({ record }) => {
      // if (!record.Payment) {
      bills.push({
        ID: record.ID,
        'Subscriber Owner': record['Subscriber Owner'][0], // assumes exactly 1 subscriber owner
        'Statement Date': record['Statement Date'],
        'Start Date': record['Start Date'],
        'End Date': record['End Date'],
        'Rate Schedule': record['Rate Schedule'],
        'Estimated Rebate': record['Estimated Rebate'],
        'Total Estimated Rebate': record['Total Estimated Rebate'],
        'Amount Due on Previous': record['Amount Due on Previous'],
        'Amount Received Since Previous':
          record['Amount Received Since Previous'],
        'Amount Due': record['Amount Due'],
        'Is Latest': isLatest
      });
      isLatest = false;
      // }
    });

    callback(bills);
  } catch (err) {
    callback(null);
  }
};

const createPayment = async record => {
  /*
    {
      "fields": {
        "Owner": [
          "Some Id"
        ],
        "Status": "Paid in full",
        "Type": "Some Type",
        "Amount": {amount in cents},
        "Subscriber Bill": [
          "recy1K7CRUQPVvaE7"
        ]
      }
    }
  */
  const id = await createRecord(PAYMENT_TABLE, record);
  return id;
};

export {
  areDiffBills,
  centsToDollars,
  getOwnerIdFromId,
  getBillsFromOwnerId,
  getSubscriberOwnerFromPerson,
  getSubscriberBills,
  createPayment
};
