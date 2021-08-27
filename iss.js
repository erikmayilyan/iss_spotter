const request = require('request');
const api = "https://api.ipify.org?format=json";

const fetchMyIP = function(callback) { 
  console.log(callback);
  // use request to fetch IP address from JSON API
  request(api, function(error, response, body) {
    if (error) {
      console.error('error:', error);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
    }
    const ip = JSON.parse(body).ip;
    console.log(ip);
    callback(null, ip);
  });
}

module.exports = { fetchMyIP };

