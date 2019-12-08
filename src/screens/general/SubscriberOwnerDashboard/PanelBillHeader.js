import React from 'react';
import '../../../styles/PanelBills.css';

function PanelBillHeader() {
  return (
    <div className="panel-bill-card bill-header-card">
      <div className="panel-bill-items statement-emphasize">
        <p className="panel-bill-row panel-statement-left ">DATE</p>
        <p className="panel-bill-row panel-description panel-statement-middle">
          DESCRIPTION
        </p>
        <p className="panel-bill-row panel-statement-middle">CHARGE</p>
        <p className="panel-bill-row panel-statement-middle">PAYMENT</p>
        <p className="panel-bill-row panel-statement-right">STATUS</p>
      </div>
      {/* TODO(dfangshuo) */}
      <hr id="TEMP-REMOVE-ME" />
    </div>
  );
}

export default PanelBillHeader;
