const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const inputLocation = process.argv[2];
if (!inputLocation) console.log('please enter location to the argument!');
else {
  geoCode(inputLocation, (error, { latitude, longitude, location } = {}) => {
    if (error) return console.log('Error:', error);

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return console.log('Error:', error);

      console.log(location);
      console.log(forecastData);
    });
  });
}
