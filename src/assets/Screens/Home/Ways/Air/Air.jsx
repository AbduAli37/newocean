import React, { useEffect, useState } from "react";
import "./Air.css";
import Header from "./../../../Header/Header";
import Footer from "./../../../Footer/Footer";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import Select from "react-select";
import { ContainersData } from "../../../../../ContainersData";

function Air(props) {
  /****************************************
  # Shipping Shosen Menu
 ******************************************/
  const [FCl_or_LCL, SetFCl_or_LCL] = useState("FCL");
  /****************************************
  # Shipping Countries
 ******************************************/
  const [Countries, SetCountries] = useState([]);

  useEffect(() => {
    let NewCountriesData = ContainersData;
    let edditarr = NewCountriesData.map((data) => ({
      ...data,
      label: data.name,
      value: data.name,
    }));
    SetCountries(edditarr);
  }, []);

  /****************************************
  # Shipping Origen , Destination
 ******************************************/

  const [Shipping, SetShipping] = useState({
    Origen: "",
    Destination: "",
  });

  /****************************************
  # Shipping FCl
 ******************************************/
  const [FCl, SetFCl] = useState([]);

  const Fcl_Options = ["20FT Container", "40FT Container", "40HC Container"];
  const [FCLData, SetFCLData] = useState({
    ContainerType: "",
    Qty: 0,
  });

  const HandleAddFcl = (type, qty) => {
    if (FCLData.ContainerType !== "" && FCLData.Qty !== 0) {
      SetFCl([...FCl, { type, qty }]);
      SetFCLData({
        ContainerType: "",
        Qty: 0,
      });
    }
  };
  const HandleRemoveFcl = (index) => {
    // clone
    let Data = [...FCl];
    // edit
    let edit = Data.filter((da, ide) => ide !== index);
    //update
    SetFCl(edit);
  };

  /****************************************
  # Shipping LCL
 ******************************************/
  const [LCLData, SetLCLData] = useState({
    WEIGHT: 0,
    WEIGHT_SIZE: "",
    Volume: 0,
    Volume_Size: "",
  });

  const WEIGHT_SIZE_OPtions = ["POUND", "LB"];
  const Volume_Size_OPtions = ["CBM", "CFT", "CIN"];

  return (
    <React.Fragment>
      <div className="Air">
        <div className="info-landing">
          <Header Nav={props.Nav} />
          <div
            className="container"
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            <p>Get a Quote</p>
            <h2>Air FREIGHT QUOTE</h2>
            <div className="actions">
              <a>
                <i className="fa-regular fa-comment"></i>
                <span>Contact us</span>
              </a>
              <a>
                <i className="fa-solid fa-truck"></i>
                <span>Our Services</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="container">
          <p>Check the costs</p>
          <h1>GET YOUR QUOTE INSTANTLY</h1>

          <div className="box door">
            <label htmlFor="DOOR">in door ? </label>
            <input type="checkbox" name="" id="DOOR" />
          </div>
          {/********************************* Origen and Destination**************************************************/}
          <div className="box">
            <label htmlFor="origen">Origen *</label>
            <Select
              options={Countries}
              id="origen"
              placeholder="Airport  , Sity or Zip Code"
              onChange={(e) => SetShipping({ ...Shipping, Origen: e.value })}
            />
          </div>
          <div className="box inputs-style">
            <label htmlFor="Destination">Destination</label>
            <Select
              options={Countries}
              id="Destination"
              placeholder="Airport  , Sity or Zip Code"
              onChange={(e) =>
                SetShipping({ ...Shipping, Destination: e.value })
              }
            />
          </div>
          {/********************************* Cargo **************************************************/}
          <div className="cargo">
            <h1>Cargo</h1>
            <div className="links">
              <span
                onClick={() => SetFCl_or_LCL("FCL")}
                className={FCl_or_LCL === "FCL" ? "active" : ""}
              >
                FCL
              </span>
              <span
                onClick={() => SetFCl_or_LCL("LCL")}
                className={FCl_or_LCL === "LCL" ? "active" : ""}
              >
                LCL
              </span>
            </div>
            {/********************************* FCL  **************************************************/}
            {FCl_or_LCL === "FCL" ? (
              <div className="fcl">
                <div className="container-type">
                  <label htmlFor="ContainerType">Container Type</label>
                  <ReactDropdown
                    options={Fcl_Options}
                    placeholder="Type ? "
                    onChange={(e) =>
                      SetFCLData({ ...FCLData, ContainerType: e.value })
                    }
                    name="ContainerType"
                  />
                </div>
                <div className="container-type">
                  <label htmlFor="Qty">Qty * </label>
                  <input
                    type="number"
                    name="Qty"
                    id=""
                    value={FCLData.Qty}
                    onChange={(e) =>
                      SetFCLData({ ...FCLData, Qty: e.target.value })
                    }
                    min={0}
                  />
                </div>
                <div className="container-type">
                  <label htmlFor="">action</label>
                  <button
                    onClick={() =>
                      HandleAddFcl(FCLData.ContainerType, FCLData.Qty)
                    }
                  >
                    +
                  </button>
                </div>
                {/************************ Maping Data *******************************/}
              </div>
            ) : (
              <div className="LCL">
                {/********************************* LCL **************************************************/}
                <div className="container-type">
                  <label htmlFor="WeightType">Total Weight</label>
                  <ReactDropdown
                    options={WEIGHT_SIZE_OPtions}
                    placeholder="Total ? "
                    onChange={(e) =>
                      SetLCLData({ ...LCLData, WEIGHT_SIZE: e.value })
                    }
                    name="WeightType"
                  />
                </div>
                <div className="container-type">
                  <label htmlFor="WeightType">Total Volume</label>
                  <ReactDropdown
                    options={Volume_Size_OPtions}
                    placeholder="Volume ? "
                    onChange={(e) =>
                      SetLCLData({ ...LCLData, Volume_Size: e.value })
                    }
                    name="WeightType"
                  />
                </div>
              </div>
            )}
          </div>

          {FCl_or_LCL === "FCL"
            ? FCl.map((Data, index) => (
                <div className="fcl-data" key={index}>
                  <div className="container-type">
                    <label htmlFor="ContainerType">Container Type</label>
                    <input name="ContainerType" value={Data.type} />
                  </div>
                  <div className="container-type">
                    <label htmlFor="Qty">Qty * </label>
                    <input type="text" name="Qty" value={Data.qty} />
                  </div>
                  <div className="container-type">
                    <label htmlFor="">action</label>
                    <button onClick={() => HandleRemoveFcl(index)}>-</button>
                  </div>
                </div>
              ))
            : null}
          <button className="AirrchRate">Airrch Rate</button>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
export default Air;
