import { PayPalButton } from 'react-paypal-button-v2';
import { createPayment, updateOwner } from '../airtable/request';
import constants from '../../constants';

const {
  BILL_PAYMENT_TYPE,
  BUY_SHARES_TYPE,
  PAYPAL_TRANSACTION_FLAT_FEE_IN_DOLLARS,
  PAYPAL_TRANSACTION_FEE_FRACTION
} = constants;

// Calculate the fee required to negate the paypal fee
const calculatePaypalTransactionFee = transactionAmount => {
  return (
    (transactionAmount + PAYPAL_TRANSACTION_FLAT_FEE_IN_DOLLARS) /
      (1 - PAYPAL_TRANSACTION_FEE_FRACTION) -
    transactionAmount
  ).toFixed(2);
};

// Create payment record from Paypal API Response
const constructPaymentRecord = (details, data, ownerId) => {
  const { payer } = details;
  const { amount, shipping } = details.purchase_units[0]; // assumes purchase_units is only of length 1
  const { address, name } = shipping;
  const payerAddress = `${address.address_line_1}, ${address.admin_area_2} ${address.country_code} ${address.admin_area_1} ${address.postal_code}`;
  const payerFullName = name.full_name;

  return {
    ownerId,
    paypalOrderId: data.orderID,
    paypalPayerId: data.payerID,
    amount: Number(amount.value),
    currencyCode: amount.currency_code,
    payerAddress,
    payerFullName,
    payerEmail: payer.email_address
  };
};

// Record Share-Buying Payment
const recordSharePayment = async (details, data, ownerId, numberOfShares) => {
  const payment = constructPaymentRecord(details, data, ownerId);
  await createPayment({ ...payment, type: BUY_SHARES_TYPE });
  await updateOwner(ownerId, { numberOfShares });
};

// Record Bill Payment
const recordBillPayment = async (details, data, bill) => {
  const payment = constructPaymentRecord(details, data, bill.subscriberId);
  await createPayment({
    ...payment,
    type: BILL_PAYMENT_TYPE,
    subscriberBillId: bill.id
  });
};

export {
  PayPalButton,
  calculatePaypalTransactionFee,
  recordBillPayment,
  recordSharePayment
};
