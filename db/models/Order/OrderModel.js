const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewTackInfo = newSchema({
  ActType: { type: String, default: null },
  Date: { type: String, default: null },
  StatusDescription: { type: String, default: null },
  Details: { type: String, default: null },
  checkpoint_status: { type: String, default: null },
  substatus: { type: String, default: null },
});

const Order = new Schema(
  {
    tracking_number: {
      type: String,
      required: [true, "Order needs a tracking number"],
    },
    carrier_code: { type: String, default: null },
    status: { type: String, default: null },
    track_update: { type: Boolean, default: null },
    created_at: { type: String, default: null },
    updated_at: { type: String, default: null },
    order_create_time: { type: String, default: null },
    customer_email: { type: String, default: null },
    customer_phone: { type: String, default: null },
    title: { type: String, default: null },
    order_id: { type: String, default: null },
    comment: { type: String, default: null },
    customer_name: { type: String, default: null },
    archived: { type: Boolean, default: null },
    original_country: { type: String, default: null },
    destination_country: { type: String, default: null },
    singed_by: { type: String, default: null },
    itemTimeLength: { type: String, default: null },
    stayTimeLength: { type: String, default: null },
    origin_info: {
      ReferenceNumber: { type: String || Boolean || Number, default: null },
      ItemReceived: { type: String || Boolean || Number, default: null },
      ItemDispatched: { type: String || Boolean || Number, default: null },
      DepartfromAirport: { type: String || Boolean || Number, default: null },
      ArrivalfromAbroad: { type: String || Boolean || Number, default: null },
      CustomsClearance: { type: String || Boolean || Number, default: null },
      DestinationArrived: { type: String || Boolean || Number, default: null },
      weblink: { type: String, default: null },
      phone: { type: String, default: null },
      carrier_code: { type: String, default: null },
      trackinfo: [NewTackInfo],
    },
    destination_info: {
      ItemReceived: { type: Boolean, default: null },
      ItemDispatched: { type: Boolean, default: null },
      DepartfromAirport: { type: Boolean, default: null },
      ArrivalfromAbroad: { type: Boolean, default: null },
      CustomsClearance: { type: Boolean, default: null },
      DestinationArrived: { type: Boolean, default: null },
      weblink: { type: String, default: null },
      phone: { type: String, default: null },
      carrier_code: { type: String, default: null },
      trackinfo: { type: String, default: null },
    },
    service_code: { type: String, default: null },
    status_info: { type: String, default: null },
    weight: { type: String, default: null },
    substatus: { type: String, default: null },
    packageStatus: { type: String, default: null },
    lastEvent: { type: String, default: null },
    lastUpdateTime: { type: String, default: null },
  },
  { collection: "Orders" }
);

module.exports = mongoose.model("Orders", Order);
