import React, { PureComponent } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import EmptyStateGraph from '../assets/empty-state-graph.png';
import createCostSavingsChart from '../lib/highcharts/createCostSavingsChart';

class EffectiveCostChart extends PureComponent {
  render() {
    const { data } = this.props;
    if (data.length === 0) {
      return (
        <div className="prod-chart-empty-container">
          <img
            className="prod-chart-empty-img"
            src={EmptyStateGraph}
            alt="No Production Data"
          />
          <div className="prod-chart-empty-title">No Data Available</div>

          <div className="prod-chart-empty-detail">
            Looks like there’s no data available for your effective costs yet.
            Check back later!
          </div>
        </div>
      );
    }
    return (
      <div>
        <h3>Effective Cost</h3>
        <HighchartsReact
          highcharts={Highcharts}
          options={createCostSavingsChart(data)}
          style={{ width: '100%' }}
        />
      </div>
    );
  }
}

export default EffectiveCostChart;
