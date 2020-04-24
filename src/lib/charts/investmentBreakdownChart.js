// Expects Data formatted as so: [{name: 'Section 1', value: 12.3, color: #123124}, ...]
export default data => ({
  title: {
    text: ''
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
        color: '#24364D',
        style: {
          fontWeight: 'light'
        }
      }
    }
  ]
});
