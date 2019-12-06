import React from 'react';
import '../styles/Bill.css';

/*
  Left some fields in comments because they are needed in the hifi version of the design:
  https://www.figma.com/file/jPJ59YeB2EXNMpjPHKtm5B/people-power?node-id=747%3A0

  The fields were commented out to implement a lofi version consistent with
  an earlier version of the design
*/

function BillHeader() {
  return (
    <div className="bill-card bill-header-card">
      <div className="bill-items">
        <p className="bill-items-internal statement-left statement-emphasize">
          DATE
        </p>
        <p className="bill-items-internal statement-middle statement-emphasize">
          DESCRIPTION
        </p>
        <p className="bill-items-internal statement-middle statement-emphasize">
          CHARGE
        </p>
        <p className="bill-items-internal statement-middle statement-emphasize">
          PAYMENT
        </p>
        <p className="bill-items-internal statement-middle statement-emphasize">
          BALANCE
        </p>
        <p className="bill-items-internal statement-right statement-emphasize">
          STATUS
        </p>
      </div>
      <hr id="TEMP-REMOVE-ME" />
    </div>
  );
}

export default BillHeader;
