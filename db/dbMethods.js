const { response } = require("express");
const db = require("./models/index");

const findTrackingNumber = async (track_id) => {
  console.log({ track_id });
  return db.TrackingNumber.find({ track_id })
    .then((response) => {
      if (response && response.length > 0) {
        console.log("WE HAVE IT", response);
        return true;
      }
      console.log("WE DO NOT HAVE IT");
      return false;
    })
    .catch((err) => {
      console.log("ERROR tracking", err);
      return false;
    });
};

const insertOrders = async (order) => {
  return db.Order.insertMany(order)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("ERROR", err.message);
      return false;
    });
};

const getAllOrders = async () => {
  return db.Order.find({})
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("Error", err.message);
      return false;
    });
};

const insertOrder = async (order) => {
  return db.Order.collection
    .insertOne(order)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("ERROR", err.message);
      return false;
    });
};

const insertTrackingNumbers = async (numbers) => {
  let mapNumbers = numbers.map((n) => {
    return { track_id: n };
  });
  return db.TrackingNumber.insertMany(mapNumbers)
    .then((response) => {
      console.log({ response });
      return response;
    })
    .catch((err) => {
      console.log("ERROR", err.message);
      return false;
    });
};

const getOrdersCount = async () => {
  return db.Order.aggregate([{ $count: "count" }])
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("Error", err.message);
      return false;
    });
};

const getAvgDeliveryTime = async () => {
  return db.Order.aggregate([
    {
      $match: { status: "delivered" },
    },
    {
      $project: {
        id: 1,
        received: { $arrayElemAt: ["$origin_info.trackinfo.Date", -1] },
        delivered: { $arrayElemAt: ["$origin_info.trackinfo.Date", 1] },
      },
    },
  ])
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("Error", err.message);
      return false;
    });
};
const getAvgDestinationDeliveryTime = async (data) => {
  return db.Order.aggregate([
    {
      $match: { status: "delivered" },
    },
    {
      $project: {
        id: 1,
        received: { $arrayElemAt: ["$origin_info.trackinfo.Details", -2] },
        delivered: { $arrayElemAt: ["$origin_info.trackinfo.Details", 1] },
        received_time: { $arrayElemAt: ["$origin_info.trackinfo.Date", -1] },
        delivered_time: { $arrayElemAt: ["$origin_info.trackinfo.Date", 1] },
      },
    },
  ])
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("Error", err.message);
      return false;
    });
};

module.exports = {
  findTrackingNumber,
  insertOrder,
  insertOrders,
  getAllOrders,
  insertTrackingNumbers,
  getOrdersCount,
  getAvgDeliveryTime,
  getAvgDestinationDeliveryTime,
};
