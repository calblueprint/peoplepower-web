import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import createCostSavingsChart from '../../../lib/charts/costSavingsChart';
import ProductionChart from '../../../components/ProductionChart';

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
                  { month: 'Jan', cost: 54, wouldBeCost: 100 },
                  { month: 'Feb', cost: 49, wouldBeCost: 95 },
                  { month: 'Mar', cost: 88, wouldBeCost: 155 },
                  { month: 'Apr', cost: 75, wouldBeCost: 120 },
                  { month: 'May', cost: 95, wouldBeCost: 180 },
                  { month: 'Jun', cost: 60, wouldBeCost: 102 },
                  { month: 'Jul', cost: 51, wouldBeCost: 91 },
                  { month: 'Aug', cost: 88, wouldBeCost: 146 },
                  { month: 'Sep', cost: 102, wouldBeCost: 190 },
                  { month: 'Oct', cost: 80, wouldBeCost: 140 },
                  { month: 'Nov', cost: 60, wouldBeCost: 105 },
                  { month: 'Dec', cost: 51, wouldBeCost: 98 }
                ])}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        ) : (
          <div className="subscriber-section-body">
            <div className="subscriber-billing-chart-container">
              <ProductionChart
                type={1}
                data={[
                  { month: 'Jan', production: 270 },
                  { month: 'Feb', production: 326 },
                  { month: 'Mar', production: 500 },
                  { month: 'Apr', production: 590 },
                  { month: 'May', production: 580 },
                  { month: 'Jun', production: 620 }
                ]}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
