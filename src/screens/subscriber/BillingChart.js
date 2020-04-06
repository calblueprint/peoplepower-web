import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
  title: {
    text: ''
  },

  legend: {
    layout: 'horizontal',
    align: 'bottom',
    horizontalAlign: 'middle'
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      pointStart: 2010
    }
  },

  series: [
    {
      name: "What You've Paid",
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    },
    {
      name: '"Would-be" costs',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }
  ],

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }
    ]
  }
};

export default class BillingCharts extends React.PureComponent {
  render() {
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }
}
