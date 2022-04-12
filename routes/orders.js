const express = require("express");
const axios = require("axios");
const fs = require("fs");
const CircularJSON = require("circular-json");
const tracking_Numbers = require("../db/data/moc_data");
const fetch = require("node-fetch");

const router = express.Router();

router.get("/", async (req, res) => {
  // console.log("tracking_Numbers: ", tracking_Numbers);

  let numbers = Object.values(tracking_Numbers);
  // let numbers = Object.values(tracking_Numbers).slice(0, 5).join(",");
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
  const data = await response.json();

  console.log({ data });
  return res.send(data);

  return await axios
    .get(
      // const result = await axios.get(
      `https://api.trackingmore.com/v2/trackings/get?numbers=${numbers}`,
      {
        Headers: {
          "Content-Type": "application/json",
          "Trackingmore-Api-Key": "pd54geui-pqrd-f6ao-u99e-whhz1lpjle0y",
        },
      }
    )
    .then((response) => {
      console.log({ response });
      let json = CircularJSON.stringify(response);
      res.send(response);
    })
    .catch((error) => {
      console.log(error);
    });

  // return await axios({
  //   url: `https://api.trackingmore.com/v2/trackings/get?numbers=${numbers}`,
  //   method: "get",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Trackingmore-Api-Key": "pd54geui-pqrd-f6ao-u99e-whhz1lpjle0y",
  //   },
  // })
  //   .then((result) => {
  //     res.status(200).json({
  //       data: result,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log("ERROR: ", err.message);
  //     res.status(400).json({
  //       error: err.message,
  //     });
  //   });

  res.status(200).send({
    data: result,
  });
});

module.exports = router;
