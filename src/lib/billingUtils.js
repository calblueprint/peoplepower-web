// Ensures that when backspacing or entering values, result is a valid dollar amount
const processCurrencyInput = (event, balance, paymentAmount) => {
  event.preventDefault();
  let newAmount = paymentAmount;
  if (event.nativeEvent.key === 'Backspace') {
    let paymentAmountInCents = paymentAmount * 100;
    paymentAmountInCents = Math.floor(paymentAmountInCents / 10);
    newAmount = paymentAmountInCents / 100;
  } else if (/^[0123456789]$/.test(event.nativeEvent.key)) {
    newAmount = paymentAmount * 10 + parseFloat(event.nativeEvent.key) / 100;
  }
  newAmount = Math.max(0.0, newAmount); // Pay atleast 1 cent
  newAmount = Math.min(balance, newAmount); // Pay no more than balance
  return Number(newAmount.toFixed(2));
};

export default processCurrencyInput;
