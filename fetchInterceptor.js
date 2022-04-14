const fetch = require("node-fetch");

const fetchInterceptor = async (url, method) => {
  return await fetch(url, {
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      "Trackingmore-Api-Key": "pd54geui-pqrd-f6ao-u99e-whhz1lpjle0y",
    },
  });
};

module.exports = fetchInterceptor;
