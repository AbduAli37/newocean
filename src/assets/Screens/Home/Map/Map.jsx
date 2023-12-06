import React from "react";
import "./Map.css";
function Map() {
  return (
    <React.Fragment>
      <div className="map">
        <iframe
          src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=fucalty of computer and information tanta&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          width="100%"
          height="200"
          frameBorder="0"
          allowFullScreen
          titel="location"
        />
        <div
          className="data-over"
          data-aos="zoom-in"
          data-aos-easing="linear"
          data-aos-duration="500"
        >
          <div className="box">
            <i className="fa-solid fa-clock"></i>
            <div className="data">
              <h3>WORKING HOURS</h3>
              <p>
                <span>Mon-Sat 7AM-5PM</span>
                <span>Sat 9AM-3PM</span>
              </p>
            </div>
          </div>
          <div className="box">
            <i className="fa-solid fa-location-dot"></i>
            <div className="data">
              <h3>OUR LOCATION</h3>
              <p>
                <span>1500 Chestnut St.</span>
                <span>Phildalphia, PA 19102</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Map;
