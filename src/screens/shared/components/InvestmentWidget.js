import React from 'react';
import { Link } from 'react-router-dom';
import SharesProgressBar from './SharesProgressBar';
import '../../../styles/InvestmentWidget.css';

import Constants from '../../../constants';

const { MAX_SHARES, SHARE_PRICE } = Constants;

export default function InvestmentWidget(props) {
  const { numberOfShares, smaller } = props;
  return (
    <div
      className={`investments-widget-box-shares ${
        smaller ? 'investments-widget-smaller' : 'investments-widget-normal'
      }`}
    >
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

        <button type="button" className="investments-widget-dividend-button">
          Divest
        </button>
      </div>
    </div>
  );
}
