import React, { useEffect } from "react";
import { Outlet, Route, Routes, useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { Icon } from "@iconify/react";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useState } from "react";
import { login } from "../../functions/add_cotation";
export const Dashboard = () => {
  const [params] = new URLSearchParams(window.location.pathname);
  const navigate = useNavigate();
  const [active, setactive] = useState("shipments");
  const route = Object.values(params)[0];
  console.log(route);
  const [shownav, setshownav] = useState(true);
  const userType = login?.user?.type;
  console.log(userType);
  useEffect(() => {
    if (route == "/userdashboard" || route == "/userdashboard/") {
      navigate("userdash");
    }
  }, []);

  return (
    <React.Fragment>
      {!login.login ? (
        navigate("/login")
      ) : (
        <React.Fragment>
          {console.log(route)}
          <div className="shipments">
            <div className={`${shownav ? "navs" : "navs hidden"}`}>
              <img style={{cursor:'pointer'}} onClick={()=>{
              navigate("/")
            }}  src={require("../../../src/assets/img/logo.png")} alt="" />
              <h1>
                <span>{userType == "admin" ? "Admin" : "User"}</span>
              </h1>
              <div className="navsLinks">
                <h6
                  onClick={() => {
                    if (userType == "admin") {
                      navigate("/dashboard/dash");
                    } else {
                      navigate("/userdashboard/userdash");
                    }
                    setactive("dash");
                  }}
                  //to="/dashboard/dash"
                  className={`${
                    route === "/dashboard/dash" ||
                    route == "/userdashboard/userdash"
                      ? "active"
                      : ""
                  }`}
                >
                  <Icon icon="iwwa:dashboard" />
                  <span> Dashboard</span>
                </h6>
                <h6
                  onClick={() => {
                    if (userType == "admin") {
                      navigate("/dashboard/shipments");
                    } else {
                      navigate("/userdashboard/usershipments");
                    }
                    setactive("shipments");
                  }}
                  className={`${
                    route === "/dashboard/shipments" ||
                    route === "/userdashboard/usershipments"
                      ? "active"
                      : ""
                  }`}
                >
                  {" "}
                  <Icon icon="streamline:shipping-box-1-box-package-label-delivery-shipment-shipping" />
                  <span> Shipments</span>{" "}
                </h6>
                <h6
                  onClick={() => {
                    if (userType == "admin") {
                      navigate("/dashboard/delivary");
                    } else {
                      navigate("/userdashboard/userdelivary");
                    }
                    setactive("delivary");
                  }}
                  //to="/dashboard/delivary"
                  className={`${
                    route === "/dashboard/delivary" ||
                    route === "/userdashboard/userdelivary"
                      ? "active"
                      : ""
                  }`}
                >
                  {" "}
                  <Icon icon="iconamoon:delivery-fast-thin" />
                  <span> Booking Request</span>{" "}
                </h6>
                <h6
                  onClick={() => {
                    if (userType == "admin") {
                      navigate("/dashboard/pending");
                    } else {
                      navigate("/userdashboard/userpending");
                    }
                    setactive("pending");
                  }}
                  //to="/dashboard/delivary"
                  className={`${
                    route === "/dashboard/pending" ||
                    route === "/userdashboard/userpending"
                      ? "active"
                      : ""
                  }`}
                >
                  {" "}
                  <Icon icon="iconamoon:delivery-fast-thin" />
                  <span> Pending Requests </span>{" "}
                </h6>
                <h6
                  onClick={() => {
                    if (userType == "admin") {
                      navigate("/dashboard/cancel");
                    } else {
                      navigate("/userdashboard/usercancel");
                    }
                    setactive("cancel");
                  }}
                  //to="/dashboard/delivary"
                  className={`${
                    route === "/dashboard/cancel" ||
                    route === "/userdashboard/usercancel"
                      ? "active"
                      : ""
                  }`}
                >
                  {" "}
                  <Icon icon="iconamoon:delivery-fast-thin" />
                  <span> Canceled Requests </span>{" "}
                </h6>
                <h6
                  onClick={() => {
                    if (userType == "admin") {
                      navigate("/dashboard/quotes");
                    } else {
                      navigate("/userdashboard/userquotes");
                    }
                    setactive("quotes");
                  }}
                  //to="/dashboard/quotes"
                  className={`${
                    route === "/dashboard/quotes" ||
                    route === "/userdashboard/userquotes"
                      ? "active"
                      : ""
                  }`}
                >
                  <Icon icon="icon-park-outline:order" />
                  <span> quotes</span>
                </h6>
              </div>
              {shownav ? (
                <BsFillArrowLeftCircleFill
                  onClick={() => {
                    setshownav(false);
                  }}
                />
              ) : (
                <BsFillArrowRightCircleFill
                  onClick={() => {
                    setshownav(true);
                  }}
                />
              )}
            </div>

            <div
              className={`${
                shownav ? "shipments_cont" : "shipments_cont hidden"
              }`}
            >
              <Outlet />
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

//export default Dashboard;
