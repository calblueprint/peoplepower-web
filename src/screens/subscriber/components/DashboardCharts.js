import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import createCostSavingsChart from '../../../lib/charts/costSavingsChart';
import ProductionChartSubscriber from '../../../components/ProductionChartSubscriber';

export default class DashboardChartsSection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
    this.switchChartView = this.switchChartView.bind(this);
  }

  // need to make sure the value doesnt switch if its the same button
  switchChartView = e => {
    const { hasShares } = this.props;
    if (!hasShares) {
      return;
    }
    // const { activeTab } = this.state;
    const toSelect = parseInt(e.target.value, 10);
    this.setState(prevState => {
      const { activeTab: prevActiveTab } = prevState;
      if (prevActiveTab === toSelect) {
        return {};
      }
      return { activeTab: toSelect };
    });
  };

  render() {
    const { hasShares } = this.props;
    const { activeTab } = this.state;
    return (
      <div>
        <div className="subscriber-section-tabs">
          <button
            type="button"
            onClick={e => this.switchChartView(e)}
            value={0}
            className={`subscriber-billing-tab ${
              activeTab === 0 ? 'active' : ''
            }`}
          >
            My Solar Project
          </button>
          {hasShares ? (
            <button
              type="button"
              onClick={e => this.switchChartView(e)}
              value={1}
              className={`subscriber-billing-tab ${
                activeTab === 1 ? 'active' : ''
              }`}
            >
              Community Solar Projects
            </button>
          ) : null}
        </div>
        {activeTab === 0 ? (
          <div className="subscriber-section-body">
            <div className="subscriber-billing-chart-container">
              <h3>Effective Cost</h3>
              <HighchartsReact
                highcharts={Highcharts}
                options={createCostSavingsChart([
                  { month: 'Jan', cost: 23, wouldBeCost: 100 },
                  { month: 'Feb', cost: 47, wouldBeCost: 112 },
                  { month: 'Mar', cost: 85, wouldBeCost: 130 },
                  { month: 'Apr', cost: 23, wouldBeCost: 123 },
                  { month: 'May', cost: 47, wouldBeCost: 147 },
                  { month: 'Jun', cost: 85, wouldBeCost: 185 }
                ])}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        ) : (
          <div className="subscriber-section-body">
            <div className="subscriber-billing-chart-container">
              <ProductionChartSubscriber
                data={[
                  { month: 'Jan', production: 23 },
                  { month: 'Feb', production: 47 },
                  { month: 'Mar', production: 85 },
                  { month: 'Apr', production: 23 },
                  { month: 'May', production: 47 },
                  { month: 'Jun', production: 85 }
                ]}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
