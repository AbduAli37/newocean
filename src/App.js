import React, { useEffect, useRef, useState } from "react";
import './index.css'
import Login from "./assets/Screens/Login/Login";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Home from "./assets/Screens/Home/Home";
import Sea from "./assets/Screens/Home/Ways/Sea/Sea";
import Air from "./assets/Screens/Home/Ways/Air/Air";
import Ground from "./assets/Screens/Home/Ways/Ground/Ground";
import Regist from "./assets/Screens/regist/Regist";
import Shipments from "./assets/dashboard/shipments/Shipments";
import Quotes from "./assets/dashboard/quotes/Quotes";
import { login } from "./functions/add_cotation";
import Dashboard from "./assets/dashboard/Dashboard";
import Dash from "./assets/dashboard/dash/Dash";
import DilevaryRes from "./assets/dashboard/delivery/DilevaryRes";
import Pending from "./assets/dashboard/pending/pending";
import Cancel from "./assets/dashboard/cancel/cancel";
import QuoteDetail from "./assets/dashboard/quotes/quotedetails/QuoteDetail";
import QuoteOrder from "./assets/dashboard/quotes/QuoteOrder/QuoteOrder";
import Booking from "./assets/dashboard/Booking/Booking";
import AboutUs from "./assets/Screens/aboutus/AboutUs";
import Service from "./assets/Screens/Home/Service/Service";

import { Dashboard as UserDashboard } from "./assets/userDashboard/Dashboard";
import { Dash as UserDash } from "./assets/userDashboard/dash/Dash";
import { DilevaryRes as UserDilevaryRes } from "./assets/userDashboard/delivery/DilevaryRes";
import { QuoteDetail as UserQuoteDetail } from "./assets/userDashboard/quotes/quotedetails/QuoteDetail";
import { QuoteOrder as UserQuoteOrder } from "./assets/userDashboard/quotes/QuoteOrder/QuoteOrder";
import { Booking as UserBooking } from "./assets/userDashboard/Booking/Booking";
import { Cancel as UserCancel } from "./assets/userDashboard/cancel/cancel";
import { Pending as UserPending } from "./assets/userDashboard/pending/pending";

import { Shipments as UserShipments } from "./assets/userDashboard/shipments/Shipments";
import { Quotes as UserQuotes } from "./assets/userDashboard/quotes/Quotes";
import { ToastContainer } from "react-toastify";
import TestWhatsApp from "./TestWhatsApp";
import TestWhatsApp2 from "./TestWtahsApp2";
import { DashQuoteDetail } from "./assets/userDashboard/quotes/quotedetails/DashQuoteDetail";
import { DashQuoteOrder } from "./assets/userDashboard/quotes/QuoteOrder/DashQuoteOrder";
import PrintRates from "./assets/userDashboard/PrintRates/PrintRates";

function App() {
  const navigate=useNavigate()
  const userType = login?.user?.type;
  const Nav = useRef();
  const Back_to_top = useRef();

  window.onscroll = (e) => {
    if (window.scrollY > 100 && Nav.current) {
      Nav.current.style.cssText = "top:0;background-color: #00000058;";
    } else if (Nav.current) {
      Nav.current.style.cssText = "top:auto;";
    }
    if (window.scrollY >= 150 && Nav.current) {
      Back_to_top.current.style.cssText = "display : flex !important";
    } else if (Nav.current) {
      Back_to_top.current.style.cssText = "display : none";
    }
  };

  const HandleBack_to_top = (e) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="Auth">
        <i
          class="fas fa-arrow-up back-to-top"
          ref={Back_to_top}
          on
          onClick={() => HandleBack_to_top()}
        />
        <Routes>
          <Route path="" element={<Outlet />}>
            <Route path="aboutus" element={<AboutUs Nav={Nav} />} />
            <Route path="services" element={<Service Nav={Nav} />} />
            <Route path="" element={<Home Nav={Nav} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/regist" element={<Regist />} />
            <React.Fragment>
              {userType == "admin" ? (
                <Route path="dashboard" element={<Dashboard />}>
                  <Route path="quotes" element={<Quotes />} />
                  <Route path="dash" element={<Dash />} />
                  <Route path="delivary" element={<DilevaryRes />} />
                  <Route path="shipments" element={<Shipments Nav={Nav} />} />
                  <Route
                    path="showquotedetails"
                    element={<QuoteDetail Nav={Nav} />}
                  />
                  <Route path="quoteorder" element={<QuoteOrder Nav={Nav} />} />
                  <Route path="booking" element={<Booking Nav={Nav} />} />
                  <Route path="cancel" element={<Cancel Nav={Nav} />} />
                  <Route path="pending" element={<Pending Nav={Nav} />} />
                  {/* quoteorder */}
                </Route>
              ) : (
                <Route path="userdashboard" element={<UserDashboard />}>
                  <Route path="userquotes" element={<UserQuotes />} />
                  <Route path="printrates" element={<PrintRates/>}/>
                  <Route path="userdash" element={<UserDash />} />
                  <Route path="userdelivary" element={<UserDilevaryRes />} />
                  <Route
                    path="usershipments"
                    element={<UserShipments Nav={Nav} />}
                  />
                  <Route
                    path="usershowquotedetails"
                    element={<UserQuoteDetail Nav={Nav} />}
                  />
                  <Route
                    path="dashusershowquotedetails"
                    element={<DashQuoteDetail Nav={Nav} />}
                  />
                  <Route
                    path="userquoteorder"
                    element={<UserQuoteOrder Nav={Nav} />}
                  />
                  <Route
                    path="dashuserquoteorder"
                    element={<DashQuoteOrder Nav={Nav} />}
                  />
                  <Route
                    path="userbooking"
                    element={<UserBooking Nav={Nav} />}
                  />
                  <Route path="usercancel" element={<UserCancel Nav={Nav} />} />
                  <Route
                    path="userpending"
                    element={<UserPending Nav={Nav} />}
                  />
                  {/* quoteorder */}
                </Route>
              )}
            </React.Fragment>
            <Route path="service/Sea Freight" element={<Sea Nav={Nav} />} />
            <Route path="service/Air Freight" element={<Air Nav={Nav} />} />
            <Route
              path="service/Ground Shipping"
              element={<Ground Nav={Nav} />}
            />
            {/* showquotedetails */}
          </Route>
          <Route path="whatscontact" element={<TestWhatsApp2/>}/>
        </Routes>
        {/* <div className="whats_icon">
          <img onClick={()=>{
            navigate("/whatscontact")
          }} src={require("./assets/whatsicon.png")} alt="" />
        </div> */}
      </div>
    </React.Fragment>
  );
}

export default App;
