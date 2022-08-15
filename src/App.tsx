import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Balances from "./screens/balances";
import Error from "./screens/error";
import Landing from "./screens/landing";
import Menu from "./screens/menu";
import Pin from "./screens/pin";
import { Deposits, Deposit } from "./screens/deposits";
import { Withdrawal, Withdrawals } from "./screens/withdrawals";

function App() {
  return (
    <div className="atm flex justify-center items-center h-full w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/pin/:cardID" element={<Pin />} />
          <Route path="/balances" element={<Balances />} />
          <Route path="/withdrawals" element={<Withdrawals />} />
          <Route path="/withdrawal/:accountID" element={<Withdrawal />} />
          <Route path="/deposits" element={<Deposits />} />
          <Route path="/deposit/:accountID" element={<Deposit />} />
          <Route path="/error" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
