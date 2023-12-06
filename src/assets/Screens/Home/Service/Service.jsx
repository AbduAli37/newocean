import React from "react";
import "./Service.css";
import Landing from "../Landing/Landing";
import { Footer } from "antd/es/layout/layout";
function Service({Nav}) {
  return (
    <React.Fragment>
    
    <Landing Nav={Nav} />
      <div className="Service">
        <div className="container">
          <div
            className="left"
            data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            <div className="data">
              <p>our Services</p>
              <h1>WHAT WE CAN DO FOR YOU</h1>
            </div>
            <div className="data">
              <img src={require("../../../img/Ship.png")} alt="" />
            </div>
          </div>
          <div className="right">
            <div
              className="box"
              data-aos="zoom-in"
              data-aos-easing="linear"
              data-aos-duration="500"
            >
              <i className="fa-solid fa-ship"></i>
              <div className="data">
                <h3>SEA FREIGHT</h3>
                <p>
                  Our diverse fleet and experience operating along the world’s
                  major shipping lines enables us to deliver regular, secure and
                  economical ocean freight services for our customers around the
                  world.
                </p>
              </div>
            </div>
            <div
              className="box"
              data-aos="zoom-in"
              data-aos-easing="linear"
              data-aos-duration="500"
            >
              <i className="fa-solid fa-truck-fast"></i>
              <div className="data">
                <h3>GROUND SHIPPING</h3>
                <p>
                  Oceanburg also provides the most reliable ground shipping
                  service nationwide. We offers a variety of services to
                  individuals, businesses and corporations. Our Ground shipment
                  services are great for anyone who needs to ship from point A
                  to point B.
                </p>
              </div>
            </div>
            <div
              className="box"
              data-aos="zoom-in"
              data-aos-easing="linear"
              data-aos-duration="500"
            >
              <i className="fa-solid fa-plane"></i>
              <div className="data">
                <h3>SEA FREIGHT</h3>
                <p>
                  Our extensive air fleet, global network and strong
                  relationships with major commercial airlines mean that we are
                  well positioned to provide a wide range of aviation logistics
                  services. The delivery of time-critical freight requires a
                  fast, flexible transport solution.
                </p>
              </div>
            </div>
            <div
              className="box"
              data-aos="zoom-in"
              data-aos-easing="linear"
              data-aos-duration="500"
            >
              <i className="fa-solid fa-box"></i>
              <div className="data">
                <h3>SEA FREIGHT</h3>
                <p>
                  Oceanburg can plan and manage a clientʼs entire supply chain
                  with turnkey capabilities that include information systems,
                  network planning, transportation, distribution, and customer
                  service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
export default Service;
