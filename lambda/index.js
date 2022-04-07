const getDataFromOpenWeatherAPI = require('getDataFromOpenWeatherAPI');
const getOpenWeatherApiKey = require('./getOpenWeatherApiKey');
const Elasticache = require('./libs/Elasticache');

let APIKEY

exports.handler = async (event, context) => {

  const city = event.city || 'Sochi'; // event._city: 'Cityname', passed from event as a parameter

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
    data = await getDataFromOpenWeatherAPI(city);
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