import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import '../../styles/SubscriberOwnerDashboard.css';
import { getLoggedInUserId } from '../../lib/auth';
import { centsToDollars, createPayment } from '../../lib/subscriberHelper';
import keys from '../../lib/api_key';

const { clientId } = keys;

export default class SubscriberOwnerDashboard extends React.Component {
  constructor(props) {
    super(props);
    const { bills } = this.props;
    this.state = {
      latestBill: bills.filter(bill => bill['Is Latest'])[0]
    };
    this.onSuccess = this.onSuccess.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const id = getLoggedInUserId();
    if (!id) {
      // They shouldn't be able to access this screen
      history.push('/');
    }
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

    const { latestBill } = this.state;
    const owner = latestBill['Subscriber Owner'];
    const bill = latestBill.ID;

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
        'Subscriber Bill': [bill],
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

  render() {
    const { callback } = this.props;
    const { latestBill } = this.state;
    const amtDue = centsToDollars(latestBill['Amount Due']);
    return (
      <div className="subscriber-dash-outer-container">
        <h3>My Finances</h3>
        <div className="subscriber-dash-inner-container">
          <div className="left-col subscriber-dash-col">
            <p className="subscriber-header">Billing Summary</p>
            <div className="col-card">
              <div className="class-elems">
                <div className="balance-header-section">
                  <p>Your Balance</p>
                  <h3>${amtDue}</h3>
                </div>
                <hr id="divider" />
                <div className="balance-nums-section">
                  <div className="balance-nums-line">
                    <p className="line-item descrip">Due Now</p>
                    <p className="line-item">${amtDue}</p>
                  </div>
                  <div className="balance-nums-line">
                    <p className="line-item descrip">Upcoming</p>
                    <p className="line-item">$0.00</p>
                  </div>
                  <br />
                  <br />
                  <div className="balance-nums-line">
                    <p className="line-item descrip">
                      <strong>Total</strong>
                    </p>
                    <p className="line-item">
                      <strong>${amtDue}</strong>
                    </p>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <PayPalButton
                  amount={amtDue}
                  onSuccess={this.onSuccess}
                  options={{
                    clientId
                  }}
                />
              </div>
            </div>
          </div>
          <div className="right-col subscriber-dash-col">
            <p className="subscriber-header">Recent Transactions</p>
            <div className="col-card">
              <div className="TEMP">
                <button
                  className="subscriber-button"
                  type="button"
                  onClick={callback}
                >
                  See all bills
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
