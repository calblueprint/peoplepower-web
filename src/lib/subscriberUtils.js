import { getSubscriberBillsByIds } from './airtable/request';
import { convertPaypalDateTimeToDate } from './dateUtils';
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

const getSubscriberTransactionData = async owner => {
  // const bills = getSu;
};
const getSubscriberBills = async owner => {
  try {
    const billIds = owner.subscriberBillIds;
    const { paymentIds } = owner;

    if (!billIds && !paymentIds) {
      return { transactions: [], pendingBills: [] };
    }

    const transactions = [];
    const pendingBills = [];
    let billObjects = [];
    let paymentObjects = [];

    if (billIds) {
      billObjects = await getSubscriberBillsByIds(billIds);
    }

    if (paymentIds) {
      paymentObjects = await getSubscriberBillsByIds(paymentIds);
    }

    if (billObjects) {
      billObjects.forEach(billObject => {
        transactions.push({
          transactionDate: billObject.statementDate,
          startDate: billObject.startDate,
          amountDue: billObject.amountDue,
          status: billObject.status,
          balance: billObject.balance,
          type: BILL_TYPE // Type is a local variable inserted to distinguish between bill payments and online payments
        });
        if (billObject.Status !== COMPLETED_STATUS) {
          // TODO: Could this be simpler since it's copying most of the properties of billObject
          pendingBills.push({
            id: billObject.id,
            subscriberId: billObject.subscriberId[0], // assumes exactly 1 subscriber owner
            transactionDate: billObject.statementDate,
            startDate: billObject.startDate,
            endDate: billObject.endDate,
            rateScheduleId: billObject.rateSchedule,
            estimatedRebate: billObject.estimatedRebate,
            totalEstimatedRebate: billObject.totalEstimatedRebate,
            amountDueOnPrevious: billObject.amountDueOnPrevious,
            amountReceivedSincePrevious: billObject.amountReceivedSincePrevious,
            amountDue: billObject.amountDue,
            status: billObject.status,
            balance: billObject.balance,
            type: BILL_TYPE // Type is a local variable inserted to distinguish between bill payments and online payments
          });
        }
      });
    }

    if (paymentObjects) {
      paymentObjects.forEach(paymentObject => {
        transactions.push({
          transactionDate: convertPaypalDateTimeToDate(
            paymentObject.paymentCreateTime
          ),
          amount: paymentObject.amount,
          status: paymentObject.status,
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
