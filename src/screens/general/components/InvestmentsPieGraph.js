import React from 'react';
import { VictoryPie } from 'victory';
import Label from './Label';

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
    return (
      <VictoryPie
        height={400}
        width={400}
        radius={105}
        colorScale={colorList}
        // animate={{ duration: 300 }}
        data={dataList}
        x="x"
        y="y"
        style={{
          data: {
            fillOpacity: 0.9,
            stroke: '#fff',
            strokeWidth: 3
          }
        }}
        labelComponent={
          <Label
            innerRadius={75}
            radius={100}
            nameKey="x"
            valueKey="y"
            cx={200}
            cy={200}
          />
        }
      />
    );
  }
}
