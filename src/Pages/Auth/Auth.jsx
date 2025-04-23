import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Auth.css";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("token")) {
      navigate("/projects");
    }
  }, []);

  return (
    <div className="register">
      <Helmet>
        <title>
          {window.location.pathname.includes("/signup")
            ? "dashboard | Signup"
            : "dashboard | Signin"}
        </title>
      </Helmet>
      <Outlet />
    </div>
  );
};

export default Login;
