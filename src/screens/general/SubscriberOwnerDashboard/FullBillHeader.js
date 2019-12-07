import React from 'react';
import '../../../styles/FullBills.css';

function FullBillHeader() {
  return (
    <div className="bill-card bill-header-card">
      <div className="bill-items">
        <p className="full-bill-items-internal full-statement-left statement-emphasize">
          DATE
        </p>
        <p className="full-bill-items-internal full-statement-middle statement-emphasize">
          DESCRIPTION
        </p>
        <p className="full-bill-items-internal full-statement-middle statement-emphasize">
          CHARGE
        </p>
        <p className="full-bill-items-internal full-statement-middle statement-emphasize">
          PAYMENT
        </p>
        <p className="full-bill-items-internal full-statement-middle statement-emphasize">
          BALANCE
        </p>
        <p className="full-bill-items-internal full-statement-right statement-emphasize">
          STATUS
        </p>
      </div>
      <hr id="TEMP-REMOVE-ME" />
    </div>
  );
}

export default FullBillHeader;
