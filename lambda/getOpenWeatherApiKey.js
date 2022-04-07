const getSecret = require('getSecret');
const config = require('config');

const getOpenWeatherApiKey = async () => {

  const secretPath = config.secretPath;
  const region = "eu-central-1";
  
  try {
    let result = await getSecret(secretPath, region);
    // the key name should be OpenWeatherAPI
    result = JSON.parse(result).OpenWeatherAPI;
    return result;
  }
  catch(e) {
      return { error: e };
  }
    
};

module.exports = getOpenWeatherApiKey;