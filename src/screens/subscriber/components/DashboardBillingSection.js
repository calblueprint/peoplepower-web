import React from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table-v6';
import { centsToDollars } from '../../../lib/subscriberUtils';
import RightArrow from '../../../assets/right_arrow.png';

export default class DashboardBilling extends React.PureComponent {
  render() {
    const { totalBalance, data } = this.props;
    return (
      <div>
        <div className="subscriber-section-header">
          <div className="subscriber-header">Billing Summary</div>
          <Link to="/billing">
            <img src={RightArrow} alt="right arrow" />
          </Link>
        </div>
        <div className="subscriber-section-body">
          <div>
            <div className="subscriber-billing-container">
              <div className="subscriber-billing-current-container">
                <div className="subscriber-billing-header">Current Balance</div>
                <h3 className="subscriber-billing-balance">
                  ${centsToDollars(totalBalance)}
                </h3>
                <div>
                  <button
                    type="button"
                    className={`subscriber-billing-make-payment-button ${
                      totalBalance === 0 ? 'disabled' : ''
                    }`}
                    disabled={totalBalance === 0}
                  >
                    <Link
                      to={{
                        pathname: '/billing',
                        mode2: 1
                      }}
                      className="subscriber-link-text-white"
                    >
                      Make Payment
                    </Link>
                  </button>
                </div>
              </div>
              <div className="subscriber-billing-recent-container">
                <div className="subscriber-billing-header-inline">
                  <div className="subscriber-billing-header">
                    Recent Transactions
                  </div>
                  <div>
                    <button
                      type="button"
                      className="subscriber-billing-view-all-button"
                    >
                      <Link
                        to={{ pathname: '/billing', state: { mode2: 1 } }}
                        className="subscriber-link-text-white "
                      >
                        View All
                      </Link>
                    </button>
                  </div>
                </div>
                <ReactTable
                  data={data}
                  columns={[
                    {
                      id: 'statementDate',
                      accessor: d => (
                        <div className="subscriber-billing-recent-row ">
                          {d.statementDate}
                        </div>
                      )
                      // width: 100
                    },
                    {
                      id: 'description',
                      accessor: d => (
                        <div className="subscriber-billing-recent-row ">
                          <b>{d.description}</b>
                        </div>
                      ),
                      width: 200
                    },
                    {
                      id: 'amtDue',
                      accessor: d => (
                        <div className="subscriber-billing-recent-row ">
                          {d.amtDue ? `+${d.amtDue}` : `-${d.payment}`}
                        </div>
                      )
                      // width: 150
                    },
                    {
                      id: 'status',
                      accessor: d => (
                        <div className="subscriber-billing-recent-row ">
                          {d.status}
                        </div>
                      )
                      // width: 100
                    }
                  ]}
                  getTdProps={() => ({
                    style: { border: 'none' }
                  })}
                  defaultPageSize={2}
                  className="subscriber-billing-recent-table"
                  showPagination={false}
                  getTrGroupProps={() => {
                    return {
                      style: {
                        border: 'none'
                      }
                    };
                  }}
                  getTheadProps={() => {
                    return {
                      style: {
                        boxShadow: 'none'
                      }
                    };
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
