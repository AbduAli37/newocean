import React, { useState, useEffect, useRef } from "react";
import "./Sea.css";
import { ContainersData } from "../../../../../ContainersData";
import "react-dropdown/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDropdown from "react-dropdown";
import CountrieFlag from "../Countrie Flag/CountrieFlag";
import { addContation } from "../../../../../functions/add_cotation";
import { useNavigate } from "react-router-dom";
function SeaTransportationMethod() {
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
  console.log("erre")
  const [OriginIndoor, SetOriginIndoor] = useState(false);
  const [DestinationIndoor, SetDestinationIndoor] = useState(false);

  /****************************************
  # Shipping Shosen Menu
 ******************************************/
  const [FCl_or_LCL, SetFCl_or_LCL] = useState("FCL");
  const [FCl_or_LCL_INPUT, SetFCl_or_LCL_INPUT] = useState("");
  const [cargoDesc, setCargoDesc] = useState(false);
  const [nonHas, setNonHas] = useState(false);
  /****************************************
  # Shipping FCl
 ******************************************/
  const [FCl, SetFCl] = useState([]);
  const [CargoFCL, SetCargoFCL] = useState("");

  useEffect(() => {
    let CargoLCLINPUT = FCl.map(
      (data) => `${data.qty}x${data.type.slice(0, 4)}`
    );
    SetCargoFCL(CargoLCLINPUT.join(","));
  }, [FCl]);

  const [Fcl_Options, SetFcl_Options] = useState([
    "20FT Container",
    "40FT Container",
    "40HC Container",
  ]);

  const HandleRemoveFcl = (index, type) => {
    // clone
    let Data = [...FCl];
    let NEwFclOptions = [...Fcl_Options];
    // edit
    let edit = Data.filter((da, ide) => ide !== index);
    NEwFclOptions.push(type);
    //update
    SetFCl(edit);
    SetFcl_Options(NEwFclOptions);
  };
  const HandleAddedChange = (e, index) => {
    // clone
    let Data = [...FCl];
    // edit
    const Edit = { ...Data[index], qty: e.target.value };
    //update
    Data[index] = Edit;
    SetFCl(Data);
  };
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

  const orgin = useRef();
  const destination = useRef();
  const TW = useRef();
  const TL = useRef();
  const TH = useRef();
  const TWL = useRef();
  const LCLCargo = useRef();

  const [FCLData, SetFCLData] = useState({
    ContainerType: "",
    Qty: 1,
  });

  const HandleAddFcl = (type, qty, indexOfType) => {
    if (FCLData.ContainerType !== "" && FCLData.Qty !== 0) {
      SetFCl([...FCl, { type, qty }]);
      SetFCLData({
        ContainerType: "",
        Qty: 1,
      });
      let Data = [...Fcl_Options];
      Data.splice(indexOfType, 1);
      SetFcl_Options(Data);
    }
    console.log(FCLData);
  };
  const inpuArr = [];
  const fclOpt = [
    {
      c_Type: "20FT",
      val: 40,
    },
    {
      c_Type: "40FT",
      val: 20,
    },
    {
      c_Type: "40HC",
      val: 40,
    },
  ];
  const handleremove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const [searchRate, useSearchRate] = useState({
    origin: "",
    destination: "",
    locationOriginType: "location",
    locationDestinationType: "location",
  });

  // const containers = useRef();

  const [inputList, setinputList] = useState([
    { container: "", Qty: "", val: "" },
  ]);

  const setContainerChange = (container, Qty, val) => {
    setinputList([...inputList, { container, Qty, val }]);
  };

  const handleSearch = async () => {
    searchRate.shipping_type = "ocean";
    searchRate.cargo = nonHas ? "non_has" : FCl_or_LCL;
    if (
      (((TW.current &&
        TH.current &&
        TWL.current &&
        TL.current &&
        destination.current &&
        orgin.current) ||
        LCLCargo.current) &&
        destination.current.value.length &&
        orgin.current.value.length) ||
      (destination.current &&
        orgin.current &&
        destination.current.value.length &&
        orgin.current.value.length &&
        nonHas &&
        cargoDesc)
    ) {
      console.log(searchRate.cargo, nonHas);
      if (searchRate.cargo == "LCL") {
        searchRate.TW = TW.current.value;
        searchRate.TH = TH.current.value;
        searchRate.TL = TL.current.value;
        searchRate.TWL = TWL.current.value;
      } else if (searchRate.cargo == "FCL") {
        let arr = [];
        FCl.forEach((value, index, array) => {
          let myString = value.type;
          let pattern1 = /\b(\d+)FT Container\b/;
          let pattern2 = /\b(\d+)HC Container\b/;
          let qt = myString.split(" Container")[0];
          let match = myString.match(pattern1)
            ? myString.match(pattern1)
            : myString.match(pattern2);

          let containerNumber = match[1];
          arr.push({
            Qty: value.qty,
            conatainerType: qt.includes("FT")
              ? containerNumber + " ft.container"
              : containerNumber + " hc.container",
          });
        });
        // 40 ft.container**3**ocean**20 ft.container**1
        /* 20 ft.Container**12**ocean**40 ft.Container**11 */
        let money = "";
        for (let i = 0; i < arr.length; i++) {
          if (i == 0) {
            const str = arr[i].conatainerType + "**" + arr[i].Qty;
            money += str;
          } else {
            const str = "**ocean**" + arr[i].conatainerType + "**" + arr[i].Qty;
            money += str;
          }
        }
        searchRate.container_data = money;
      }
      searchRate.description = cargoDesc ? cargoDesc : "";

      searchRate.cargo = FCl_or_LCL.toLowerCase();
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

      if (
        (searchRate.TW && searchRate.TH && searchRate.TWL && searchRate.TL) ||
        searchRate.container_data
      ) {
        const addCotation = await addContation(searchRate);
        console.log(addCotation)
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
        console.log(searchRate)
        console.log(addCotation.status != "success");
        addCotation.status != "success"
          ? toast.error(addCotation.message)
          : toast.success("Quotation Added Successfully");
      } else {
        toast.error("Data Not Complete");
      }
    } else {
      toast.error("Data Not Complete");
    }
  };

  return (
    <React.Fragment>
      <div className="SeaTransportationMethod">
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
                onChange={() => {
                  SetOriginIndoor(!OriginIndoor);
                  searchRate.locationOtiginType = OriginIndoor
                    ? "location"
                    : "code";
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
              ? Shipping.Origen + " ("+Shipping.countery_code_origin+")"
              : originTxtSearch
          }
            placeholder={
              OriginIndoor
                ? "Enter Your Location"
                : "Seaport  , City or Zip Code"
            }
            ref={orgin}
            // onChange={(e) =>
            //   SetShipping({ ...Shipping, Origen: e.target.value })
            // }
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
                {ContainersData.filter((data) =>
                  originTxtSearch === ""
                    ? data
                    : data.name
                        ?.toLowerCase()
                        ?.includes(originTxtSearch.toLowerCase())
                    ? data.name
                        ?.toLowerCase()
                        ?.includes(originTxtSearch.toLowerCase())
                    : data.city
                        ?.toLowerCase()
                        ?.includes(originTxtSearch.toLowerCase())
                    ? data.city
                        ?.toLowerCase()
                        ?.includes(originTxtSearch.toLowerCase())
                    : data.country
                        ?.toLowerCase()
                        ?.includes(originTxtSearch.toLowerCase())
                    ? data.country
                        ?.toLowerCase()
                        ?.includes(originTxtSearch.toLowerCase())
                    : data.code
                        ?.toLowerCase()
                        ?.includes(originTxtSearch.toLowerCase())
                )
                  .slice(0, 5)
                  .map((data) => (
                    <li
                      onClick={() =>
                        SetShipping({
                          ...Shipping,
                          Origen: data.name,
                          or_country: data.country,
                          countery_code_origin: data?.unlocs[0],
                          origin_code: data.coordinates
                            .join(",")
                            .replace(",", " - "),
                        })
                      }
                    >
                      <div className="left">
                        <i className="fa-solid fa-anchor"></i>
                        <span>
                          <p>
                            {data.name} ({data.unlocs[0]})
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
                : "Seaport  , City or Zip Code"
            }
            value={
              Shipping.Destination
                ? Shipping.Destination + " ("+Shipping.countery_code_destination+")"
                : destTxtSearch
            }
            ref={destination}
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
                {ContainersData.filter((data) =>
                  destTxtSearch === ""
                    ? data
                    : data.name
                        ?.toLowerCase()
                        ?.includes(destTxtSearch.toLowerCase())
                    ? data.name
                        ?.toLowerCase()
                        ?.includes(destTxtSearch.toLowerCase())
                    : data.city
                        ?.toLowerCase()
                        ?.includes(destTxtSearch.toLowerCase())
                    ? data.city
                        ?.toLowerCase()
                        ?.includes(destTxtSearch.toLowerCase())
                    : data.country
                        ?.toLowerCase()
                        ?.includes(destTxtSearch.toLowerCase())
                    ? data.country
                        ?.toLowerCase()
                        ?.includes(destTxtSearch.toLowerCase())
                    : data.code
                        ?.toLowerCase()
                        ?.includes(destTxtSearch.toLowerCase())
                )
                  .slice(0, 5)
                  .map((data) => (
                    <li
                      onClick={() => {
                        SetShipping({
                          ...Shipping,
                          Destination: data.name,
                          des_country: data.country,
                          countery_code_destination: data?.unlocs[0],
                          destination_code: data.coordinates
                            .join(",")
                            .replace(",", " - "),
                        });
                      }}
                    >
                      <div className="left">
                        <i className="fa-solid fa-anchor"></i>
                        <span>
                          <p>
                            {data.name} ({data.unlocs[0]})
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
          <label htmlFor="Destination">
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
            ref={LCLCargo}
            className={FCl_or_LCL_INPUT}
            value={
              nonHas
                ? !cargoDesc
                  ? ""
                  : cargoDesc
                : FCl_or_LCL === "FCL"
                ? CargoFCL
                : CargoLCL
            }
            onChange={(e) => null}
          />

          {/***************** Cargo overlay ************************/}
          {!nonHas ? (
            <div className="data-overlay">
              <div className="menu">
                <span
                  className={FCl_or_LCL === "FCL" ? "active" : ""}
                  onClick={() => SetFCl_or_LCL("FCL")}
                >
                  <i className="fa-solid fa-dolly"></i>
                  <div className="info">
                    <span>FCl</span>
                    <span>Full Container</span>
                  </div>
                </span>
                <span
                  className={FCl_or_LCL === "LCL" ? "active" : ""}
                  onClick={() => SetFCl_or_LCL("LCL")}
                >
                  <i className="fa-solid fa-boxes-stacked"></i>
                  <div className="info">
                    <span>LCL</span>
                    <span>Shared Container</span>
                  </div>
                </span>
              </div>
              <div className="box-data">
                {FCl_or_LCL === "FCL" ? (
                  <div className="fcl-box">
                    {Fcl_Options.length > 0 ? (
                      <div className="actions">
                        <div className="input-box-fcl">
                          <label htmlFor="">Container type *</label>
                          <ReactDropdown
                            options={Fcl_Options}
                            placeholder="Type ?"
                            onChange={(e) =>
                              SetFCLData({ ...FCLData, ContainerType: e.value })
                            }
                            className="ContainerType"
                            value={Fcl_Options[0]}
                          />
                        </div>
                        <div className="input-box-fcl">
                          <label htmlFor="QTY">Qty *</label>
                          <input
                            type="number"
                            placeholder="qty"
                            min="1"
                            value={FCLData.Qty}
                            onChange={(e) =>
                              SetFCLData({ ...FCLData, Qty: e.target.value })
                            }
                            id="QTY"
                          />
                        </div>

                        <button
                          onClick={() =>
                            HandleAddFcl(
                              FCLData.ContainerType,
                              FCLData.Qty,
                              Fcl_Options.indexOf(FCLData.ContainerType)
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    ) : null}

                    <div className="data">
                      {FCl.map((data, index) => (
                        <div className="box-data-chosen">
                          <input
                            type="text"
                            value={data.type}
                            placeholder={data.type}
                            readOnly
                          />
                          <input
                            type="number"
                            value={data.qty}
                            placeholder={data.type}
                            onChange={(e) => HandleAddedChange(e, index)}
                            min={1}
                          />
                          <button
                            onClick={() => HandleRemoveFcl(index, data.type)}
                          >
                            -
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
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
                          ref={TL}
                          min={1}
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
                          ref={TWL}
                          min={1}
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
                )}
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
export default SeaTransportationMethod;
