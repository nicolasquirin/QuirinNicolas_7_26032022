import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Trending from "../../pages/Trending";
import Navbar from "../Navigate";

const indexRoute = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </BrowserRouter>
  );
};

export default indexRoute;
