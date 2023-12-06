import React from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { login } from "../../../functions/add_cotation";
import LogOut from "../../../components/logout";
function Header(props) {
  const loggedin = login?.login;
  const type = login?.user?.type;
  return (
    <React.Fragment>
      <div className="Header">
        <div className="container">
          {/************************ info ****************************** */}
          <div className="info">
            <div className="left">
              <div className="data">
                <i className="fa-solid fa-envelope"></i>
                <p>Newsletter</p>
              </div>
              <div className="data">
                <i className="fa-solid fa-user"></i>
                <p>Carrer</p>
              </div>
            </div>
            <div className="right">
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-twitter"></i>
              {!loggedin ? (
                <Link to={"regist"} className="data">
                  <i class="fa-solid fa-user-plus"></i>
                  Register/login
                </Link>
              ) : (
                <LogOut />
              )}
              {!loggedin ? (
                null
              ) : (
              <div className="data MyAccount">
                <Link
                  to={
                    loggedin
                      ? type != "admin"
                        ? "/userdashboard"
                        : "/dashboard"
                      : "/login"
                  }
                >
                  <i className="fa-solid fa-user"></i>
                  My Account
                </Link>
              </div>
              )}
            </div>
          </div>
        </div>
        {/***************************** mainHeader *****************************************/}
        <div className="navigators">
          <div className="container">
            <div className="logo">
              <img src={require("../../img/logo.png")} alt="" />
            </div>
            <ul className="menu">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/aboutus">About us</NavLink>
              </li>
              <li>
                <NavLink to="/services">Service</NavLink>
                <div className="other-menu">
                  <NavLink to="/service/Sea Freight">Sea Freight</NavLink>
                  <NavLink to="/service/Air Freight">Air Freight</NavLink>
                  <NavLink to="/service/Ground Shipping">
                    Ground Shipping
                  </NavLink>
                </div>
              </li>
              <li>
                <NavLink>Calculators</NavLink>
              </li>
              <li>
                <NavLink>News</NavLink>
              </li>
              <li>
                <NavLink>Contact us</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Header;
