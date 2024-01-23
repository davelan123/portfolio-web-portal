import React, { useState } from "react";
import CollapsibleTable from "./CollapsibleTable";

const ProfitAndLossTable = () => {
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

  return (
    <div className="profit-and-loss-table">
      <h1>Profit And Loss</h1>
      <CollapsibleTable columnNames={columnNames}></CollapsibleTable>
    </div>
  );
};
export default ProfitAndLossTable;
