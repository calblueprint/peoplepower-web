import Colors from '../../colors';

const { PP_CHART_YELLOW, PP_CHART_GREEN, PP_CHART_TOOLTIP_BG } = Colors;

// Expects Data formatted as so: [{month: 'Jan', cost: 1234, wouldBeCost: 12451}, ...]
export default data => ({
  chart: {
    height: 250,
    style: {
      // TODO: This doesn't seem to be working. We need to figure out how to do this.
      fontFamily: 'Sofia Pro'
    }
  },
  title: {
    text: ''
  },
  credits: {
    enabled: false
  },
  xAxis: {
    categories: data.map(d => d.month)
  },
  yAxis: {
    title: 'Effective Cost',
    labels: {
      formatter() {
        return `${this.value} kWh`;
      }
    }
  },
  tooltip: {
    formatter() {
      return `${this.points.reduce((s, point) => {
        return `${s}<br/><span style="color:${point.color}">—</span>  $${point.y}`;
      }, `<b>${this.x}</b>`)}<br/>$${this.points[1].y -
        this.points[0].y} saved`;
    },
    shared: true,
    backgroundColor: PP_CHART_TOOLTIP_BG,
    style: {
      color: '#FFFFFF'
    }
  },
  series: [
    {
      type: 'areaspline',
      name: 'Cost of People Power',
      showInLegend: false,
      data: data.map(d => d.cost),
      pointPlacement: 'on',
      color: PP_CHART_GREEN(),
      lineColor: PP_CHART_GREEN(),
      fillColor: {
        linearGradient: [0, 0, 0, 300],
        stops: [[0, PP_CHART_GREEN(0.4)], [1, PP_CHART_GREEN(0.01)]]
      },
      marker: {
        fillColor: PP_CHART_GREEN(),
        enabled: false,
        symbol: 'circle',
        states: {
          hover: {
            enabled: true
          }
        }
      }
    },
    {
      // Dummy Series for Legend
      type: 'spline',
      name: 'Cost of People Power',
      pointPlacement: 'on',
      data: [],
      color: PP_CHART_GREEN(),
      marker: {
        enabled: false,
        symbol: 'circle',
        states: {
          hover: {
            enabled: true
          }
        }
      }
    },
    {
      type: 'spline',
      name: 'Cost of PG&E',
      data: data.map(d => d.wouldBeCost),
      color: PP_CHART_YELLOW(),
      pointPlacement: 'on',
      lineColor: PP_CHART_YELLOW(),
      marker: {
        fillColor: PP_CHART_YELLOW(),
        enabled: false,
        symbol: 'circle',
        states: {
          hover: {
            enabled: true
          }
        }
      }
    }
  ]
});
