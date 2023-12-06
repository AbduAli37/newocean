import React from "react";
import { Link } from "react-router-dom";
import "./logout.css";

const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("login");
  localStorage.removeItem("myaccount");
  window.location.reload();
};

function LogOut() {
  return (
    <Link to="/login" onClick={() => logOut()}>
      LogOut
    </Link>
  );
}

export default LogOut;
