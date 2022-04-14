import React, { useState, useEffect } from "react";
import axios from "axios";

const New = () => {
  const [newTrackingNumber, setNewTrackingNumber] = useState("");

  const addNewTrackingNumber = () => {
    console.log({ newTrackingNumber });
    axios
      .post("http://127.0.0.1:5050/api/orders/new", {
        trackingNumber: newTrackingNumber,
      })
      .then((response) => {
        ("/orders");
      })
      .catch((err) => {
        console.log("ERROR: ", err.message);
      });
  };
  return (
    <div>
      <p>Add new Tracking Number</p>
      <input
        value={newTrackingNumber}
        onChange={(e) => setNewTrackingNumber(e.target.value)}
        type="search"
        placeholder="Search"
      />
      <br />
      <br />
      <br />

      <button disabled={!newTrackingNumber} onClick={addNewTrackingNumber}>
        Check
      </button>
    </div>
  );
};

export default New;
