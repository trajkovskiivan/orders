import React, { useState, useEffect } from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { fetchOrders } from "../../store/orders/order_action";
import { useOrders } from "../../hooks/useStateHooks";
import { prepareData } from "./helpers";
import Table from "../../components/Table";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useOrders();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const tableRows = () => {
    const data = prepareData(orders.data);
    return data
      .filter((item) => {
        return (
          item.tracking_number
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.order_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.shipment_date
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.delivery_date?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
      .map((item) => {
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
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="search"
        placeholder="Search"
      />
      <Table
        tableRows={tableRows}
        headers={[
          "Tracking Number",
          "Order Item",
          "Status",
          "Shipment Date",
          "Delivery Date",
          "Route",
        ]}
      />
    </div>
  );
};

export default Orders;
