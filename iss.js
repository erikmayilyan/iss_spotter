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

const fetchCoordsByIP = function(ip, callback) {
  const ipv4 = `https://freegeoip.app/json/${ip}`;
  request(ipv4, function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`));
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  })
};

module.exports = { fetchMyIP, fetchCoordsByIP };