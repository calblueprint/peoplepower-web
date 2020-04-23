import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2/lib';

const PaymentButtons = ({ amount }) => {
  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  return (
    <PayPalButton
      amount={amount}
      onSuccess={a => {
        console.log(a);
      }}
      options={{
        clientId
      }}
    />
  );
};

export default PaymentButtons;
