Highcharts.chart('container', {
  title: {
    text: ''
  },
  xAxis: {
    allowDecimals: false,
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
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
    backgroundColor: '#CD6795',
    style: {
      color: '#FFFFFF'
    }
  },
  series: [
    {
      data: [270, 326, 500, 590, 580, 620],
      type: 'areaspline',
      pointPlacement: 'on',
      lineColor: '#CD6795',
      fillColor: {
        linearGradient: [0, 0, 0, 300],
        stops: [
          [
            0,
            Highcharts.color('#CD6795')
              .setOpacity(0.4)
              .get('rgba')
          ],
          [
            1,
            Highcharts.color('#CD6795')
              .setOpacity(0.01)
              .get('rgba')
          ]
        ]
      },
      marker: {
        fillColor: '#CD6795',
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

Highcharts.chart('container', {
  title: {
    text: ''
  },
  xAxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ]
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
      return `${this.points.reduce(function(s, point) {
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
      data: [54, 49, 88, 75, 95, 60, 51, 88, 102, 80, 60, 51],
      pointPlacement: 'on',
      color: '#62B16F',
      lineColor: '#62B16F',
      fillColor: {
        linearGradient: [0, 0, 0, 300],
        stops: [
          [
            0,
            Highcharts.color('#62B16F')
              .setOpacity(0.4)
              .get('rgba')
          ],
          [
            1,
            Highcharts.color('#62B16F')
              .setOpacity(0.01)
              .get('rgba')
          ]
        ]
      },
      marker: {
        fillColor: '#62B16F',
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
      data: [100, 95, 155, 120, 180, 102, 91, 146, 190, 140, 105, 98],
      color: '#E0B64C',
      pointPlacement: 'on',
      lineColor: '#E0B64C',
      marker: {
        fillColor: '#E0B64C',
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

Highcharts.chart('container', {
  title: {
    text: ''
  },
  series: [
    {
      type: 'pie',
      data: [
        {
          name: 'Operation & Growing Co-op',
          y: 18
        },
        {
          name: 'Installation',
          y: 12
        },
        {
          name: 'Community Dividends',
          y: 10
        },
        {
          name: 'System Maintenance',
          y: 60
        }
      ],
      enableMouseTracking: false,
      dataLabels: {
        distance: 10,
        enabled: true,
        format: '{point.name}',
        connectorColor: '#000000',
        color: '#24364D',
        style: {
          fontWeight: 'light'
        }
      }
    }
  ]
});
