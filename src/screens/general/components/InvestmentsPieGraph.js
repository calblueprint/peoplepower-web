import React from 'react';
import { VictoryPie, VictoryLabel } from 'victory';

export default class InvestmentsPieGraph extends React.PureComponent {
  render() {
    const { investmentBreakdowns } = this.props;
    const labelStyle = {
      fill: '#24364D',
      fontSize: '20px'
    };
    const dataList = investmentBreakdowns.map(data => {
      const list = {
        x: data.categoryName,
        y: data.percentage,
        label: data.categoryName
      };

      return list;
    });
    const colorList = investmentBreakdowns.map(data => {
      return data.color;
    });
    return (
      <VictoryPie
        data={dataList}
        colorScale={colorList}
        width={550}
        height={550}
        labelRadius={160}
        labelComponent={
          <VictoryLabel
            className="investment-pie-graph-label-text"
            style={labelStyle}
            textAnchor="middle"
          />
        }
      />
    );
  }
}
