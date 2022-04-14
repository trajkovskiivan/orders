const express = require("express");
const tracking_Numbers = require("../db/data/moc_data");
const {
  insertOrder,
  getAllOrders,
  insertTrackingNumbers,
  findTrackingNumber,
} = require("../db/dbMethods");
const db = require("../db/models/index");
const fetchInterceptor = require("../fetchInterceptor");

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getAllOrders();
  if (response) {
    return res.status(200).send(response);
  }
  return res.status(400).send([]);
});

router.post("/new", async (req, res) => {
  const trackingNumber = req.body.trackingNumber;
  const exists = await findTrackingNumber(trackingNumber);
  console.log("DOES IT EXIST ? ", exists);
  if (exists) {
    return res.status(401).send({ message: "The tracking Number Exists" });
  } else {
    console.log("BEFORE REQUEST");
    const response = await fetchInterceptor(
      `https://api.trackingmore.com/v2/trackings/get?numbers=${trackingNumber}`,
      "get"
    );
    const data = await response.json();
    console.log("DATA", data.data);
    if (data.data && data.data.length > 0) {
      return res.send(200).send({ json: data.data });
    }
    // const newItem = await insertOrder(data.data.items);
    // console.log({ newItem });
    // if (newItem) {
    //   return res.status(200).send(newItem);
    // }
    return res.status(404).send({ message: "Does not exist" });
  }
});

router.get("/fill_database", async (req, res) => {
  let numbers = Object.values(tracking_Numbers);
  // let numbers = Object.values(tracking_Numbers).slice(0, 1).join(",");
  const response = await fetchInterceptor(
    `https://api.trackingmore.com/v2/trackings/get?numbers=${numbers}`,
    "get"
  );
  const data = await response.json();
  // return res.status(200).send(data.data);
  const newItem = await insertOrder(data.data.items);
  if (newItem) {
    return res.status(200).send(newItem);
  }
  return res.status(401).send({});
});

router.post("/fill_trackings", async (req, res) => {
  let numbers = Object.values(tracking_Numbers);

  const newItem = await insertTrackingNumbers(numbers);
  if (newItem) {
    return res.status(200).send(newItem);
  }
  return res.status(401).send({});
});

router.post("/add_tracking_number", async (req, res) => {
  let track_id = req.body.track_id;
  return res.status(200).send({ track_id });
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
  await db.TrackingNumber.deleteMany({});
});

module.exports = router;
