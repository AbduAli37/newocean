import React from "react";
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
import { useEffect } from "react";
const Dashboard = () => {
  const [params] = new URLSearchParams(window.location.pathname);
  const navigate = useNavigate();
  const [active, setactive] = useState("shipments");
  const route = Object.values(params)[0];
  const [shownav, setshownav] = useState(true);
  const userType = login?.user?.type;
  useEffect(() => {
    if (route == "/dashboard" || route == "/dashboard/") {
      navigate("dash");
    }
  }, []);
  return (
    <React.Fragment>
      {!login.login ? (
        navigate("/login")
      ) : (
        <div className="shipments">
          <div  className={`${shownav ? "navs" : "navs hidden"}`}>
            <img style={{cursor:'pointer'}} onClick={()=>{
              navigate("/")
            }} src={require("../../../src/assets/img/logo.png")} alt="" />
             <h1> <span>{userType == "admin" ? "Admin" : "User"}</span> </h1>
              <div className="navsLinks">
              <Link
                onClick={() => {
                  setactive("dash");
                }}
                to="/dashboard/dash"
                className={`${route === "/dashboard/dash" ? "active" : ""}`}
              >
              <Icon icon="iwwa:dashboard" />
               <span> Dashboard</span>
              </Link>
              <Link
                onClick={() => {
                  setactive("shipments");
                }}
                to="/dashboard/shipments"
                className={`${
                  route === "/dashboard/shipments" ? "active" : ""
                }`}
              >
                {" "}
                <Icon icon="streamline:shipping-box-1-box-package-label-delivery-shipment-shipping" />
               <span> Shipments</span>{" "}
              </Link>
              <Link
                onClick={() => {
                  setactive("delivary");
                }}
                to="/dashboard/delivary"
                className={`${route === "/dashboard/delivary" ? "active" : ""}`}
              >
                {" "}
                <Icon icon="iconamoon:delivery-fast-thin" />
               <span> Booking Request</span>{" "}
              </Link>

              <Link
                onClick={() => {
                  setactive("pending");
                }}
                to="/dashboard/pending"
                className={`${route === "/dashboard/pending" ? "active" : ""}`}
              >
                {" "}
                <Icon icon="iconamoon:delivery-fast-thin" />
               <span> Pending Requests</span>{" "}
              </Link>

              <Link
              onClick={() => {
                setactive("cancel");
              }}
              to="/dashboard/cancel"
              className={`${route === "/dashboard/cancel" ? "active" : ""}`}
            >
              {" "}
              <Icon icon="iconamoon:delivery-fast-thin" />
             <span> Canceled Requests</span>{" "}
            </Link>

              <Link
                onClick={() => {
                  setactive("quotes");
                }}
                to="/dashboard/quotes"
                className={`${route === "/dashboard/quotes" ? "active" : ""}`}
              >
              <Icon icon="icon-park-outline:order" />
               <span> quotes</span>
              </Link>
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
      )}
    </React.Fragment>
  );
};

export default Dashboard;
