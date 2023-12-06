import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import "./service.css";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { FaTruckMoving } from "react-icons/fa";
import { Footer } from "antd/es/layout/layout";
import Landing from "../Home/Landing/Landing";
const Service = ({ Nav }) => {
  const services = [
    {
      serv_id: 0,
      img: require("../../assets/t3.png"),
      serv_title: "Ground Shipping",
      serv_text:
        "We, Oceanburg also provides the most reliable ground shipping service nationwide. We offers a variety of services to individuals, businesses and corporations.",
    },
    {
      serv_id: 1,
      img: require("../../assets/s2.png"),
      serv_title: "Sea Freight",
      serv_text:
        "Our diverse fleet and experience operating along the world’s major shipping lines enables us to deliver regular, secure and economical ocean freight services for our customers",
    },
    {
      serv_id: 2,
      img: require("../../assets/p2.png"),
      serv_title: "Air Freight",
      serv_text:
        "Our extensive air fleet, global network and strong relationships with major commercial airlines mean that we are well positioned to provide a wide range of aviation",
    },
    {
      serv_id: 3,
      img: require("../../assets/t3.png"),
      serv_title: "Supply Chain Management",
      serv_text:
        "OCEANBURG can plan and manage a clientʼs entire supply chain with turnkey capabilities that include information systems",
    },
  ];
  return (
    <React.Fragment>
      <Landing Nav={Nav} />
      <div className="srvs">
        <h4> Our Services </h4>
        <p>What We Offer To Highest Quality Services</p>
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          cssMode={true}
          slidesPerView={3}
          spaceBetween={10}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          {services.map((item, index) => {
            return (
              <SwiperSlide>
                <div className="service">
                  <img src={item.img} alt="" />
                  <h5>{item.serv_title}</h5>
                  <p>{item.serv_text}</p>
                  <p className="more">read more</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Service;
