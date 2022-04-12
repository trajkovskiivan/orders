const { response } = require("express");
const db = require("./models/index");

const insertOrder = async (order) => {
  return db.Order.insertMany(order)
    .then((response) => {
      console.log({ response });
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

module.exports = {
  insertOrder,
  getAllOrders,
};
