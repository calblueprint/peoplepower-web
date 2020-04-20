import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/PaymentSuccessModal.css';

class PaymentSuccessModal extends React.PureComponent {
  render() {
    const { sharesBuying, transactionAmount, showShares } = this.props;

    const paymentMethod = 'Paypal Debit';

    return (
      <div className="payment-success-modal">
        <h1>Payment Successful</h1>
        {showShares ? <p>{`Shares Purchased: ${sharesBuying}`}</p> : null}
        <p>{`Amount Paid: ${transactionAmount}`}</p>
        <p>{`Payment Method: ${paymentMethod}`}</p>

        <Link
          to="/investment"
          className="dropdown-link payment-success-redirect-button"
        >
          Back to My Investment
        </Link>
        <Link to="/" className="dropdown-link payment-success-redirect-button">
          Return to Dashboard
        </Link>
      </div>
    );
  }
}

export default PaymentSuccessModal;
