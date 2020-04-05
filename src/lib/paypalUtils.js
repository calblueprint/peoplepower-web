import { createPayment } from './airtable/request';
import constants from '../constants';

const { BILL_PAYMENT_TYPE, BUY_SHARES_TYPE } = constants;

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

const recordSharePayment = async (details, data, ownerId) => {
  const payment = constructPaymentRecord(details, data, ownerId);
  await createPayment({ ...payment, type: BUY_SHARES_TYPE });
};

const recordBillPayment = async (details, data, bill) => {
  const payment = constructPaymentRecord(details, data, bill.subscriberId);
  console.log(payment);
  await createPayment({
    ...payment,
    type: BILL_PAYMENT_TYPE,
    subscriberBillId: bill.id
  });
};

export { recordBillPayment, recordSharePayment };
