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
  return (
    <ReactTable
      data={transactions}
      columns={fields.map(f => ({
        Header: headerVisible && <TransactionTableHeader title={f} />,
        id: f,
        width: f === 'description' ? 200 : undefined,
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
                {transaction[f]}
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
      className="-striped -highlight rt-custom-pp-style"
      {...props}
    />
  );
};

export default TransactionsTable;
