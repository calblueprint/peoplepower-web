import React from 'react';
import '../../../styles/PanelBills.css';
import { dateToWord } from '../../../lib/subscriberHelper';

function dateToFullMonth(date) {
  return dateToWord[parseInt(date.split('-')[1], 10)];
}

// expected format of date: YYYY-MM-DD
function formatDate(date) {
  const dateArr = date.split('-');
  return `${parseInt(dateArr[1], 10)}/${dateArr[2]}/${dateArr[0]}`;
}

function PanelBillRow({ statementDate, startDate, amtDue, status }) {
  return (
    <div className="panel-bill-card">
      <div className="panel-bill-items">
        <p className="panel-bill-row panel-statement-left">
          {formatDate(statementDate)}
        </p>
        <p className="panel-bill-row panel-description panel-statement-middle">
          {dateToFullMonth(startDate)} Power Bill
        </p>
        <p className="panel-bill-row panel-statement-middle"> ${amtDue}</p>
        <p className="panel-bill-row panel-statement-middle">{/* TODO */}</p>
        <p className="panel-bill-row panel-statement-right"> {status} </p>
      </div>
    </div>
  );
}

export default PanelBillRow;
