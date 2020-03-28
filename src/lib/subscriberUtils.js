import moment from 'moment';
import { getSubscriberBillsByIds, getPaymentsByIds } from './airtable/request';
import constants from '../constants';

const { BILL_ACTIVE_STATUS } = constants;

const createTransactionFromPayment = payment => ({
  balance: '$0.00',
  date: moment(payment.dateCreated),
  description: 'Online Payment',
  payment: `$${payment.amount}`,
  charge: ''
});

const createTransactionFromBill = bill => ({
  balance: `$${bill.balance}`,
  date: moment(bill.statementDate),
  description: `${moment(bill.startDate).format('MMMM')} Power Bill`,
  charge: `$${bill.currentCharges}`,
  payment: ''
});

const getSubscriberTransactionData = async owner => {
  const bills = getSubscriberBillsByIds(owner.subscriberBillIds);
  const payments = getPaymentsByIds(owner.paymentIds);

  // Create Transactions
  const transactions = (
    bills.map(createTransactionFromBill) +
    payments.map(createTransactionFromPayment)
  ).sort((a, b) => b.date - a.date); // Sort descending

  // Find active bill
  const activeBills = bills.filter(b => b.status === BILL_ACTIVE_STATUS);
  if (activeBills.length > 1) {
    throw new Error(
      'Found more than 1 active bill. Please contact administrator'
    );
  }
  const activeBill = activeBills[0];

  return { activeBill, transactions };
};

export default getSubscriberTransactionData;
