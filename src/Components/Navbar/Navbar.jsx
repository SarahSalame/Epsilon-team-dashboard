import React, { useContext } from "react";
import { MdAccountCircle } from "react-icons/md";
import Cookies from "js-cookie";
import { Context } from "./../../context/Context";
import "./Navbar.css";

const Navbar = ({ title }) => {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : "";
  console.log("USER FROM COOKIES", Cookies.get("user"));

  const { setShowSidebar, showSidebar } = useContext(Context);

  return (
    <nav>
      <span>{title}</span>
      <div className="accountInfo">
        <MdAccountCircle fontSize={35} fill="#444444" />

        <div className="profileName">
          <span>{user ? user.user_name : "your name"}</span>
          <span>Admin</span>
        </div>

        <button
          aria-label="open menu"
          className="listBtn"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {!showSidebar ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                fill="black"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  
                c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  
                c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"
                fill="black"
              />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
