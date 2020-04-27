import moment from 'moment';

// Calculate total solar project production and format in a way consumable by HighCharts
const calculateSolarProjectProduction = solarProjects => {
  // Combine multiple Solar Projects' production data into ONE production data object.
  const productionDataObject = solarProjects.reduce((objectSoFar, project) => {
    let { monthlyProductionData } = project;
    // If this project does not have any data, skip by returning object so far
    if (!monthlyProductionData) {
      return { ...objectSoFar };
    }

    // Else, combine the two objects by adding any keys they have in common
    monthlyProductionData = JSON.parse(monthlyProductionData);
    return Object.keys(monthlyProductionData).reduce(
      (prev, date) => {
        return {
          ...prev,
          [date]: (prev[date] || 0) + monthlyProductionData[date]
        };
      },
      { ...objectSoFar }
    );
  }, {});

  // Sort Production Data by month and convert to data format for chart
  const data = Object.keys(productionDataObject)
    .map(date => [moment(date, 'MM/YYY'), productionDataObject[date]])
    .sort((a, b) => a[0] - b[0])
    .reduce(
      (dataSoFar, date) => [
        ...dataSoFar,
        { month: date[0].format('MMM'), production: date[1] }
      ],
      []
    );
  const totalEnergy = Object.keys(productionDataObject).reduce(
    (total, month) => total + productionDataObject[month],
    0
  );
  return { data, totalEnergy };
};

export default calculateSolarProjectProduction;
