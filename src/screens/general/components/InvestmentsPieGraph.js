import React from 'react';
import { VictoryPie, VictoryLabel } from 'victory';

export default class InvestmentsPieGraph extends React.PureComponent {
  render() {
    const { investmentBreakdowns } = this.props;
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
    const labelStyle = {
      fill: '#24364D',
      fontSize: '12px'
    };
    return (
      <VictoryPie
        data={dataList}
        colorScale={colorList}
        width={200}
        height={200}
        labelRadius={160}
        labelComponent={
          <VictoryLabel
            className="pie-graph-label-text"
            style={labelStyle}
            textAnchor="middle"
          />
        }
      />
    );
  }
}
