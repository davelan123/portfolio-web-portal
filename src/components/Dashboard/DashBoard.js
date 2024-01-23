import React, { useState } from "react";
import "../../style.css";
import ProfitAndLossTable from "../Table/ProfitAndLossTable";
import StockPriceTable from "../Table/StockPriceTable";
const DashBoard = () => {
  return (
    <div className="dashboard">
      <div className="profit-and-loss-table-container">
        <ProfitAndLossTable></ProfitAndLossTable>
      </div>
      <br></br>
      <div className="stock-price-table-container">
        <StockPriceTable></StockPriceTable>
      </div>
    </div>
  );
};

export default DashBoard;
