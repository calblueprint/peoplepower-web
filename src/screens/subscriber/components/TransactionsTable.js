import React from 'react';
import ReactTable from 'react-table-v6';

const TransactionTableHeader = ({ title }) => (
  <div className="subscriber-all-bills-row subscriber-all-bills-header">
    {title.toUpperCase()}
  </div>
);

const TransactionsTable = ({ transactions, numRows }) => {
  const fields = ['date', 'description', 'charge', 'payment', 'balance'];
  return (
    <ReactTable
      data={transactions}
      columns={fields.map(f => ({
        Header: <TransactionTableHeader title={f} />,
        id: { f },
        accessor: d => <div className="subscriber-all-bills-row">{d[f]}</div>
      }))}
      getTdProps={() => ({
        style: { border: 'none' }
      })}
      defaultPageSize={numRows || 10}
      className="-striped -highlight rt-custom-pp-style"
    />
  );
};

export default TransactionsTable;
