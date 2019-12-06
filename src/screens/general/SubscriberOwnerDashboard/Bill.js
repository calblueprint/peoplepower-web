import React from 'react';
import '../../../styles/Bill.css';
import { dateToWord } from '../../../lib/subscriberHelper';

function dateToFullMonth(date) {
  return dateToWord[parseInt(date.split('-')[1], 10)];
}

// expected format of date: YYYY-MM-DD
function dateToDateString(date) {
  const dateArr = date.split('-');
  return `${dateToWord[parseInt(dateArr[1], 10)].substring(0, 3)} ${
    dateArr[2]
  }, ${dateArr[0]}`;
}

/*
  Left some fields in comments because they are needed in the hifi version of the design:
  https://www.figma.com/file/jPJ59YeB2EXNMpjPHKtm5B/people-power?node-id=747%3A0

  The fields were commented out to implement a lofi version consistent with
  an earlier version of the design
*/

function Bill({
  statementDate,
  startDate,
  // endDate,
  // rateSchedule,
  // estimatedRebate,
  // totalEstimatedRebate,
  // amtDueOnPrev,
  // amtReceivedSincePrev,
  amtDue,
  isLatest,
  status
  // callback
}) {
  return (
    <div className={isLatest ? 'latest-bill-card' : 'bill-card'}>
      <div className="bill-items">
        <p className="bill-items-internal statement-left">
          {dateToDateString(statementDate)}
        </p>
        <p className="bill-items-internal statement-middle statement-emphasize">
          {dateToFullMonth(startDate)} Power Bill
        </p>
        <p className="bill-items-internal statement-middle"> ${amtDue}</p>
        <p className="bill-items-internal statement-middle">
          {' '}
          $0.00{/* TODO */}
        </p>
        <p className="bill-items-internal statement-middle">
          {' '}
          $0.00{/* TODO */}
        </p>
        {/* <p>End date: {endDate}</p>
        <p>Rate Schedule: {rateSchedule}</p>
        <p>Estimated Rebate: ${estimatedRebate}</p>
        <p>Total Estimated Rebate: ${totalEstimatedRebate}</p>
        <p>Amount Due on Previous: ${amtDueOnPrev}</p>
        <p>Amount Received Since Previous: ${amtReceivedSincePrev}</p> */}
        <p className="bill-items-internal statement-right"> {status} </p>
      </div>
      {/* {isLatest && (
        <button className="bill-button" onClick={callback} type="button">
          Pay
        </button>
      )} */}
      <hr id="bill-divide-line" />
    </div>
    // <div className="bill-card">
    //   <h4>{statementDate}</h4>
    //   <p>Start date: {startDate}</p>
    //   <p>End date: {endDate}</p>
    //   <p>Rate Schedule: {rateSchedule}</p>
    //   <p>Estimated Rebate: ${estimatedRebate}</p>
    //   <p>Total Estimated Rebate: ${totalEstimatedRebate}</p>
    //   <p>Amount Due on Previous: ${amtDueOnPrev}</p>
    //   <p>Amount Received Since Previous: ${amtReceivedSincePrev}</p>
    //   <p>Amount Due: ${amtDue}</p>
    //   {isLatest && (
    //     <button className="bill-button" onClick={callback} type="button">
    //       Pay
    //     </button>
    //   )}
    // </div>
  );
}

export default Bill;
