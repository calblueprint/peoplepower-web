import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import {
  calculatePaypalTransactionFee,
  recordSharePayment
} from '../../../lib/paypal/paypal';
import Constants from '../../../constants';
import Tooltip from '../components/Tooltip';

const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

const { SHARE_PRICE } = Constants;

class PaymentStep extends React.Component {
  onPaymentSuccess = async (details, data) => {
    const { owner, onSubmit } = this.props;
    await recordSharePayment(details, data, owner.id, owner.numberOfShares);
    onSubmit();
  };

  render() {
    const { owner, onBack } = this.props;
    const baseAmount = owner.numberOfShares * SHARE_PRICE;
    const transactionFee = calculatePaypalTransactionFee(baseAmount);
    const totalAmountToPay = (baseAmount + parseFloat(transactionFee)).toFixed(
      2
    );

    return (
      <div className="w-100">
        <div className="flex w-100 justify-space-between onboarding-row ">
          <div className="w-60">
            <div className="payment-cc-card">
              <div className="payment-shares-header">Payment Information</div>
              <div className="mt-3">
                <PayPalButton
                  amount={totalAmountToPay}
                  onSuccess={this.onPaymentSuccess}
                  options={{
                    clientId
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-40 pl-1">
            <div className="payment-summary-card">
              <div className="payment-summary-header">Order Summary</div>
              <div className="flex justify-space-between">
                <div className="left payment-summary-shares">Shares</div>
                <div className="right payment-summary-shares">
                  ${baseAmount}.00
                </div>
              </div>
              <div className="payment-summary-qty">
                QTY: {owner.numberOfShares}
              </div>
              <div className="flex justify-space-between">
                <div className="left payment-summary-shares">
                  Transaction Fee{' '}
                  <Tooltip label="PayPal charges a service fee of 2.9% + $0.30." />
                </div>
                <div className="right payment-summary-shares">
                  ${transactionFee}
                </div>
              </div>
              <hr className="payment-summary-hr" />
              <div className="flex justify-space-between">
                <div className="left payment-summary-total">Total</div>
                <div className="right payment-summary-total">
                  ${totalAmountToPay}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="steps-buttons flex onboarding-row w-100 right justify-space-between">
          <div className="left">
            <button type="button" className="back-button" onClick={onBack}>
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentStep;
