const https = require('https');

const sendRequest = (defaultOptions, path, payload) => new Promise((resolve, reject) => {
    const options = { ...defaultOptions, path, method: 'GET' };
    const req = https.request(options, res => {
        let buffer = "";
        res.on('data', chunk => buffer += chunk);
        res.on('end', () => resolve(JSON.parse(buffer)));
    });
    req.on('error', e => reject(e.message));
    req.write(JSON.stringify(payload));
    req.end();
});

module.exports = sendRequest;