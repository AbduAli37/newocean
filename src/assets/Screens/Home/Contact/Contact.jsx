import React from "react";
import "./Contact.css";
import ReactDropdown from "react-dropdown";
import { useNavigate } from "react-router-dom";
import "react-dropdown/style.css";
function Contact() {
  const navigate = useNavigate();
  const navigateTo = (event) => {
    navigate(`service/${event.value}`);
  };
  const options = ["Sea Freight", "Air Freight", "Ground Shipping"];
  return (
    <React.Fragment>
      <div className="contact">
        <div className="container">
          <div
            className="box"
            data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            <i className="fa-solid fa-headset"></i>
            <div className="info">
              <h3>CALL CENTER</h3>
              <p>
                <span>Give us a call</span>
                <span>+1 (855) 203-7174</span>
              </p>
            </div>
          </div>
          <div
            className="box"
            data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            <i className="fa-solid fa-timer"></i>
            <div className="info">
              <h3>WORKING HOURS</h3>
              <p>
                <span>Mon-Sat 7AM-5PM</span>
                <span>Sat 9AM-3PM</span>
              </p>
            </div>
          </div>
          <div
            className="box"
            data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            <i className="fa-solid fa-map-location"></i>
            <div className="info">
              <h3>OUR LOCATION</h3>
              <p>
                <span>1500 Chestnut St.</span>
                <span>Phildalphia, PA 19102</span>
              </p>
            </div>
          </div>
          <div className="box">
            <i className="fa-solid fa-dolly"></i>
            <div className="info">
              <h3>GET DETAILED QUOTE</h3>
              <ReactDropdown
                options={options}
                onChange={navigateTo}
                placeholder="Chose an Way"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Contact;
