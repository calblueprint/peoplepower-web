import {
  createPayment,
  updateOwner,
  updateSubscriberBill
} from './airtable/request';
import constants from '../constants';

const {
  BILL_PAYMENT_TYPE,
  BUY_SHARES_TYPE,
  COMPLETED_STATUS,
  PENDING_STATUS
} = constants;

/*
  Schema of Payment Table
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

const dollarsToCents = dollars => {
  return parseFloat(dollars, 10) * 100;
};

const getTotalBalanceFromBills = pendingBills => {
  return pendingBills
    .map(pendingBill => pendingBill.Balance)
    .reduce((a, b) => a + b, 0);
};

const recordShareBuySuccess = async (details, data, values) => {
  const { numShares, dividends, personId } = values;
  const updatedOwner = {
    numberOfShares: numShares,
    receivingDividends: dividends
  };

  await updateOwner(personId, updatedOwner);

  const { orderId, payerId } = data;

  const { intent, status, payer } = details;
  const { amount, shipping } = details.purchase_units[0]; // assumes purchase_units is only of length 1

  if (details.purchase_units.length > 1) {
    console.warn('length of details.purchase_units > 1');
  }

  const { address, name } = shipping;
  const addressToSave = `${address.address_line_1}, ${address.admin_area_2} ${address.country_code} ${address.admin_area_1} ${address.postal_code}`;

  // TODO: Couldn't this use the constructPaymentRecord function?
  const record = {
    owner: [personId],
    status,
    orderId,
    payerId,
    amount: parseFloat(amount.value, 10) * 100,
    currencyCode: amount.currency_code,
    address: addressToSave,
    payerFullName: name.full_name,
    payerEmail: payer.email_address,
    intent,
    paymentCreateTime: details.create_time,
    paymentUpdateTime: details.update_time,
    type: BUY_SHARES_TYPE
  };

  /*
    TODO(dfangshuo): retry logic
  */
  try {
    const paymentId = await createPayment(record);
    console.log(paymentId);
    return paymentId;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const constructPaymentRecord = (details, data, bill) => {
  /*
        @params: data FIELDS
        
        orderID: "SOME ORDER ID"
        payerID: "SOME PAYER ID"
     
  */

  /*
        @params: details FIELDS
  
        create_time: "2019-11-12T04:44:42Z"
        id: "SOME_ID_HERE"
        intent: "SOME INTENT HERE"
        links: [{
          href: "SOME HREF HERE"
          method: "HTTP METHOD"
          rel: "self"
          title: "SOME TITLE"
        }]
        payer: {
          email_address: "SOME EMAIL ADDRESS", 
          payer_id: "SOME PAYER ID", 
          address: {…}, 
          name: {…}
        }
        purchase_units: [{…(EXPANDED BELOW)}]
        status: "SOME STATUS"
        update_time: "2019-11-12T04:45:33Z"
  
        ----
  
          purchase_units (EXPANDED from above)
    
          amount: 
              value: "SOME VALUE (IN DOLLARS)", 
              currency_code: "SOME CURRENCY CODE"
          payee: 
              email_address: "SOME EMAIL ADDREESS", 
              merchant_id: "SOME MERCHANT ID"
          payments: 
              captures: [{
                  amount: {value: "SOME VALUE (IN DOLLARS)", currency_code: "SOME CURRENCY CODE"}
                  create_time: "2019-11-12T04:58:14Z"
                  final_capture: true/false
                  id: "SOME ID"
                  links: (3) [{…}, {…}, {…}]
                  seller_protection: {status: "SOME STATUS", dispute_categories: Array(2)}
                  status: "SOME STATUS"
                  update_time: "2019-11-12T04:58:14Z"
              }]
                
              reference_id: "SOME REFERENCE ID"
          shipping:
              address:
                  address_line_1: "X X STREET"
                  admin_area_1: "SOME STATE"
                  admin_area_2: "SOME AREA"
                  country_code: "SOME COUNTRY"
                  postal_code: "POSTAL CODE HERE"
              name:
                  full_name: "FULL NAME HERE"
          
          status: "SOME STATUS HERE"
          update_time: "2019-11-12T04:58:14Z"
    */
  const owner = bill['Subscriber Owner'];

  const { orderId, payerId } = data;

  const { id, intent, status, payer } = details;
  const { amount, shipping } = details.purchase_units[0]; // assumes purchase_units is only of length 1

  if (details.purchase_units.length > 1) {
    console.warn('length of details.purchase_units > 1');
  }

  const { address, name } = shipping;
  const addressToSave = `${address.address_line_1}, ${address.admin_area_2} ${address.country_code} ${address.admin_area_1} ${address.postal_code}`;
  // const amountInCents = dollarsToCents({ TODO: APPROPRIATE VALUE HERE });
  const amountInCents = bill.Balance; // TODO: currently assumes entire bill is paid
  const paymentRecord = {
    owner: [owner],
    status,
    subscriberBill: [bill.ID],
    orderId,
    payerId,
    amount: amountInCents,
    currencyCode: amount.currency_code,
    address: addressToSave,
    payerFullName: name.full_name,
    payerEmail: payer.email_address,
    intent,
    paymentCreateTime: details.create_time,
    paymentUpdatetime: details.update_time,
    type: BILL_PAYMENT_TYPE
  };

  if (id !== orderId) {
    paymentRecord.notes = 'id and order id mismatch';
  }
  return paymentRecord;
};

// records bill payment success, updating the bill balance
// (and status, if necessary)
// returns the id of the updated bill upon success
const recordBillPaymentSuccess = async (details, data, bill) => {
  const paymentRecord = constructPaymentRecord(details, data, bill);
  try {
    const paymentId = await createPayment(paymentRecord);
    console.log(paymentId);
  } catch (err) {
    /*
        TODO(dfangshuo): another important place where retry logic might be important
        
        If paypal goes through but the payment record wasn't created for some reason, 
        it could cause problems
    */
    console.error(err);
    return err;
  }

  // update bill
  // TODO: currently will always be 0, because amountInCents === bill.Balance
  // may not be the case for partial payments
  const newBalance = bill.balance - paymentRecord.amount;
  return updateSubscriberBill(bill.ID, {
    balance: newBalance,
    status: newBalance === 0 ? COMPLETED_STATUS : PENDING_STATUS
  });
};

const recordPendingBillsPaymentSuccess = async (
  details,
  data,
  pendingBills
) => {
  const { amount } = details.purchase_units[0]; // assumes purchase_units is only of length 1
  const amountPaidInCents = dollarsToCents(amount.value);
  const totalBalance = getTotalBalanceFromBills(pendingBills);

  // TODO: for now, enforces that the amount paid === total balance
  // to be changed when implementing functionality that allows you to pay
  // less than the total amount
  if (amountPaidInCents !== totalBalance) {
    return new Error(
      `Amount paid $${amountPaidInCents} not equal to total balance $${totalBalance}`
    );
  }

  // will surface errors from recordBillPaymentSuccess
  await Promise.all(
    pendingBills.map(pendingBill =>
      recordBillPaymentSuccess(details, data, pendingBill)
    )
  );

  return null;
};

export {
  getTotalBalanceFromBills,
  recordShareBuySuccess,
  recordPendingBillsPaymentSuccess
};
