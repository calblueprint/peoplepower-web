import moment from 'moment';
import { getSubscriberBillsByIds, getPaymentsByIds } from './airtable/request';
import constants from '../constants';

const {
  BILL_ACTIVE_STATUS,
  TRANSACTION_DATE_FORMAT,
  BILL_PAYMENT_TYPE
} = constants;

const PAYMENT_TYPE = 'Payment';
const CHARGE_TYPE = 'Charge';

// Format dollar amount
const formatAmount = (amountInDollars, places = 2) =>
  `$${amountInDollars.toFixed(places)}`;

// Create a transaction object from airtable payment record
const createTransactionFromPayment = payment => ({
  balance: '$0.00',
  date: moment(payment.dateCreated),
  description: 'Online Payment',
  payment: formatAmount(payment.amount),
  charge: '',
  amount: formatAmount(payment.amount),
  type: PAYMENT_TYPE
});

// Create transaction object from airtable subscriber bill record
const createTransactionFromBill = bill => ({
  balance: formatAmount(bill.balance),
  date: moment(bill.statementDate),
  description: `${moment(bill.startDate).format('MMMM')} Power Bill`,
  charge: formatAmount(bill.amountDue),
  payment: '',
  amount: formatAmount(bill.amountDue),
  type: CHARGE_TYPE,
  url: bill.billPdf[0].url
});

// check if payment is Bill Payment
const isBillPayment = payment => {
  return payment.type === BILL_PAYMENT_TYPE;
};

// Round number to 2 decimal places
const round = (x, y = 2) => Number(parseFloat(x).toFixed(y));

// Get the true and would be costs for a subscriber owner
const getEffectiveCostData = async owner => {
  const bills = (await getSubscriberBillsByIds(
    owner.subscriberBillIds || []
  )).filter(bill => bill.status !== 'Pending');

  const effectiveCostDataMoment = bills.map(bill => ({
    month: moment(bill.startDate, 'YYYY-MM-DD'),
    cost: round(
      bill.ebceCharges +
        bill.pgeCharges +
        bill.currentCharges -
        bill.ebceRebate -
        bill.estimatedRebate
    ),
    wouldBeCost: round(bill.wouldBeCosts)
  }));
  return effectiveCostDataMoment
    .sort((a, b) => a.month - b.month)
    .map(point => ({ ...point, month: point.month.format('MMM') }));
};

// Get all the bills and payments for a owner and convert to a clean list of transactions sorted most recent first
const getSubscriberTransactionData = async owner => {
  const bills = await getSubscriberBillsByIds(owner.subscriberBillIds || []);
  const payments = await getPaymentsByIds(owner.paymentIds || []);

  // Create Transactions
  const transactions = bills
    .filter(bill => bill.status !== 'Pending')
    .map(createTransactionFromBill)
    .concat(payments.filter(isBillPayment).map(createTransactionFromPayment))
    .sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()) // Sort descending
    .map(t => ({ ...t, date: t.date.format(TRANSACTION_DATE_FORMAT) })); // Remove Hour count

  // Find active bill
  const activeBills = bills.filter(b => b.status === BILL_ACTIVE_STATUS);
  if (activeBills.length > 1) {
    throw new Error(
      'Found more than 1 active bill. Please contact administrator'
    );
  }

  let activeBill;
  if (activeBills.length === 0) {
    activeBill = 0;
  } else {
    [activeBill] = activeBills;
    activeBill = {
      ...activeBill,
      balance: Number(activeBill.balance.toFixed(2))
    };
  }

  // TODO: remove the number 2 on the server side
  return {
    activeBill,
    transactions
  };
};

export { formatAmount, getSubscriberTransactionData, getEffectiveCostData };
