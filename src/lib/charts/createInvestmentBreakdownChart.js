import Colors from '../../colors';

const { PP_PIE_CHART_TEXT_COLOR } = Colors;

// Expects Data formatted as so: [{name: 'Section 1', value: 12.3, color: #123124}, ...]
export default data => ({
  title: {
    text: ''
  },
  credits: {
    enabled: false
  },
  series: [
    {
      type: 'pie',
      data: data.map(d => ({ ...d, y: d.value, value: undefined })),
      enableMouseTracking: false,
      dataLabels: {
        distance: 10,
        enabled: true,
        format: '{point.name}',
        connectorColor: '#000000',
        color: PP_PIE_CHART_TEXT_COLOR,
        style: {
          fontWeight: 'light'
        }
      }
    }
  ]
});
