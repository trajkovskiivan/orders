import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Table from "./components/Table";
import Header from "./components/Header";
import AppLayout from "./components/AppLayout";
import Orders from "./pages/Orders/Orders";
import Stats from "./pages/Stats";
import New from "./pages/New";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Orders />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/new" element={<New />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
