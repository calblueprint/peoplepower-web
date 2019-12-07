import React from 'react';
import '../../../styles/PanelBills.css';

function PanelBillHeader() {
  return (
    <div className="panel-bill-card bill-header-card">
      <div className="panel-bill-items statement-emphasize">
        <p className="panel-bill-items-internal panel-statement-left ">DATE</p>
        <p className="panel-bill-items-internal panel-description panel-statement-middle">
          DESCRIPTION
        </p>
        <p className="panel-bill-items-internal panel-statement-middle">
          CHARGE
        </p>
        <p className="panel-bill-items-internal panel-statement-middle">
          PAYMENT
        </p>
        <p className="panel-bill-items-internal panel-statement-right">
          STATUS
        </p>
      </div>
      <hr id="TEMP-REMOVE-ME" />
    </div>
  );
}

export default PanelBillHeader;
