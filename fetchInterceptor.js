const fetch = require("node-fetch");

const fetchInterceptor = async (url, method) => {
  return await fetch(url, {
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      "Trackingmore-Api-Key": "",
    },
  });
};

module.exports = fetchInterceptor;
