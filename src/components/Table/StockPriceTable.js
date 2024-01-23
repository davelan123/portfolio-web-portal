import React, { useState, useRef } from "react";
import CollapsibleTable from "./CollapsibleTable";
import Button from "@mui/material/Button";

import "../../style.css";

function StockPriceTable() {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const stompClient = useRef();



  const [columnNames, setColumnNames] = useState([
    "Stock Name",
    "Quantity",
    "Avg Price Per Share",
    "Total Cost",
    "Current Price",
    "Market Value",
    "Today Changes",
    "Today Change Percentage",
    "Total Gain/Loss",
    "Total Gain/Loss Percentage",
  ]);
  const listOfMessages = messages.map((msg) => <div>msg</div>);

  return (
    <div className="stock-price-table">
      <div className="stock-price-table-header">
        <h1>Price Feed</h1>
        <div className="socket-control">
          <Button
            variant="contained"
            color="secondary"
            className="socket-enable"

          >
            Connect
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="socket-disable"
          >
            Disconnect
          </Button>
        </div>
      </div>
      <div>{listOfMessages}</div>
      {/* <CollapsibleTable columnNames={columnNames}></CollapsibleTable> */}
    </div>
  );
}

export default StockPriceTable;
