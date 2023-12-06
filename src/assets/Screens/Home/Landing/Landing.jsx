import React from "react";
import Header from "../../Header/Header";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import "./Landing.css";
import { Link } from "react-router-dom";
function Landing(props) {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <React.Fragment>
      <div className="landing">
        <Header Nav={props.Nav} />
        <div className="content">
          <AutoplaySlider
            className="slider_Setting"
            play={true}
            cancelOnInteraction={false}
            interval={6000}
          >
            <div className="data">
              <img src={require("../../../img/Slider/SLider1.jpg")} alt="" />
              <div
                className="container"
                data-aos="fade-right"
                data-aos-easing="linear"
                data-aos-duration="500"
              >
                <p>Welcome to</p>
                <h5>OCEANBURG SHIPPING</h5>
                <p>
                  Move your cargo quickly, efficiently, and smoothly to any
                  point worldwide.
                </p>
                <div className="actions">
                  <Link>Get A Full Quote</Link>
                  <Link>GFind out more</Link>
                </div>
              </div>
            </div>
            <div className="data">
              <img src={require("../../../img/Slider/SLider2.jpg")} alt="" />
              <div
                className="container"
                data-aos="fade-right"
                data-aos-easing="linear"
                data-aos-duration="500"
              >
                <p>Transport your goods</p>
                <h5>AROUND THE WORLD</h5>
                <p>
                  Transport with goods anywhere in the world with premium class
                  customer care and satisfaction.
                </p>
                <div className="actions">
                  <Link>Know More</Link>
                </div>
              </div>
            </div>
            <div className="data">
              <img src={require("../../../img/Slider/SLider3.jpg")} alt="" />
              <div
                className="container"
                data-aos="fade-right"
                data-aos-easing="linear"
                data-aos-duration="500"
              >
                <p>PREMIUM CUSTOMER CARE</p>
                <h5>
                  WORLD-CLASS <br />
                  CLIENT SATISFACTION
                </h5>
                <p>
                  Oceanburg ensures premium customer care to ensure a smooth and
                  reliable to be your freight partner.
                </p>
                <div className="actions">
                  <Link>Know More</Link>
                </div>
              </div>
            </div>
          </AutoplaySlider>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Landing;
