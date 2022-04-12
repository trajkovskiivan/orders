const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TrackingNumber = new Schema(
  {
    id: {
      type: String,
      required: [true, "We need a Tracking Number"],
    },
  },
  { collection: "TrackingNumbers" }
);

module.exports = mongoose.model("TrackingNumbers", TrackingNumber);
