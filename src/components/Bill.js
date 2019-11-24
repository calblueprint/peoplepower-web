import React from 'react';
import '../styles/Bill.css';

const dateToWord = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

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
  isLatest
  // callback
}) {
  return (
    <div className={isLatest ? 'latest-bill-card' : 'bill-card'}>
      <div className="bill-items">
        <p className="bill-items-internal statement-date">
          {dateToDateString(statementDate)}
        </p>
        <p className="bill-items-internal statement-month">
          {dateToFullMonth(startDate)} Power Bill
        </p>
        {/* <p>End date: {endDate}</p>
        <p>Rate Schedule: {rateSchedule}</p>
        <p>Estimated Rebate: ${estimatedRebate}</p>
        <p>Total Estimated Rebate: ${totalEstimatedRebate}</p>
        <p>Amount Due on Previous: ${amtDueOnPrev}</p>
        <p>Amount Received Since Previous: ${amtReceivedSincePrev}</p> */}
        <p className="bill-items-internal statement-amount-due">- ${amtDue}</p>
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
