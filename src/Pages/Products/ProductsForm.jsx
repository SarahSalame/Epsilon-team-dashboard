import React, { useEffect } from "react";
import Navbar from "./../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductsContent from "../../components/ProductsForm/Form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ProductsForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="app">
      <Helmet>
        <title>
          {localStorage.getItem("edit") === "true"
            ? "dashboard | edit project"
            : "dashboard | add project"}
        </title>
      </Helmet>
      <Navbar
        title={
          localStorage.getItem("edit") === "true"
            ? "Projects / Edit"
            : "Projects / Add"
        }
      />
      <Sidebar />
      <div className="appContent">
        <ProductsContent />
      </div>
    </div>
  );
};

export default ProductsForm;
