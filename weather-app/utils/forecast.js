const request = require('request');

const forecast = (lng, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=47714dc2354957191d6f7b823b3bc06a&query=${lat},${lng}&units=f`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback(`unable to find location.(${body.error.code})`, undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out, and It feels like ${body.current.feelslike}.`
      );
    }
  });
};

module.exports = forecast;
