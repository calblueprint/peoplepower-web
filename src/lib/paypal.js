import { createRecord, updateOwner } from './request';

const PAYMENT_TABLE = 'Payment';

// Payment Types
const BILL_PAYMENT_TYPE = 'Bill Payment';
const BUY_SHARES_TYPE = 'Buy Shares';

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

const recordShareBuySuccess = async (details, data, values) => {
  const { numShares, dividends, personId } = values;
  const updatedOwner = {
    id: personId,
    fields: {
      'Number of Shares': numShares,
      Dividends: dividends
    }
  };

  await updateOwner(updatedOwner);

  const { orderID, payerID } = data;

  const { intent, status, payer } = details;
  const { amount, shipping } = details.purchase_units[0]; // assumes purchase_units is only of length 1

  if (details.purchase_units.length > 1) {
    console.warn('length of details.purchase_units > 1');
  }

  const { address, name } = shipping;
  const addressToSave = `${address.address_line_1}, ${address.admin_area_2} ${address.country_code} ${address.admin_area_1} ${address.postal_code}`;

  const record = {
    fields: {
      Owner: [personId],
      Status: status,
      'Order ID': orderID,
      'Payer ID': payerID,
      Amount: parseFloat(amount.value, 10) * 100,
      'Currency Code': amount.currency_code,
      Address: addressToSave,
      'Payer Full Name': name.full_name,
      'Payer Email': payer.email_address,
      Intent: intent,
      'Payment Create Time': details.create_time,
      'Payment Update Time': details.update_time,
      Type: BUY_SHARES_TYPE
    }
  };

  /*
    TODO(dfangshuo): retry logic
  */
  createPayment(record)
    .then(paymentId => {
      console.log(paymentId);
    })
    .catch(err => {
      console.error(err);
    });
};

const recordBillPaymentSuccess = async (details, data, bill) => {
  /*
        DETAILS FIELDS
  
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
  
        purchase_units (EXPANDED)
  
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

  /*
        DATA FIELDS
        
        orderID: "SOME ORDER ID"
        payerID: "SOME PAYER ID"
     
     */

  const owner = bill['Subscriber Owner'];
  const billId = bill.ID;

  const { orderID, payerID } = data;

  const { id, intent, status, payer } = details;
  const { amount, shipping } = details.purchase_units[0]; // assumes purchase_units is only of length 1

  if (details.purchase_units.length > 1) {
    console.warn('length of details.purchase_units > 1');
  }

  const { address, name } = shipping;
  const addressToSave = `${address.address_line_1}, ${address.admin_area_2} ${address.country_code} ${address.admin_area_1} ${address.postal_code}`;
  const amountInCents = parseFloat(amount.value, 10) * 100;
  const record = {
    fields: {
      Owner: [owner],
      Status: status,
      'Subscriber Bill': [billId],
      'Order ID': orderID,
      'Payer ID': payerID,
      Amount: amountInCents,
      'Currency Code': amount.currency_code,
      Address: addressToSave,
      'Payer Full Name': name.full_name,
      'Payer Email': payer.email_address,
      Intent: intent,
      'Payment Create Time': details.create_time,
      'Payment Update Time': details.update_time,
      Type: BILL_PAYMENT_TYPE
    }
  };

  if (id !== orderID) {
    record.fields.Notes = 'id and order id mismatch';
  }
  /*
      TODO(dfangshuo): another important place where retry logic might be important
      
      If paypal goes through but the payment record wasn't created for some reason, 
      it could cause problems
    */
  createPayment(record)
    .then(paymentId => {
      console.log(paymentId);
    })
    .catch(err => {
      console.error(err);
    });

  const newBalance = bill.Balance - amountInCents;
  const updatedBill = {
    id: billId,
    fields: {
      Balance: newBalance
    }
  };
  updateBill(updatedBill);
};

export { recordShareBuySuccess, recordBillPaymentSuccess };
