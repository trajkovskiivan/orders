const express = require("express");
const tracking_Numbers = require("../db/data/moc_data");
const fetch = require("node-fetch");
const { insertOrder, getAllOrders } = require("../db/dbMethods");
const db = require("../db/models/index");

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getAllOrders();
  if (response) {
    return res.status(200).send(response);
  }
  return res.status(400).send([]);
});

router.get("/fill_database", async (req, res) => {
  // console.log("tracking_Numbers: ", tracking_Numbers);

  let numbers = Object.values(tracking_Numbers);
  // let numbers = Object.values(tracking_Numbers).slice(0, 1).join(",");
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
  // console.log({ response });
  const data = await response.json();
  // return res.status(200).send(data.data);
  const newItem = await insertOrder(data.data.items);
  if (newItem) {
    return res.status(200).send(newItem);
  }
  // console.log({ data });
  return res.status(401).send({});
});

router.get("/tracking_numbers", async (req, res) => {
  await db.Order.collection
    .distinct("tracking_number")
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => {
      return res.status(401).send({
        staus: "Fail",
        error: err.message,
      });
    });
});

router.get("/delete_all", async (req, res) => {
  await db.Order.deleteMany({});
});

module.exports = router;
