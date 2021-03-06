/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactTable from 'react-table-v6';
import '../../../styles/TransactionsTable.css';

const TransactionTableHeader = ({ title }) => (
  <div className="subscriber-all-bills-row subscriber-all-bills-header">
    {title.toUpperCase()}
  </div>
);

const TransactionsTable = ({
  transactions,
  numRows,
  showHeader,
  fieldsToShow,
  ...props
}) => {
  const fields = fieldsToShow || [
    'date',
    'description',
    'type',
    'charge',
    'payment',
    'balance'
  ];
  const headerVisible = showHeader === undefined ? true : showHeader;

  const evalWidth = element => {
    switch (element) {
      case 'description':
        return 200;
      case 'date':
        return 150;
      default:
        return undefined;
    }
  };

  return (
    <ReactTable
      data={transactions}
      columns={fields.map(f => ({
        Header: headerVisible && <TransactionTableHeader title={f} />,
        id: f,
        width: evalWidth(f),
        accessor: transaction => {
          if (transaction[f] === 'Charge' || transaction[f] === 'Payment') {
            return (
              <div
                className={`subscriber-all-bills-row transactions-table-cell transactions-table-${f} transactions-table-${transaction[
                  f
                ].toLowerCase()}`}
              >
                {transaction[f]}
              </div>
            );
          }
          return (
            <div
              className={`subscriber-all-bills-row transactions-table-cell transactions-table-${f}`}
            >
              {f === 'description' && transaction.url ? (
                <a href={transaction.url} target="_blank">
                  {transaction[f]}
                </a>
              ) : (
                <div>{transaction[f]}</div>
              )}
            </div>
          );
        }
      }))}
      getTdProps={() => ({
        style: {
          border: 'none'
        }
      })}
      defaultPageSize={numRows || 10}
      className="-striped -highlight rt-custom-pp-style transactions-table"
      {...props}
    />
  );
};

export default TransactionsTable;
