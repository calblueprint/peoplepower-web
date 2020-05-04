import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/PaymentSuccessCard.css';
import Colors from '../../../colors';

const { PP_PINK } = Colors;

class PaymentSuccessCard extends React.PureComponent {
  render() {
    const {
      sharesBuying,
      transactionAmount,
      showShares,
      returnTo
    } = this.props;

    const paymentMethod = 'Paypal Debit';

    return (
      <div className="payment-success-modal">
        <svg
          width="83"
          height="83"
          viewBox="0 0 83 83"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="41.5" cy="41.5" r="39" stroke={PP_PINK} strokeWidth="5" />
          <path
            d="M26.7522 41.7906C25.7674 40.8229 24.1845 40.8367 23.2168 41.8216C22.2491 42.8064 22.263 44.3893 23.2478 45.357L26.7522 41.7906ZM34.593 53L32.8408 54.7832L34.593 56.5049L36.3452 54.7832L34.593 53ZM59.7522 31.7832C60.737 30.8155 60.7509 29.2326 59.7832 28.2478C58.8155 27.263 57.2326 27.2491 56.2478 28.2168L59.7522 31.7832ZM23.2478 45.357L32.8408 54.7832L36.3452 51.2168L26.7522 41.7906L23.2478 45.357ZM36.3452 54.7832L59.7522 31.7832L56.2478 28.2168L32.8408 51.2168L36.3452 54.7832Z"
            fill={PP_PINK}
          />
        </svg>

        <h1>Payment Successful</h1>
        <h5>
          It may take a few minutes for the payment to appear on your portal
        </h5>

        <div>
          <h3>Shares Purchased:</h3>
          {showShares ? <p>{`${sharesBuying}`}</p> : null}
        </div>
        <div>
          <h3>Amount Paid:</h3>
          <p>{`${transactionAmount}`}</p>
        </div>
        <div>
          <h3>Payment Method:</h3>
          <p>{`${paymentMethod}`}</p>
        </div>
        <Link
          to={returnTo === 'My Investment' ? '/investment' : '/billing'}
          className="dropdown-link payment-success-redirect-button"
        >
          Back to {returnTo}
        </Link>
        <Link to="/" className="dropdown-link payment-success-redirect-button">
          Return to Dashboard
        </Link>
      </div>
    );
  }
}

export default PaymentSuccessCard;
