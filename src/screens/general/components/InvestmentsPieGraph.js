import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import createInvestmentBreakdownChart from '../../../lib/charts/investmentBreakdownChart';

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
