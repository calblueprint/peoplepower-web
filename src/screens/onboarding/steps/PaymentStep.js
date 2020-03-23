import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { recordShareBuySuccess } from '../../../lib/paypalUtils';

const clientId = process.env.PAYPAL_CLIENT_ID;

const SHARE_PRICE = 100;

class PaymentStep extends React.Component {
  onBuyShareWithPaypalSuccess = (details, data) => {
    const { owner, onSubmit } = this.props;
    recordShareBuySuccess(details, data, owner.id); // TODO(dfangshuo): no await?
    onSubmit();
  };

  render() {
    const { owner, onBack } = this.props;
    return (
      <div className="w-100">
        <div className="flex w-100 justify-space-between onboarding-row ">
          <div className="w-60">
            <div className="payment-cc-card">
              <div className="payment-shares-header">Payment Information</div>
              <div className="mt-3">
                <PayPalButton
                  amount={owner.numberOfShares * SHARE_PRICE}
                  onSuccess={this.onBuyShareWithPaypalSuccess}
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
                  ${owner.numberOfShares * SHARE_PRICE}.00
                </div>
              </div>
              <div className="payment-summary-qty">
                QTY: {owner.numberOfShares}
              </div>
              <hr className="payment-summary-hr" />
              <div className="flex justify-space-between">
                <div className="left payment-summary-total">Total</div>
                <div className="right payment-summary-total">
                  ${owner.numberOfShares * SHARE_PRICE}.00
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
