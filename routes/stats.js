const express = require("express");
const {
  getOrdersCount,
  getAvgDeliveryTime,
  getAvgDestinationDeliveryTime,
} = require("../db/dbMethods");
const db = require("../db/models/index");
const { msToTime } = require("../helpers");

const router = express.Router();

router.get("/", async (req, res) => {
  let count = await getOrdersCount();
  let avgDelivery = await getAvgDeliveryTime();
  if (avgDelivery && count) {
    let newDelivery = await avgDelivery.map((d) => {
      let timePass =
        new Date(d.delivered).getTime() - new Date(d.received).getTime();
      return {
        timePass: timePass,
      };
    });
    let avg =
      (await newDelivery.reduce((a, b) => {
        return a + b.timePass;
      }, 0)) / newDelivery.length;
    return res
      .status(200)
      .send({ avg_time: msToTime(avg), count: count[0].count });
  }
  return res.status(401).send({});
});

router.post("/destination", async (req, res) => {
  const { from, to } = req.body;
  let avgDelivery = await getAvgDestinationDeliveryTime();
  if (avgDelivery) {
    let newDelivery = await avgDelivery
      .filter((d) => {
        return d.received.includes(from) && d.delivered.includes(to);
      })
      .map((d) => {
        let timePass =
          new Date(d.delivered_time).getTime() -
          new Date(d.received_time).getTime();
        return {
          timePass: timePass,
        };
      });
    let avg =
      (await newDelivery.reduce((a, b) => {
        return a + b.timePass;
      }, 0)) / newDelivery.length;
    return res
      .status(200)
      .send({ avg_time: msToTime(avg), count: newDelivery.length });
  }
  return res.status(401).send({});
});

module.exports = router;
