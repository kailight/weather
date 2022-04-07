const redis = require("redis");

// @todo move to config at least
const { host } = require('config').redis;

const client = redis.createClient({
  socket: {
    host
  }
});


const Elasticache = () => {

  const read = async (city) =>  {
    await client.connect();
    const value = await client.get(city);
    console.log('Got value from cache');
    client.quit();
    return value;
  };
  
  const write = async (city, data = null) => {
    await client.connect();
    await client.set(city, data);
    client.quit();
    return true;
  };
  
  return { read, write };
    
};



module.exports = Elasticache();