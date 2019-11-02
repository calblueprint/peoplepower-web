import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import '../../styles/Bill.css';
import secret from '../../secret';

const { clientId } = secret;

export default class Bill extends React.Component {
  onSucccess(details, data) {
    console.log(this.props);
    console.log(data);
    console.log(`Transaction completed by ${details.payer.name.given_name}`);

    // OPTIONAL: Call your server to save the transaction
    // return fetch("/paypal-transaction-complete", {
    //     method: "post",
    //     body: JSON.stringify({
    //         orderId: data.orderID
    //     })
    // });
  }

  render() {
    const {
      statementDate,
      startDate,
      endDate,
      rateSchedule,
      estimatedRebate,
      totalEstimatedRebate,
      amtDueOnPrev,
      amtReceivedSincePrev,
      amtDue,
      isLatest
    } = this.props;
    return (
      <div className="bill-card">
        <h4>{statementDate}</h4>
        <p>Start date: {startDate}</p>
        <p>End date: {endDate}</p>
        <p>Rate Schedule: {rateSchedule}</p>
        <p>Estimated Rebate: ${estimatedRebate}</p>
        <p>Total Estimated Rebate: ${totalEstimatedRebate}</p>
        <p>Amount Due on Previous: ${amtDueOnPrev}</p>
        <p>Amount Received Since Previous: ${amtReceivedSincePrev}</p>
        <p>Amount Due: ${amtDue}</p>
        {isLatest && (
          <PayPalButton
            amount={amtDue}
            onSuccess={this.onSucccess}
            options={{
              clientId
            }}
          />
        )}
      </div>
    );
  }
}
