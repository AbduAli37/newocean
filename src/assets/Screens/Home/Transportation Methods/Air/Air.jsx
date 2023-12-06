import React, { useState, useEffect, useRef } from "react";
import "./Air.css";
import "react-dropdown/style.css";
import ReactDropdown from "react-dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountrieFlag from "../Countrie Flag/CountrieFlag";
import { AirportsData } from "./../../../../../AirportsData";
import { addContation } from "./../../../../../functions/add_cotation";
import { useNavigate } from "react-router-dom";
function AirTransportationMethod() {
  /****************************************
  # Shipping Origen , Destination
 ******************************************/
  const [Shipping, SetShipping] = useState({
    Origen: "",
    Destination: "",
  });

  const [originTxtSearch,setOriginTxtSearch]=useState("");
  const [destTxtSearch,setDestTxtSearch]=useState("");

  const navigate = useNavigate();

  const orgin = useRef();
  const destination = useRef();
  const TW = useRef();
  const TL = useRef();
  const TH = useRef();
  const TWL = useRef();

  const [searchRate, useSearchRate] = useState({
    origin: "",
    destination: "",
    locationOriginType: "location",
    locationDestinationType: "location",
  });

  const [OriginIndoor, SetOriginIndoor] = useState(false);
  const [DestinationIndoor, SetDestinationIndoor] = useState(false);

  /****************************************
  # Shipping Shosen Menu
 ******************************************/
  const [FCl_or_LCL_INPUT, SetFCl_or_LCL_INPUT] = useState("");
  const [cargoDesc, setCargoDesc] = useState(false);
  const [nonHas, setNonHas] = useState(false);
  /****************************************
  # Shipping LCL
 ******************************************/
  const [CargoLCL, SetCargoLCL] = useState("");
  const WEIGHT_SIZE_OPtions = ["POUND"];
  const height_Size_OPtions = ["INCH"];
  const Length_SIZE_OPtions = ["INCH"];
  const Width_Size_OPtions = ["INCH"];
  const [LCLData, SetLCLData] = useState({
    WEIGHT: 1,
    WEIGHT_SIZE: WEIGHT_SIZE_OPtions[0],
    height: 1,
    height_Size: height_Size_OPtions[0],
    Length: 1,
    Length_SIZE: Length_SIZE_OPtions[0],
    Width: 1,
    Width_Size: Width_Size_OPtions[0],
  });

  useEffect(() => {
    console.log(OriginIndoor);
  }, [OriginIndoor]);

  useEffect(() => {
    const CargoLCLData =
      LCLData.WEIGHT +
      "" +
      LCLData.WEIGHT_SIZE +
      " , " +
      LCLData.height +
      "" +
      LCLData.height_Size +
      " , " +
      LCLData.Length +
      "" +
      LCLData.Length_SIZE +
      " , " +
      LCLData.Width +
      "" +
      LCLData.Width_Size;
    SetCargoLCL(CargoLCLData);
  }, [LCLData]);

  // Handle Search
  const handleSearch = async () => {
    searchRate.shipping_type = "air";
    searchRate.cargo = nonHas ? "non_has" : "lcl";

    if (
      (TW.current &&
        TH.current &&
        TWL.current &&
        TL.current &&
        destination.current &&
        orgin.current &&
        destination.current.value.length &&
        orgin.current.value.length &&
        TW.current.value.length &&
        TH.current.value.length &&
        TWL.current.value.length &&
        TL.current.value.length) ||
      (destination.current &&
        orgin.current &&
        destination.current.value.length &&
        orgin.current.value.length &&
        nonHas &&
        cargoDesc)
    ) {
      if (!nonHas) {
        searchRate.TW = TW.current.value;
        searchRate.TH = TH.current.value;
        searchRate.TL = TL.current.value;
        searchRate.TWL = TWL.current.value;
      }
      searchRate.description = cargoDesc ? cargoDesc : "";
      searchRate.locationOriginType = OriginIndoor ? "location" : "code";
      searchRate.locationDestinationType = DestinationIndoor
        ? "location"
        : "code";

      searchRate.origin =
        searchRate.locationOriginType == "location" ? Shipping.Origen : "";
      searchRate.destination =
        searchRate.locationDestinationType == "location"
          ? Shipping.Destination
          : "";

      searchRate.origin_code =
        searchRate.locationOriginType == "location"
          ? "35.12-12.13"
          : Shipping.countery_code_origin;

      searchRate.destination_code =
        searchRate.locationDestinationType == "location"
          ? "35.12-12.13"
          : Shipping.countery_code_destination;

      searchRate.countery_code_destination =
        searchRate.locationDestinationType !== "location"
          ? Shipping.des_country
          : "United States";

      searchRate.countery_code_origin =
        searchRate.locationOriginType !== "location"
          ? Shipping.or_country
          : "United States";

      console.log(searchRate);
      const addCotation = await addContation(searchRate);
      console.log(addCotation)
      // console.log(searchRate)

      if (addCotation.message == "Please Log in First") {
        navigate("/login", { state: searchRate });
        SetShipping({
          Origen: "",
          Destination: "",
        });
      } else {
        SetShipping({
          Origen: "",
          Destination: "",
        });
      }
      addCotation.status != "success"
        ? toast.error(addCotation.message)
        : toast.success("Quotation Added Successfully");
    } else {
      toast.error("Data Not Complete");
    }
    // console.log(searchRate);
  };

  return (
    <React.Fragment>
      {/* Same as */}
      <div className="AirTransportationMethod">
        {/***************** Origin  ************************/}
        <div className="card-input">
          <label htmlFor="Origin">
            <div className="left">
              <i className="fa-solid fa-earth-americas"></i> Origin *
            </div>
            <label class="switch" htmlFor="switchOrigin">
              <input
                style={{ backgroundColor:'red' }}
                type="checkbox"
                id="switchOrigin"
                checked={OriginIndoor}
                onChange={() => {
                  SetOriginIndoor(!OriginIndoor);
                  SetShipping({ ...Shipping, Origen: "" });
                }}
              />
              <span class="slider"></span>
            </label>
          </label>
          <input
            type="search"
            id="Origin"
            value={
              Shipping.Origen
                ? Shipping.Origen + " (" + Shipping.countery_code_origin + ")"
                : originTxtSearch
            }
            placeholder={
              OriginIndoor
                ? "Enter Your Location"
                : "Airport  , City or Zip Code"
            }
            ref={orgin}
            // onChange={(e) => {
            //   console.log(Shipping);
            //   SetShipping({ ...Shipping, Origen: e.target.value });
            // }}
            onChange={(e)=>{
              if(Shipping.Origen!=""){
                console.log(Shipping.countery_code_origin.slice(0,Shipping.countery_code_origin.length))
                SetShipping({...Shipping,countery_code_origin:Shipping.countery_code_origin.slice(0,Shipping.countery_code_origin.length-1)})
                if(Shipping.countery_code_origin==''){
                  setOriginTxtSearch(Shipping.Origen)
                  SetShipping({Origen:'',Destination:Shipping.Destination});
                }
              }
              else {
                setOriginTxtSearch(e.target.value)
              }
            }}
            onFocus={(e) => e.target.classList.add("active")}
            onBlur={(e) => e.target.classList.remove("active")}
          />
          {OriginIndoor ? null : (
            <React.Fragment>
              {/***************** Origin overlay ************************/}
              <ul className="data-overlay">
                {AirportsData.filter((data) =>
                  originTxtSearch === ""
                    ? data
                    : data.name
                        .toLowerCase()
                        .includes(originTxtSearch.toLowerCase())
                    ? data.name
                        .toLowerCase()
                        .includes(originTxtSearch.toLowerCase())
                    : data.code
                        ?.toLowerCase()
                        .includes(originTxtSearch.toLowerCase())
                    ? data.code
                        ?.toLowerCase()
                        .includes(originTxtSearch.toLowerCase())
                    : data.country
                        ?.toLowerCase()
                        .includes(originTxtSearch.toLowerCase())
                    ? data.country
                        ?.toLowerCase()
                        .includes(originTxtSearch.toLowerCase())
                    : data.direct_flights
                        ?.toLowerCase()
                        .includes(originTxtSearch.toLowerCase())
                    ? data.direct_flights
                        ?.toLowerCase()
                        .includes(originTxtSearch.toLowerCase())
                    : data.state
                        ?.toLowerCase()
                        .includes(originTxtSearch.toLowerCase())
                    ? data.state
                        ?.toLowerCase()
                        .includes(originTxtSearch.toLowerCase())
                    : data.type
                        ?.toLowerCase()
                        .includes(originTxtSearch.toLowerCase())
                    ? data.type
                        ?.toLowerCase()
                        .includes(originTxtSearch.toLowerCase())
                    : data.city
                        .toLowerCase()
                        .includes(originTxtSearch.toLowerCase())
                )
                  .slice(0, 5)
                  .map((data, index) => (
                    <li
                      onClick={() =>
                        SetShipping({
                          ...Shipping,
                          Origen: data.name,
                          or_country: data.country,
                          countery_code_origin: data.code,
                          origin_code: data.lat + " - " + data.lon,
                        })
                      }
                      key={index}
                    >
                      <div className="left">
                        <i className="fa-solid fa-plane-departure"></i>
                        <span>
                          <p>
                            {data.name} ({data.code})
                          </p>
                          <p>{data.country}</p>
                        </span>
                      </div>
                      <div className="right">
                        <CountrieFlag name={data.country} />
                      </div>
                    </li>
                  ))}
              </ul>
              {/***************** End Origin overlay ************************/}
            </React.Fragment>
          )}
        </div>
        {/***************** Destination ************************/}
        <div className="card-input">
          <label htmlFor="Destination">
            <div className="left">
              <i className="fa-solid fa-earth-americas"></i>Destination *
            </div>
            <label class="switch" htmlFor="switchDestination">
              <input
                type="checkbox"
                id="switchDestination"
                checked={DestinationIndoor}
                onChange={() => {
                  SetDestinationIndoor(!DestinationIndoor);
                  SetShipping({ ...Shipping, Destination: "" });
                }}
              />
              <span class="slider"></span>
            </label>
          </label>
          <input
            type="search"
            id="Destination"
            placeholder={
              DestinationIndoor
                ? "Enter Your Location"
                : "Airport  , City or Zip Code"
            }
            ref={destination}
            value={
              Shipping.Destination
                ? Shipping.Destination +
                  " (" +
                  Shipping.countery_code_destination +
                  ")"
                : destTxtSearch
            }
            // onChange={(e) =>
            //   SetShipping({ ...Shipping, Destination: e.target.value })
            // }
            onChange={(e)=>{
              if(Shipping.Destination!=""){
                console.log(Shipping.countery_code_destination.slice(0,Shipping.countery_code_destination.length))
                SetShipping({...Shipping,countery_code_destination:Shipping.countery_code_destination.slice(0,Shipping.countery_code_destination.length-1)})
                if(Shipping.countery_code_destination==''){
                  setDestTxtSearch(Shipping.Destination)
                  SetShipping({Origen:Shipping.Origen,Destination:''});
                }
              }
              else {
                setDestTxtSearch(e.target.value)
              }
            }}
            onFocus={(e) => e.target.classList.add("active")}
            onBlur={(e) => e.target.classList.remove("active")}
          />
          {DestinationIndoor ? null : (
            <React.Fragment>
              {/***************** Destination overlay ************************/}
              <ul className="data-overlay">
                {AirportsData.filter((data) =>
                  destTxtSearch === ""
                    ? data
                    : data.name
                        .toLowerCase()
                        .includes(destTxtSearch.toLowerCase())
                    ? data.name
                        .toLowerCase()
                        .includes(destTxtSearch.toLowerCase())
                    : data.code
                        ?.toLowerCase()
                        .includes(destTxtSearch.toLowerCase())
                    ? data.code
                        ?.toLowerCase()
                        .includes(destTxtSearch.toLowerCase())
                    : data.country
                        ?.toLowerCase()
                        .includes(destTxtSearch.toLowerCase())
                    ? data.country
                        ?.toLowerCase()
                        .includes(destTxtSearch.toLowerCase())
                    : data.direct_flights
                        ?.toLowerCase()
                        .includes(destTxtSearch.toLowerCase())
                    ? data.direct_flights
                        ?.toLowerCase()
                        .includes(destTxtSearch.toLowerCase())
                    : data.state
                        ?.toLowerCase()
                        .includes(destTxtSearch.toLowerCase())
                    ? data.state
                        ?.toLowerCase()
                        .includes(destTxtSearch.toLowerCase())
                    : data.type
                        ?.toLowerCase()
                        .includes(destTxtSearch.toLowerCase())
                    ? data.type
                        ?.toLowerCase()
                        .includes(destTxtSearch.toLowerCase())
                    : data.city
                        .toLowerCase()
                        .includes(destTxtSearch.toLowerCase())
                )
                  .slice(0, 5)
                  .map((data, index) => (
                    <li
                      onClick={() =>
                        SetShipping({
                          ...Shipping,
                          Destination: data.name,
                          des_country: data.country,
                          countery_code_destination: data.code,
                          destination_code: data.lat + " - " + data.lon,
                        })
                      }
                      key={index}
                    >
                      <div className="left">
                        <i className="fa-solid fa-plane-departure"></i>
                        <span>
                          <p>
                            {data.name} ({data.code})
                          </p>
                          <p>{data.country}</p>
                        </span>
                      </div>
                      <div className="right">
                        <CountrieFlag name={data.country} />
                      </div>
                    </li>
                  ))}
              </ul>
              {/***************** End Destination overlay ************************/}
            </React.Fragment>
          )}
        </div>
        <div className="card-input">
          <label htmlFor="Destination" class>
            <div className="left">
              <i className="fa-solid fa-box"></i>Cargo *
            </div>
            <div
              className="right-crgo"
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <input
                type="checkbox"
                name="non-has"
                id="non-has"
                onChange={(e) => {
                  setNonHas(e.target.checked);
                }}
              />{" "}
              <label htmlFor="non-has">Non has</label>
            </div>
          </label>
          <input
            type="text"
            placeholder="Cargo Details"
            className={FCl_or_LCL_INPUT}
            value={nonHas ? (!cargoDesc ? "" : cargoDesc) : CargoLCL}
            onChange={(e) => null}
          />

          {/***************** Cargo overlay ************************/}
          {!nonHas ? (
            <div className="data-overlay">
              <div className="menu">
                <span className={"active"}>
                  <i className="fa-solid fa-boxes-stacked"></i>
                  <div className="info">
                    <span>package dimension</span>
                  </div>
                </span>
              </div>
              <div className="box-data">
                <div className="lcl-box">
                  <div className="input-box-lcl">
                    <label htmlFor="TotalWeigth">Total Weigth*</label>
                    <div className="inputs-box">
                      <input
                        type="number"
                        placeholder="Weigth"
                        id="TotalWeigth"
                        min={1}
                        ref={TW}
                        value={LCLData.WEIGHT}
                        onChange={(e) =>
                          SetLCLData({ ...LCLData, WEIGHT: e.target.value })
                        }
                      />
                      {/* <ReactDropdown
                      options={WEIGHT_SIZE_OPtions}
                      placeholder="Weight"
                      onChange={(e) =>
                        SetLCLData({ ...LCLData, WEIGHT_SIZE: e.value })
                      }
                      value={WEIGHT_SIZE_OPtions[0]}
                    /> */}
                      <div class="Dropdown-placeholder is-selected">
                        {WEIGHT_SIZE_OPtions[0]}
                      </div>
                    </div>
                  </div>
                  <div className="input-box-lcl">
                    <label htmlFor="TotalHeight">Total Height*</label>
                    <div className="inputs-box">
                      <input
                        type="number"
                        placeholder="Height"
                        id="TotalHeight"
                        min={1}
                        ref={TH}
                        value={LCLData.height}
                        onChange={(e) =>
                          SetLCLData({ ...LCLData, height: e.target.value })
                        }
                      />
                      {/* <ReactDropdown
                      options={height_Size_OPtions}
                      placeholder="Volume"
                      onChange={(e) =>
                        SetLCLData({ ...LCLData, height_Size: e.value })
                      }
                      value={height_Size_OPtions[0]}
                    /> */}
                      <div class="Dropdown-placeholder is-selected">
                        {height_Size_OPtions[0]}
                      </div>
                    </div>
                  </div>
                  <div className="input-box-lcl">
                    <label htmlFor="TotalLength">Total Length*</label>
                    <div className="inputs-box">
                      <input
                        type="number"
                        placeholder="Length"
                        id="TotalLength"
                        min={1}
                        ref={TL}
                        value={LCLData.Length}
                        onChange={(e) =>
                          SetLCLData({ ...LCLData, Length: e.target.value })
                        }
                      />
                      {/* <ReactDropdown
                      options={Length_SIZE_OPtions}
                      placeholder="Length"
                      onChange={(e) =>
                        SetLCLData({ ...LCLData, Length_SIZE: e.value })
                      }
                      value={Length_SIZE_OPtions[0]}
                    /> */}
                      <div class="Dropdown-placeholder is-selected">
                        {Length_SIZE_OPtions[0]}
                      </div>
                    </div>
                  </div>
                  <div className="input-box-lcl">
                    <label htmlFor="TotalWidth">Total Width*</label>
                    <div className="inputs-box">
                      <input
                        type="number"
                        placeholder="Width"
                        id="TotalWidth"
                        min={1}
                        ref={TWL}
                        value={LCLData.Width}
                        onChange={(e) =>
                          SetLCLData({ ...LCLData, Width: e.target.value })
                        }
                      />
                      {/* <ReactDropdown
                      options={Width_Size_OPtions}
                      placeholder="Volume"
                      onChange={(e) =>
                        SetLCLData({ ...LCLData, Width_Size: e.value })
                      }
                      value={Width_Size_OPtions[0]}
                    /> */}
                      <div class="Dropdown-placeholder is-selected">
                        {Width_Size_OPtions[0]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="data-overlay">
              <div className="menu">
                <span className={"active"}>
                  <i className="fa-solid fa-boxes-stacked"></i>
                  <div className="info">
                    <span>package description</span>
                  </div>
                </span>
              </div>
              <div className="box-data">
                <div className="lcl-box">
                  <textarea
                    name=""
                    id=""
                    style={{ width: "100%" }}
                    rows="10"
                    placeholder="Cargo Description"
                    onChange={(e) => setCargoDesc(e.currentTarget.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          )}
          {/***************** End Cargo overlay ************************/}
          <i
            class={
              FCl_or_LCL_INPUT === ""
                ? `fa-solid fa-chevron-down togle`
                : `fa-solid fa-chevron-up togle`
            }
            onClick={() =>
              FCl_or_LCL_INPUT === ""
                ? SetFCl_or_LCL_INPUT("active")
                : SetFCl_or_LCL_INPUT("")
            }
          />
        </div>
        <div className="Search-input">
          <button onClick={(e) => handleSearch(e)}>Search Rate</button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default AirTransportationMethod;
