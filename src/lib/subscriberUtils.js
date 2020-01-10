import { getOwnerById, getSubscriberBillById } from './request';
import getOwnerIdFromPersonId from './personUtils';

import constants from '../constants';

const { SUBSCRIBER_BILL_FIELD } = constants;

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

const dateToWord = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

const getBillsFromOwnerId = async ownerId => {
  const owner = await getOwnerById(ownerId);
  return owner[SUBSCRIBER_BILL_FIELD];
};

const getSubscriberBills = async (loggedInUserId, callback) => {
  try {
    const ownerId = await getOwnerIdFromPersonId(loggedInUserId);
    const billIds = await getBillsFromOwnerId(ownerId);

    const billPromises = [];
    if (billIds) {
      billIds.forEach(billId => {
        billPromises.push(getSubscriberBillById(billId));
      });
    } else {
      callback([]);
    }

    const billObjects = await Promise.all(billPromises);

    const bills = [];
    let isLatest = true;
    if (billObjects) {
      billObjects.forEach(billObject => {
        // if (!billObject.Payment) {
        bills.push({
          ID: billObject.ID,
          'Subscriber Owner': billObject['Subscriber Owner'][0], // assumes exactly 1 subscriber owner
          'Statement Date': billObject['Statement Date'],
          'Start Date': billObject['Start Date'],
          'End Date': billObject['End Date'],
          'Rate Schedule': billObject['Rate Schedule'],
          'Estimated Rebate': billObject['Estimated Rebate'],
          'Total Estimated Rebate': billObject['Total Estimated Rebate'],
          'Amount Due on Previous': billObject['Amount Due on Previous'],
          'Amount Received Since Previous':
            billObject['Amount Received Since Previous'],
          'Amount Due': billObject['Amount Due'],
          Status: billObject.Status,
          Balance: billObject.Balance,
          'Is Latest': isLatest
        });
        isLatest = false;
        // }
      });
    }

    callback(bills);
  } catch (err) {
    console.log(err);
    callback(null);
  }
};

export {
  areDiffBills,
  centsToDollars,
  dateToWord,
  getBillsFromOwnerId,
  getSubscriberBills
};
