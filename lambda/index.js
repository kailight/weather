const getDataFromOpenWeatherAPI = require('getDataFromOpenWeatherAPI');
const getOpenWeatherApiKey = require('./getOpenWeatherApiKey');
const Elasticache = require('./libs/Elasticache');

let APIKEY
// c5254ab10aedd127eede81f24e4cf25c

exports.handler = async (event, context) => {

  const city = event.city || 'Non Existent City Name'; // event._city: 'Cityname', passed from event as a parameter

  let cachedData;
  try {
    console.log("Test1");
    cachedData = await Elasticache.read(city);
    console.log("Test2");
  } catch (e) {
    console.log( 'Issue reading from cache', e);
    return {
      statusCode: 500,
      body: JSON.stringify( 'Issue reading from cache' )
    };
  }

  if (cachedData) {
    cachedData._cached = true;
    return {
      statusCode: 200,
      body: JSON.stringify({ cachedData } )
    };
  }

/*
  return {
      statusCode: 200,
      body: 'stub'
  };
*/

  let data;
  try {

    if (!APIKEY) {
      console.log('Retrieving secret from Secrets Manager');
      APIKEY = await getOpenWeatherApiKey();
      console.log('Got secret from Secrets Manager', APIKEY);
    }
    console.log('Getting data from OpenWeatherAPI', APIKEY);
    data = await getDataFromOpenWeatherAPI(APIKEY, city);
    console.log('Got data from OpenWeatherAPI', APIKEY);

  } catch(e) {

    console.log('Issue with OpenWeather API', e);
    return {
      statusCode: 500,
      body: JSON.stringify( 'Issue with OpenWeather API' )
    };

  }


  if (data) {
    try {
      await Elasticache.write(city, data);
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        body: JSON.stringify( 'Issue writing to cache' )
      };
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };


};
