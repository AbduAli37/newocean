import React from 'react'
import './aboutus.css'
// import { arr } from './getdata'
import { arr } from '../../search/getdata';
import Landing from '../Home/Landing/Landing';
import Footer from '../Footer/Footer';

const AboutUs = ({Nav}) => {

  return (
    <React.Fragment>
    <Landing Nav={Nav} />
    <div className='aboutus'>
      <div className="about_img">
        <img src={require("../../img/01-7.jpg")} alt="" />
      </div>
      <div className="about_text">
        <h1>About Us</h1>
        <h3 className="about_title">
          Oceanburg provides true peace of mind
        </h3>
        <p>
          It is really reflect what we said. Around town, or around the world, with our branches and an extensive agent network we deliver wherever your goods need to go, No matter how big, how complicated or how unique your project cargo is We OCEANBURG can move your cargo quickly, efficiently, and smoothly to any point worldwide.
          Our specialist teams meet your requirements for hazardous goods, perishables, fragile items, liquids, fashion, or government services. Our approach is fresh and our solutions are unique. You can measure the difference in our performance and in your results
        </p>
        <div className="about_percents">
          <div className="about_percent">
            <img src={require("../../img/blue.png")} alt="" />
            <div className="about_percent_text">
              <span>100%</span>
              <span> Trusted Agency </span>
            </div>
            <span className='plus'>+</span>
          </div>
          <div className="about_percent">
            <img src={require("../../img/blue.png")} alt="" />
            <div className="about_percent_text">
              <span>100%</span>
              <span> Specialized Team </span>
            </div>
            <span className='plus'>+</span>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </React.Fragment>
    )
}

export default AboutUs
