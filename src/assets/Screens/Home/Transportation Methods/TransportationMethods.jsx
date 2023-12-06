import React, { useState } from "react";
import "./TransportationMethods.css";
import Sea from "./Sea/Sea";
import Ground from "./Ground/Ground";
import Air from "./Air/Air";
function TransportationMethods() {
  const [Way, SetWay] = useState("Air");
  return (
    <React.Fragment>
      <div className="TransportationMethods">
        <div className="container">
          {/*************************** Menu *****************************/}
          <div className="menu">
            <li
              className={Way === "Air" ? "active" : ""}
              onClick={() => SetWay("Air")}
            >
              <i className="fa-solid fa-plane"></i>Air
            </li>
            <li
              className={Way === "Sea" ? "active" : ""}
              onClick={() => SetWay("Sea")}
            >
              <i className="fa-solid fa-ship"></i>Sea
            </li>
            <li
              className={Way === "Ground" ? "active" : ""}
              onClick={() => SetWay("Ground")}
            >
              <i className="fa-solid fa-truck"></i>Ground
            </li>
          </div>
          {/*************************** Box *****************************/}
          <div className="box">
            {Way === "Air" ? <Air /> : Way === "Sea" ? <Sea /> : <Ground />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TransportationMethods;
