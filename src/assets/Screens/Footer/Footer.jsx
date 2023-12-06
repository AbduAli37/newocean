import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <React.Fragment>
      <div className="footer">
        <div className="container">
          <div
            className="box"
            data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            <img src={require("../../img/logo.png")} alt="logo" />
          </div>
          <div
            className="box"
            data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            <div className="titel">RECENT POSTS</div>
            <div className="data-recent">
              <img src={require("../../img/Footer/info-.jpg")} alt="logo" />
              <div className="info">
                <h5>Liberalisation of air cargo industry</h5>
                <p>October 9, 2015</p>
              </div>
            </div>
            <div className="data-recent">
              <img src={require("../../img/Footer/info-2.jpg")} alt="logo" />
              <div className="info">
                <h5>New trucks arriving</h5>
                <p>September 17, 2015</p>
              </div>
            </div>
          </div>
          <div
            className="box"
            data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            <div className="titel">PHOTO GALLERY</div>
            <div className="galley">
              <img src={require("../../img/Footer/Ga-1.jpg")} alt="logo" />
              <img src={require("../../img/Footer/Ga-2.jpg")} alt="logo" />
              <img src={require("../../img/Footer/Ga-3.jpg")} alt="logo" />
              <img src={require("../../img/Footer/Ga-4.jpg")} alt="logo" />
              <img src={require("../../img/Footer/info-.jpg")} alt="logo" />
              <img src={require("../../img/Footer/Ga-6.jpg")} alt="logo" />
            </div>
          </div>
          <div
            className="box"
            data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            <div className="titel">QUICK LINKS</div>
            <ul className="footer-links">
              <li>
                <Link to="/"> Contact us </Link>
              </li>
              <li>
                <Link to="/"> Service </Link>
              </li>
              <li>
                <Link to="/"> Cost Calculatours </Link>
              </li>
              <li>
                <Link to="/"> F&Q</Link>
              </li>
              <li>
                <Link to="/"> News </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Footer;
