const getColor1 = (opacity = 1) => `rgba(98, 177, 111, ${opacity})`; // Green
const getColor2 = (opacity = 1) => `rgba(224, 182, 76, ${opacity})`; // Yellow

// Expects Data formatted as so: [{month: 'Jan', cost: 1234, wouldBeCost: 12451}, ...]
export default data => ({
  chart: {
    height: 250,
    style: {
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
    backgroundColor: '#24364D',
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
      color: getColor1(),
      lineColor: getColor1(),
      fillColor: {
        linearGradient: [0, 0, 0, 300],
        stops: [[0, getColor1(0.4)], [1, getColor1(0.01)]]
      },
      marker: {
        fillColor: getColor1(),
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
      color: getColor1(),
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
      color: getColor2(),
      pointPlacement: 'on',
      lineColor: getColor2(),
      marker: {
        fillColor: getColor2(),
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
