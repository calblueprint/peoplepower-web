const getColor = (opacity = 1) => `rgba(205, 103, 149, ${opacity})`; // Pink

// Expects Data formatted as so: [{month: 'Jan', production: 1234}, {month: 'Feb', production: 2345}, ...]
export default (data, height = 250) => ({
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
    backgroundColor: getColor(),
    style: {
      color: '#FFFFFF'
    }
  },
  series: [
    {
      data: data.map(d => d.production),
      type: 'areaspline',
      pointPlacement: 'on',
      showInLegend: false,
      color: getColor(),
      lineColor: getColor(),
      shadow: false,
      fillColor: {
        linearGradient: [0, 0, 0, 300],
        stops: [[0, getColor(0.4)], [1, getColor(0.05)]]
      },
      marker: {
        fillColor: getColor(),
        enabled: false,
        states: {
          hover: {
            enabled: true
          }
        }
      }
    }
  ]
});
