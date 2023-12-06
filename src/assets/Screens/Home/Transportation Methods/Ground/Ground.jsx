import React, { useState, useEffect, useRef } from "react";
import "./Ground.css";
import { ContainersData } from "../../../../../ContainersData";
import CountrieFlag from "../Countrie Flag/CountrieFlag";
import "react-dropdown/style.css";
import ReactDropdown from "react-dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addContation } from "./../../../../../functions/add_cotation";
import { useNavigate } from "react-router-dom";

function GroundTransportationMethod() {
  /****************************************
  # Shipping Origen , Destination
 ******************************************/
  const [Shipping, SetShipping] = useState({
    Origen: "",
    Destination: "",
  });
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
  });
  const [cargoDesc, setCargoDesc] = useState(false);
  const [nonHas, setNonHas] = useState(false);
  const [OriginIndoor, SetOriginIndoor] = useState(true);
  const [DestinationIndoor, SetDestinationIndoor] = useState(true);
  /****************************************
  # Shipping Shosen Menu
 ******************************************/
  const [FCl_or_LCL_INPUT, SetFCl_or_LCL_INPUT] = useState("");

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
    searchRate.shipping_type = "local";
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

      searchRate.origin = Shipping.Origen;

      searchRate.destination = Shipping.Destination;

      searchRate.locationOriginType = "location";

      searchRate.locationDestinationType = "location";

      searchRate.origin_code = "35.12-12.13";

      searchRate.destination_code = "35.12-12.13";

      searchRate.countery_code_destination = "United States";

      searchRate.countery_code_origin = "United States";

      const addCotation = await addContation(searchRate);
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
  };
  return (
    <React.Fragment>
      {/* Same as */}
      <div className="GroundTransportationMethod">
        {/***************** Origin  ************************/}
        <div className="card-input">
          <label htmlFor="Origin">
            <div className="left">
              <i className="fa-solid fa-earth-americas"></i> Origin *
            </div>
            <label class="switch" htmlFor="switchOrigin">
              <input
                type="checkbox"
                id="switchOrigin"
                checked={OriginIndoor}
                onChange={() => SetOriginIndoor(!OriginIndoor)}
                disabled
              />
              <span class="slider"></span>
            </label>
          </label>
          <input
            type="search"
            id="Origin"
            value={Shipping.Origen}
            ref={orgin}
            placeholder="Location"
            onChange={(e) =>
              SetShipping({ ...Shipping, Origen: e.target.value })
            }
            onFocus={(e) => e.target.classList.add("active")}
            onBlur={(e) => e.target.classList.remove("active")}
          />
          {/***************** Origin overlay ************************/}
          {/* <ul className="data-overlay">
            {ContainersData.filter((data) =>
              Shipping.Origen === ""
                ? data
                : data.name
                    .toLowerCase()
                    .includes(Shipping.Origen.toLowerCase())
                ? data.name
                    .toLowerCase()
                    .includes(Shipping.Origen.toLowerCase())
                : data.code
                    ?.toLowerCase()
                    .includes(Shipping.Origen.toLowerCase())
                ? data.code
                    ?.toLowerCase()
                    .includes(Shipping.Origen.toLowerCase())
                : data.unlocs
                    .join("")
                    .toLowerCase()
                    .includes(Shipping.Origen.toLowerCase())
            )
              .slice(0, 5)
              .map((data) => (
                <li
                  onClick={() =>
                    SetShipping({ ...Shipping, Origen: data.name })
                  }
                >
                  <div className="left">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>
                      <p>{data.name}</p>
                      <p>{data.country}</p>
                    </span>
                  </div>
                  <div className="right">
                    <CountrieFlag name={data.country} />
                  </div>
                </li>
              ))}
          </ul> */}
          {/***************** End Origin overlay ************************/}
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
                onChange={() => SetDestinationIndoor(!DestinationIndoor)}
                disabled
              />
              <span class="slider"></span>
            </label>
          </label>
          <input
            type="search"
            id="Destination"
            placeholder="Location"
            value={Shipping.Destination}
            ref={destination}
            onChange={(e) =>
              SetShipping({ ...Shipping, Destination: e.target.value })
            }
            onFocus={(e) => e.target.classList.add("active")}
            onBlur={(e) => e.target.classList.remove("active")}
          />
          {/***************** Destination overlay ************************/}
          {/* <ul className="data-overlay">
            {ContainersData.filter((data) =>
              Shipping.Destination === ""
                ? data
                : data.name
                    .toLowerCase()
                    .includes(Shipping.Destination.toLowerCase())
                ? data.name
                    .toLowerCase()
                    .includes(Shipping.Destination.toLowerCase())
                : data.code
                    ?.toLowerCase()
                    .includes(Shipping.Destination.toLowerCase())
                ? data.code
                    ?.toLowerCase()
                    .includes(Shipping.Destination.toLowerCase())
                : data.unlocs
                    .join("")
                    .toLowerCase()
                    .includes(Shipping.Destination.toLowerCase())
            )
              .slice(0, 5)
              .map((data, index) => (
                <li
                  onClick={() =>
                    SetShipping({ ...Shipping, Destination: data.name })
                  }
                  key={index}
                >
                  <div className="left">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>
                      <p>{data.name}</p>
                      <p>{data.country}</p>
                    </span>
                  </div>
                  <div className="right">
                    <CountrieFlag name={data.country} />
                  </div>
                </li>
              ))}
          </ul> */}

          {/***************** End Destination overlay ************************/}
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
export default GroundTransportationMethod;
