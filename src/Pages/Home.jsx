import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Table from "../Components/ProductsTable/Table";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Context } from "../context/Context";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { setShowSidebar } = useContext(Context);
  const navigate = useNavigate();

  const [itemId, setItemId] = useState(null);
  const [reload, setReload] = useState(false);

  // تحقق من وجود التوكن عند تحميل الصفحة
  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/"); // إذا لم يكن هناك توكن، إعادة التوجيه إلى صفحة تسجيل الدخول
    }
  }, [navigate]);

  // تحديث الشريط الجانبي بناءً على حجم الشاشة
  window.onresize = () => {
    if (window.innerWidth > 1023) {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  };

  return (
    <div className="app">
      <Helmet>
        <title>Dashboard | Projects</title>
      </Helmet>

      <Navbar title="Projects" />
      <Sidebar />
      <div className="appContent">
        <Table
          setItemId={setItemId}
          itemId={itemId}
          reload={reload}
          setReload={setReload}
        />
      </div>
    </div>
  );
};

export default Home;
