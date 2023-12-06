import React from "react";
import Landing from "./Landing/Landing";
import TransportationMethods from "./Transportation Methods/TransportationMethods";
import Contact from "./Contact/Contact";
import Service from "./Service/Service";
import TrueInformation from "./TrueInformation/TrueInformation";
import Map from "./Map/Map";
import Footer from "../Footer/Footer";
function Home(props) {
  const data=JSON.parse(localStorage.getItem("myaccount"))
  return (
    <React.Fragment>
      {
        data&& Object.keys(data).length>0&& data?.type=="admin"?(
          null
        ):<TransportationMethods />

      }
      <Landing Nav={props.Nav} />
      <Contact />
      <Service Nav={props.Nav} />
      <TrueInformation />
      <Map />
      <Footer />
    </React.Fragment>
  );
}
export default Home;
