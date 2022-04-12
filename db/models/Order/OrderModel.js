const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewTackInfo = newSchema({
  ActType: String,
  Date: String,
  StatusDescription: String,
  Details: String,
  checkpoint_status: String,
  substatus: String,
});

const Order = new Schema(
  {
    tracking_number: {
      type: String,
      required: [true, "Order needs a tracking number"],
    },
    carrier_code: String,
    created_at: String,
    customer_phone: String,
    title: String,
    order_id: String,
    comment: String,
    customer_name: String,
    archived: Boolean,
    original_country: String,
    destination_country: String,
    singed_by: String,
    itemTimeLength: String,
    stayTimeLength: String,
    origin_info: {
      ReferenceNumber: String || Boolean || Number,
      ItemReceived: String,
      ItemDispatched: String || Boolean || Number,
      DepartfromAirport: String || Boolean || Number,
      ArrivalfromAbroad: String || Boolean || Number,
      CustomsClearance: String || Boolean || Number,
      DestinationArrived: String || Boolean || Number,
      weblink: String,
      phone: String,
      carrier_code: "String",
      trackinfo: [NewTackInfo],
    },
    service_code: String,
    status_info: String,
    weight: String,
    substatus: String,
    packageStatus: String,
    lastEvent: String,
    lastUpdateTime: String,
  },
  { collection: "Orders" }
);

module.exports = mongoose.model("Orders", Order);
