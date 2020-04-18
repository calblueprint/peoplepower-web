import React from 'react';
import moment from 'moment';

class TransactionList extends React.PureComponent {
  render() {
    const { payments } = this.props;
    const filteredList = payments.filter(
      transaction => transaction.type !== 'Bill Payment'
    );
    if (filteredList.length === 0) {
      return (
        <div className="investments-transaction-card">
          <div className="investments-transaction-card-heading">
            <h4>No transactions found</h4>
          </div>
        </div>
      );
    }
    const list = filteredList.map((payment, index) => {
      const { type, amount, dateCreated, id } = payment;
      const quantity = amount / 100;
      const dateFormatted = moment(dateCreated).format('MMMM D, YYYY');

      return (
        <div key={id} className="investments-transaction-card">
          <div className="investments-transaction-card-heading">
            <h4>{type === 'Buy Shares' ? 'Share' : type}</h4>
            <h5>
              {type === 'Buy Shares' ? '-' : '+'}${amount}.00
            </h5>
          </div>
          <div className="investments-transaction-card-details">
            {type === 'Dividend' ? null : <p>Quantity: {quantity}</p>}
            <h6>{dateFormatted}</h6>
            {index === filteredList.length - 1 ? null : <hr />}
          </div>
        </div>
      );
    });

    return <div className="investments-displayed-list">{list}</div>;
  }
}

export default TransactionList;
