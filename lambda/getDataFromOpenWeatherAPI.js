const sendRequest = require('./sendRequest');


const getDataFromOpenWeatherAPI = async (APIKEY, city) => {
    
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    
    const host = 'api.openweathermap.org';
    
    const options = {
        host: host, //_hostname : example.com, passed from event as a parameter
        port: 443,
        headers: {
         'Content-Type': 'application/json',
        }
    };
    const path = '/data/2.5/weather?q='+city+'&appid='+APIKEY;
    
    const result = await sendRequest(options, path, ''); //_pathname : /user/add, passed from event as a parameter
    
    return result;
};

module.exports = getDataFromOpenWeatherAPI;