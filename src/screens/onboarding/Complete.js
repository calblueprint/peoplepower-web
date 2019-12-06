import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import keys from '../../lib/secret';
import { createPayment } from '../../lib/subscriberUtils';
import Bill from '../general/Bill';

const { clientId } = keys;

class Complete extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const { values } = this.props;
    const { numShares } = values;
    this.state = {
      bill: (
        <Bill
          statementDate={`${date.getMonth() +
            1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}
          amtDue={numShares * 100}
        />
      )
    };
    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess(details, data) {
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

    const { bill } = this.state;
    const owner = bill['Subscriber Owner'];
    const billID = bill.ID;

    const { orderID, payerID } = data;

    const { id, intent, status, payer } = details;
    const { amount, shipping } = details.purchase_units[0]; // assumes purchase_units is only of length 1

    if (details.purchase_units.length > 1) {
      console.warn('length of details.purchase_units > 1');
    }

    const { address, name } = shipping;
    const addressToSave = `${address.address_line_1}, ${address.admin_area_2} ${address.country_code} ${address.admin_area_1} ${address.postal_code}`;

    const record = {
      fields: {
        Owner: [owner],
        Status: status,
        'Subscriber Bill': [billID],
        'Order ID': orderID,
        'Payer ID': payerID,
        Amount: parseFloat(amount.value, 10) * 100,
        'Currency Code': amount.currency_code,
        Address: addressToSave,
        'Payer Full Name': name.full_name,
        'Payer Email': payer.email_address,
        Intent: intent,
        'Payment Create Time': details.create_time,
        'Payment Update Time': details.update_time
      }
    };

    if (id !== orderID) {
      record.fields.Notes = 'id and order id mismatch';
    }

    createPayment(record)
      .then(paymentId => {
        console.log(paymentId);
      })
      .catch(err => {
        console.error(err);
      });
  }

  finishButton = e => {
    const { onSubmit } = this.props;
    e.preventDefault();
    onSubmit();
  };

  prevButton = e => {
    const { prevStep } = this.props;
    e.preventDefault();
    prevStep();
  };

  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: '0.01'
          }
        }
      ]
    });
  };

  render() {
    const { values } = this.props;
    const {
      ccnumber,
      expmonth,
      expyear,
      ccstreet,
      ccapt,
      cccity,
      ccstate,
      cczipcode,
      numShares
    } = values;
    const amtDue = numShares * 100;
    return (
      <div className="center">
        <div className="header">Confirmation Page</div>
        <div className="flex row">
          <div className="confirmation-card">
            <div className="header">Billing Address</div>
            <div className="body">
              {ccstreet} {ccapt}
              {cccity}, {ccstate} {cczipcode}
            </div>
          </div>
          <div className="confirmation-card">
            <div className="header">Payment Method</div>
            <div className="body">
              Visa **** **** **** {ccnumber.replace(/.(?=.{4})/g, 'x')}
              Expires in {expmonth} {expyear}
            </div>
          </div>
          <div className="confirmation-card">
            <div className="header">Order Summary</div>
            <div className="body">
              <div>Shares</div>
              <div>${numShares * 100}.00</div>
              <div>Qty:{numShares}</div>
              <br />
              <div>Total</div>
              <div>${numShares * 100}.00</div>
            </div>
          </div>
        </div>
        <div>
          <button type="button" onClick={this.prevButton}>
            Go back
          </button>
          <PayPalButton
            amount={amtDue}
            onSuccess={this.onSuccess}
            options={{ clientId }}
            createOrder={(data, actions) => this.createOrder(data, actions)}
          />
          <button type="button" onClick={this.finishButton}>
            Submit Payment
          </button>
        </div>
      </div>
    );
  }
}

export default Complete;
