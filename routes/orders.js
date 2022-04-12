const express = require("express");
const tracking_Numbers = require("../db/data/moc_data");
const fetch = require("node-fetch");

const router = express.Router();

router.get("/", async (req, res) => {
  // console.log("tracking_Numbers: ", tracking_Numbers);

  // let numbers = Object.values(tracking_Numbers);
  let numbers = Object.values(tracking_Numbers).slice(0, 1).join(",");
  const response = await fetch(
    `https://api.trackingmore.com/v2/trackings/get?numbers=${numbers}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Trackingmore-Api-Key": "",
      },
    }
  );
  console.log({ response });
  const data = await response.json();

  console.log({ data });
  return res.send(data);
});

module.exports = router;
