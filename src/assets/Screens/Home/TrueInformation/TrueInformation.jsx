import React from "react";
import CountUp from "react-countup";
import "./TrueInformation.css";

function TrueInformation() {
  return (
    <React.Fragment>
      <div className="TrueInformation">
        <div className="container">
          <div
            className="top"
            data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            <div className="box">
              <p>OCEANBURG PROVIDES</p>
              <h1>TRUE PEACE OF MIND</h1>
            </div>
            <div className="box quote">
              <p>
                It is really reflect what we said. Around town, or around the
                world, with our branches and an extensive agent network we
                deliver wherever your goods need to go, No matter how big, how
                complicated or how unique your project cargo is We OCEANBURG can
                move your cargo quickly, efficiently, and smoothly to any point
                worldwide.
              </p>
            </div>
            <div className="box">
              <img src={require("../../../img/flight.png")} alt="" />
            </div>
          </div>
          <div className="bottom">
            <div
              className="box"
              data-aos="zoom-in"
              data-aos-easing="linear"
              data-aos-duration="500"
            >
              <h1>
                <CountUp
                  start={-1}
                  end={89}
                  duration={2.75}
                  separator=" "
                  decimal=","
                  suffix=" %"
                />
              </h1>
              <p>SEA FREIGHT</p>
            </div>
            <div
              className="box"
              data-aos="zoom-in"
              data-aos-easing="linear"
              data-aos-duration="500"
            >
              <h1>
                <CountUp
                  start={-1}
                  end={89}
                  duration={2.75}
                  separator=" "
                  decimal=","
                  suffix=" %"
                />
              </h1>
              <p>AIR FREIGHT</p>
            </div>
            <div
              className="box"
              data-aos="zoom-in"
              data-aos-easing="linear"
              data-aos-duration="500"
            >
              <h1>
                <CountUp
                  start={-1}
                  end={89}
                  duration={2.75}
                  separator=" "
                  decimal=","
                  suffix=" %"
                />
              </h1>
              <p>ROAD FREIGHT</p>
            </div>
            <div
              className="box"
              data-aos="zoom-in"
              data-aos-easing="linear"
              data-aos-duration="500"
            >
              <h1>
                <CountUp
                  start={-1}
                  end={89}
                  duration={2.75}
                  separator=" "
                  decimal=","
                  suffix=" %"
                />
              </h1>
              <p>SUPPLY CHAIN MANAGEMENT</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default TrueInformation;
