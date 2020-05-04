import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SharesProgressBar from './SharesProgressBar';
import '../../../styles/InvestmentWidget.css';

import Constants from '../../../constants';
import PPModal from '../../../components/PPModal';

const { MAX_SHARES, SHARE_PRICE } = Constants;

export default function InvestmentWidget(props) {
  const [showDivestModal, setShowDivestModal] = useState(false);
  const { numberOfShares, smaller } = props;
  return (
    <div
      className={`investments-widget-box-shares ${
        smaller ? 'investments-widget-smaller' : 'investments-widget-normal'
      }`}
    >
      <PPModal
        showModal={showDivestModal}
        body="Contact your project group administrator to divest from People Power"
        header="Divest Your Shares"
        actionName="Ok"
        handleCloseModal={() => {
          setShowDivestModal(false);
        }}
      />
      <div className="investments-widget-circle-progress-bar">
        <SharesProgressBar numberOfShares={numberOfShares} />
      </div>
      <div className="investments-widget-box-text">
        <h5>You currently own {numberOfShares} out of 10 possible shares</h5>
        <br />
        <h4>${numberOfShares * SHARE_PRICE}.00</h4>
      </div>
      <div className="investments-widget-buttons">
        {numberOfShares !== MAX_SHARES ? (
          <div className="investments-widget-buy-shares-button investments-buy-shares-active">
            <Link to="/buyshares">Buy Shares</Link>
          </div>
        ) : (
          <div className="investments-widget-buy-shares-button investments-buy-shares-inactive">
            <div className="investments-inactive-link">Buy Shares</div>
          </div>
        )}

        <button
          type="button"
          className="investments-widget-dividend-button"
          onClick={() => setShowDivestModal(true)}
        >
          Divest
        </button>
      </div>
    </div>
  );
}
