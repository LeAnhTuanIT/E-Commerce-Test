import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Forgot from "../components/Forgot/Forgot";
import ChangePassword from "../components/Change/ChangePasswrod";
import NotFound from "../pages/NotFound/NotFound";
import Active from "../components/Active/Active";
import Logout from "../components/Logout/Logout";
import Product from "../pages/Product/Product";

// dashboard route
// import Dashboard from "../pages/Admin/Dashboard";
// import ProductAdmin from "../pages/Admin/Product";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Router = () => {
  return (
    <>
      <Routes>
        {/* route user */}
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/active/:token" element={<Active />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/change" element={<ChangePassword />} />
        <Route path="/products" element={<Product />} />

        {/* route admin */}
        {/* <Route path="/admin/*" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductAdmin />} /> */}
        <Route path="*" element={<Navigate to={"/404"} />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
      <ToastContainer className="toast-position" position="bottom-right" />
    </>
  );
};

export default Router;
