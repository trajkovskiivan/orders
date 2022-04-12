import React, { useState, useEffect } from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { fetchOrders } from "../../store/orders/order_action";
import { useOrders } from "../../hooks/useStateHooks";
import { prepareData } from "./helpers";

const Table = () => {
  const dispatch = useDispatch();
  const orders = useOrders();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const renderItems = () => {
    const data = prepareData(orders.data);
    return data.map((item) => {
      return (
        <tr>
          <td data-label="Tracking Number">{item.tracking_number || "-"}</td>
          <td data-label="Order Item">{item.order_id || "-"}</td>
          <td data-label="Status">{item.status || "-"}</td>
          <td data-label="Shipment Date">{item.shipment_date || "-"}</td>
          <td data-label="Delivery Date">{item.delivery_date || "-"}</td>
          <td data-label="Route">{item.route ? item.route[0] : "-"}</td>
        </tr>
      );
    });
  };
  return (
    <div>
      <table>
        <caption>Statement Summary</caption>
        <thead>
          <tr>
            <th scope="col">Tracking Number</th>
            <th scope="col">Order</th>
            <th scope="col">Status</th>
            <th scope="col">Shipment Date</th>
            <th scope="col">Delivery Date</th>
            <th scope="col">Route</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
};

export default Table;
