import moment from 'moment';
import { getSubscriberBillsByIds, getPaymentsByIds } from './airtable/request';
import constants from '../constants';

const { BILL_ACTIVE_STATUS, TRANSACTION_DATE_FORMAT } = constants;

const formatAmount = (amountInDollars, places = 2) =>
  `$${amountInDollars.toFixed(places)}`;

const createTransactionFromPayment = payment => ({
  balance: '$0.00',
  date: moment(payment.dateCreated).format(TRANSACTION_DATE_FORMAT),
  description: 'Online Payment',
  payment: formatAmount(payment.amount),
  charge: '',
  amount: formatAmount(payment.amount)
});

const createTransactionFromBill = bill => ({
  balance: formatAmount(bill.balance),
  date: moment(bill.statementDate).format(TRANSACTION_DATE_FORMAT),
  description: `${moment(bill.startDate).format('MMMM')} Power Bill`,
  charge: formatAmount(bill.currentCharges),
  payment: '',
  amount: formatAmount(bill.currentCharges)
});

const getSubscriberTransactionData = async owner => {
  const bills = await getSubscriberBillsByIds(owner.subscriberBillIds || []);
  const payments = await getPaymentsByIds(owner.paymentIds || []);

  // Create Transactions
  const transactions = bills
    .map(createTransactionFromBill)
    .concat(payments.map(createTransactionFromPayment))
    .sort(
      (a, b) =>
        moment(b.date, TRANSACTION_DATE_FORMAT).valueOf() -
        moment(a.date, TRANSACTION_DATE_FORMAT).valueOf()
    ); // Sort descending

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
  }

  // TODO: remove the number 2 on the server side
  return {
    activeBill: {
      ...activeBill,
      balance: Number(activeBill.balance.toFixed(2))
    },
    transactions
  };
};

export { formatAmount, getSubscriberTransactionData };
