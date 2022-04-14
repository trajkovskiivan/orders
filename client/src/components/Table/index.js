import React, { useState, useEffect } from "react";
import "./index.css";

const Table = ({ headers, tableRows }) => {
  const renderHeaders = () => {
    return headers.map((header) => <th scope="col">{header}</th>);
  };

  return (
    <div>
      <table>
        <caption>Statement Summary</caption>
        <thead>
          <tr>{renderHeaders()}</tr>
        </thead>
        <tbody>{tableRows()}</tbody>
      </table>
    </div>
  );
};

export default Table;
