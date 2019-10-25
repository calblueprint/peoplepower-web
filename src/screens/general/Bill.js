import React from 'react';
import '../../styles/Bill.css';

function Bill({
  statementDate,
  startDate,
  endDate,
  rateSchedule,
  estimatedRebate,
  totalEstimatedRebate,
  amtDueOnPrev,
  amtReceivedSincePrev,
  amtDue,
  isLatest,
  callback
}) {
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
        <button className="bill-button" onClick={callback} type="button">
          Pay
        </button>
      )}
    </div>
  );
}

export default Bill;
