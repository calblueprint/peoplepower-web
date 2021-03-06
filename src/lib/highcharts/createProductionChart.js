// Pink
import Colors from '../../colors';

const { PP_CHART_PINK, PP_BASIC_WHITE } = Colors;

// Creates options object for Highcharts for production chart on all dashboards
// Expects Data formatted as so: [{month: 'Jan', production: 1234}, {month: 'Feb', production: 2345}, ...]
export default (productionData, height = 250) => {
  // If there's only one datapoint, duplicate it for a nicer view
  let data = productionData;
  if (data.length === 1) {
    data = [...data, { ...data[0] }]; // Duplicate data points
  }
  return {
    chart: {
      height
    },
    credits: {
      enabled: false
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: data.map(d => d.month)
    },
    yAxis: {
      title: '',
      labels: {
        formatter() {
          return `${this.value} kWh`;
        }
      }
    },
    tooltip: {
      formatter() {
        return `${this.y} kWh`;
      },
      shared: true,
      backgroundColor: PP_CHART_PINK(),
      style: {
        color: PP_BASIC_WHITE
      }
    },
    series: [
      {
        data: data.map(d => d.production),
        type: 'areaspline',
        pointPlacement: 'on',
        showInLegend: false,
        color: PP_CHART_PINK(),
        lineColor: PP_CHART_PINK(),
        shadow: false,
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [[0, PP_CHART_PINK(0.4)], [1, PP_CHART_PINK(0.05)]]
        },
        marker: {
          fillColor: PP_CHART_PINK(),
          enabled: false,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      }
    ]
  };
};
