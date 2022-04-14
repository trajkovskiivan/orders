const fetch = require("node-fetch");
require("dotenv").config();

const fetchInterceptor = async (url, method) => {
  return await fetch(url, {
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      "Trackingmore-Api-Key": process.env.API_KEY,
    },
  });
};

module.exports = fetchInterceptor;
