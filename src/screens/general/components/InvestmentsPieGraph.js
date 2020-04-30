import React from 'react';
import {
  Highcharts,
  HighchartsReact
} from '../../../lib/highcharts/highCharts';
import createInvestmentBreakdownChart from '../../../lib/highcharts/createInvestmentBreakdownChart';

export default class InvestmentsPieGraph extends React.PureComponent {
  render() {
    const { investmentBreakdowns } = this.props;
    const data = investmentBreakdowns.map(d => ({
      name: d.categoryName,
      value: d.percentage,
      color: d.color
    }));
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={createInvestmentBreakdownChart(data)}
      />
    );
  }
}
