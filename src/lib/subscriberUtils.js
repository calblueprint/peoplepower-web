import { getPaymentById, getSubscriberBillById } from './airtable/request';
import { convertPaypalDateTimeToDate } from './dateUtils';

import { Columns } from './airtable/schema';
import constants from '../constants';

const { BILL_TYPE, ONLINE_PAYMENT_TYPE, COMPLETED_STATUS } = constants;

const formatStatus = status => {
  const lower = status.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.substring(1);
};

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

const getSubscriberBills = async owner => {
  try {
    const billIds = owner[Columns.Owner.SubscriberBill];
    const paymentIds = owner[Columns.Owner.Payment];

    if (!billIds && !paymentIds) {
      return { transactions: [], pendingBills: [], totalBalance: 0 };
    }

    const billPromises = [];
    const paymentPromises = [];
    const transactions = [];
    const pendingBills = [];

    if (billIds) {
      billIds.forEach(billId => {
        billPromises.push(getSubscriberBillById(billId));
      });
    }
    const billObjects = await Promise.all(billPromises);

    if (paymentIds) {
      paymentIds.forEach(paymentId => {
        paymentPromises.push(getPaymentById(paymentId));
      });
    }
    const paymentObjects = await Promise.all(paymentPromises);

    if (billObjects) {
      billObjects.forEach(billObject => {
        transactions.push({
          transactionDate: billObject['Statement Date'],
          startDate: billObject['Start Date'],
          amountDue: billObject['Amount Due'],
          status: billObject.Status,
          balance: billObject.Balance,
          type: BILL_TYPE // Type is a local variable inserted to distinguish between bill payments and online payments
        });
        if (billObject.Status !== COMPLETED_STATUS) {
          pendingBills.push({
            ID: billObject.ID,
            'Subscriber Owner': billObject['Subscriber Owner'][0], // assumes exactly 1 subscriber owner
            'Transaction Date': billObject['Statement Date'],
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
            Type: BILL_TYPE // Type is a local variable inserted to distinguish between bill payments and online payments
          });
        }
      });
    }

    if (paymentObjects) {
      paymentObjects.forEach(paymentObject => {
        transactions.push({
          transactionDate: convertPaypalDateTimeToDate(
            paymentObject['Payment Create Time']
          ),
          amount: paymentObject.Amount,
          status: paymentObject.Status,
          type: ONLINE_PAYMENT_TYPE // Type is a local variable inserted to distinguish between bill payments and online payments
        });
      });
    }
    transactions.sort((a, b) => {
      return new Date(b.transactionDate) - new Date(a.transactionDate);
    });

    return { transactions, pendingBills };
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { areDiffBills, centsToDollars, formatStatus, getSubscriberBills };
