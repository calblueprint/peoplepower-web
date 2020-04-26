import React from 'react';
import { Link } from 'react-router-dom';
import SharesProgressBar from './SharesProgressBar';
import '../../../styles/InvestmentCard.css';

import Constants from '../../../constants';

const { MAX_SHARES, SHARE_PRICE } = Constants;

export default function InvestmentCard(props) {
  const { numberOfShares } = props;
  return (
    <div className="investments-card-box-shares">
      <div className="investments-card-circle-progress-bar">
        <SharesProgressBar numberOfShares={numberOfShares} />
      </div>
      <div className="investments-card-box-text">
        <h5>You currently own {numberOfShares} out of 10 possible shares</h5>
        <br />
        <h4>${numberOfShares * SHARE_PRICE}.00</h4>
      </div>
      <div className="investments-card-buttons">
        {numberOfShares !== MAX_SHARES ? (
          <div className="investments-card-buy-shares-button investments-buy-shares-active">
            <Link to="/buyshares">Buy Shares</Link>
          </div>
        ) : (
          <div className="investments-card-buy-shares-button investments-buy-shares-inactive">
            <div className="investments-inactive-link">Buy Shares</div>
          </div>
        )}

        <button type="button" className="investments-card-dividend-button">
          Divest
        </button>
      </div>
    </div>
  );
}
