import React from 'react';
import moment from 'moment';

class TransactionList extends React.PureComponent {
  render() {
    const { payments } = this.props;
    const filteredList = payments.filter(
      transaction => transaction.type !== 'Bill Payment'
    );
    const list = filteredList.map(payment => {
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
            <hr />
          </div>
        </div>
      );
    });

    return <div style={{ overflow: 'auto' }}>{list}</div>;
  }
}

export default TransactionList;
