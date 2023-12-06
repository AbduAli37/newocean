import React, { useCallback, useEffect, useState } from "react";
import "./search.css";
import { GiBoxUnpacking } from "react-icons/gi";
import { IoEarth } from "react-icons/io5";
import { BiCoinStack, BiPhoneCall, BiAnchor } from "react-icons/bi";
import { FaPlane } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { BsBox } from "react-icons/bs";
//import {HiOutlineInboxStack} from 'react-icons/hi'
import { HiOutlineInboxStack } from "react-icons/hi2";
import DATA from "../../data.json";
//import Flag from 'react-world-flags';
import Flag from "react-flags";
import { FlagIcon } from "react-flag-kit";
import { arr } from "./getdata";
import { air } from "../../airports";
import { flagdata } from "../../flagdata";
import { flagSet } from "@coreui/icons";
import Map from "./Map";
import { Button, Modal } from "antd";
import axios from "axios";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import Map2 from "./Map2";
import { useNavigate } from "react-router";

const Search = ({ setSourceLocation }) => {
  const [isModalOpenhir1, setIsModalOpenhir1] = useState(false);

  const showModalhir1 = () => {
    setIsModalOpenhir1(true);
  };
  const handleOkhir1 = () => {
    setIsModalOpenhir1(false);
  };
  const handleCancelhir1 = () => {
    setIsModalOpenhir1(false);
  };


  const [destination ,setdestination]=useState("");
  const [origin ,setorigin]=useState("");
  const [destination_type,setdestination_type]=useState("");
  const [origin_type,setorigin_type]=useState("");
  const [shipping_type,setshipping_type]=useState("ocean");
  const [destination_code,setdestination_code]=useState("");
  const [origin_code,setorigin_code]=useState("")

  const [countery_code_origin,setcountery_code_origin]=useState("");
  const [countery_code_destination,setcountery_code_destination]=useState("");
  const [origin_location_name,setorigin_location_name]=useState("");
  const [destination_location_name,setdestination_location_name]=useState("");


  const [country_name1,setcountry_name1]=useState("");
  const [country_name2,setcountry_name2]=useState("");
  const [cargo,setcargo]=useState("fcl");

  let local_storage=localStorage.getItem("myaccount");
  const navigate = useNavigate();
  const { user, uData } = useContext(AppContext);
  const [showstate2, setshowstate2] = useState(true);
  // const [showstate5, setshowstate5] = useState(true);
  const [showcontries, setshowcontries] = useState(false);
  const [OriginName, setOrigin] = React.useState("");
  const [DestinationName, setDestination] = useState("");
  const [DestinationType, setDestinationType] = useState("code");
  const [OriginType, setOriginType] = React.useState("code");
  const [showfcl, setshowfcl] = useState(true);
  const [showfcllcl, setshowfcllcl] = useState(false);
  const [showcontries2, setshowcontries2] = useState(false);
  const [showplane, setshowplane] = useState(true);
  const [showway, setshowway] = useState("oc");
  const [CargoType, setCargoType] = useState("fcl");
  //const [countery_code_origin, setcountery_code_origin] = useState(null);
  //const [countery_code_destination, setcountery_code_destination] = useState(null);
  //const [shipping_type, setshipping_type] = useState("ocean");
  const [whichModal, setWhichModal] = useState(""); // 1-> from , 2-> to
  const [showlogstatus, setshowlogstatus] = useState(false);
  const [getdatasend, setgetdatasend] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpencontries1, setIsModalOpencontries1] = useState(false);

  const [showfirstdismodal,setshowfirstdismodal]=useState(false);
  const [showsecondorigin,setshowsecondorigin]=useState(false);
  const [showseconddismodal,setshowseconddismodal]=useState(false);
  const [psfromdata, setpsfromdata] = useState({
    lat: "",
    lng: "",
  });
  const [pstodata, setpstodata] = useState({
    lat: "",
    lng: "",
  });

  const [DataLcl, setDataLcl] = useState({
    height: "",
    length: "",
    width: "",
    weight: "",
  });


  const [origincodemap,setorigincodemap]=useState({
    lat:'',
    lng:'',
  })

  const [destinationcodemap,setdestinationcodemap]=useState({
    lat:'',
    lng:'',
  })


  const handleremove = (index) => {

    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
    setselectedarr(selectedarr.map((item)=>{
      if(item.id==index){
        return {...item,di:false};
      }
      else return {...item};
    }))
  };
  const [selectedarr, setselectedarr] = useState([
    {
      label: "choose one",
      value: "choose one",
      id: 0,
      di: false,
    },
    {
      label: "20 ft.Container",
      value: "20 ft.Container",
      id: 1,
      di: false,
    },
    {
      label: "40 ft.Container",
      value: "40 ft.Container",
      id: 2,
      di: false,
    },
    {
      label: "40 hc.Container",
      value: "40 hc.Container",
      id: 3,
      di: false,
    },
  ]);

  const [inputList, setinputList] = useState([
    { container: "", Qty: "", val: "" },
  ]);

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };


  const handleaddclick = () => {
    setinputList([...inputList, { container: "", Qty: "", val: "" }]);
  };
  const DataSend = () => {
    const data_send={
      cargo:cargo,
      shipping_type:shipping_type||"",
      origin_location_name:origin_location_name||"",
      origin_type:origin_type||"",
      origin_code:origin_code||"",
      countery_code_origin:countery_code_origin||"",
      destination_type:destination_type||"",
      destination_code:destination_code||"",
      countery_code_destination:countery_code_destination||"",
      destination_location_name:destination_location_name||""
    }
    console.log(data_send);
    if (cargo === "fcl") {
      console.log(inputList);
      const arr = [...inputList];
      let money = "";

      for (let i = 0; i < arr.length; i++) {
        if (i == 0) {
          const str = arr[i].val + "**" + arr[i].Qty;
          money += str;
        } else {
          const str = "**ocean**" + arr[i].val + "**" + arr[i].Qty;
          money += str;
        }
      }
      data_send["container_data"] = money;
    } else {
      data_send["width"] = DataLcl.width;
      data_send["height"] = DataLcl.height;
      data_send["length"] = DataLcl.length;
      data_send["weight"] = DataLcl.weight;
    }
    console.log(data_send);
    if(local_storage==null){
      setshowlogstatus(true);
      setgetdatasend({ ...data_send });
    }
    else {
      navigate("/dashboard/quotes");
      axios
        .post(
          "https://camp-coding.tech/ocean_burg/user/add_cotation.php",
          JSON.stringify(data_send)
        )
        .then((res) => {
          if (res.data.status === "success") {
            toast.success(res.data.message);
          }
          console.log(res.data);
        });
    }
    /* let data_send = {
      cargo: CargoType,
      destination_type: DestinationType,
      origin_type: OriginType,
      shipping_type: shipping_type,
    };

    if(OriginType==='location'){
      data_send['origin_location_name']=origin_location_name;
      data_send['countery_code_origin']="";

    }
    else{
      data_send['countery_code_origin']=countery_code_origin;
      data_send['origin_location_name']="";

    }
    if(DestinationType==='location'){
      data_send['destination_location_name']=destination_location_name;
      data_send['countery_code_destination']="";
    }
    else{
      data_send['countery_code_destination']=countery_code_destination
      data_send['destination_location_name']="";
    }


    if (CargoType === "fcl") {
      const arr = [...inputList];
      let money = "";

      for (let i = 0; i < arr.length; i++) {
        if (i == 0) {
          const str = arr[i].container + "**" + arr[i].Qty;
          money += str;
        } else {
          const str = "**ocean**" + arr[i].container + "**" + arr[i].Qty;
          money += str;
        }
      }
      data_send["container_data"] = money;
    } else {
      data_send["width"] = DataLcl.width;
      data_send["height"] = DataLcl.height;
      data_send["length"] = DataLcl.length;
      data_send["weight"] = DataLcl.weight;
    }

    console.log(JSON.stringify(data_send));
    console.log(data_send);
    if(local_storage==null){
      setshowlogstatus(true);
      setgetdatasend({ ...data_send });
    }
    else {
      navigate("/dashboard/quotes");
      axios
        .post(
          "https://camp-coding.tech/ocean_burg/user/add_cotation.php",
          JSON.stringify(data_send)
        )
        .then((res) => {
          if (res.data.status === "success") {
            toast.success(res.data.message);
          }
          console.log(res.data);
        });
    } */
/*     if (local_storage !== null || local_storage !== undefined) {

    } else {

    } */
  };



  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal2 = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setWhichModal("");
  };

  const getimagesrc = (c_name) => {
    // c_name="Spain"
    let src = "";
    for (let i = 0; i < flagdata.length; i++) {
      if (c_name == flagdata[i].name) {
        src = flagdata[i].image;
      }
    }
    return src;
  };

  //console.log(flagdata)
  const handleOk2 = () => {
    setshowlogstatus(false);
  };
  const handleCancel3 = () => {
    setshowlogstatus(false);
  };

  const showModalcontries1 = () => {
    setIsModalOpencontries1(true);
  };

  const handleOkcontries1 = () => {
    setIsModalOpencontries1(false);
  };

  const handleCancelcontries1 = () => {
    setIsModalOpencontries1(false);
  };



  const showModalcontries2 = () => {
    //setIsModalOpencontries2(true);
  };



  const handleOkdestination1 = () => {
    // console.log("pp")
    //setIsModalOpendestination1(false);
  };

  const handleCanceldestination1 =useCallback(() => {
    // alert("25")
    // console.log("jjd")
/*     setIsModalOpendestination1(false);
    setisModalOpendestination2(false);
    setIsModalOpencontries1(false);
    setIsModalOpencontries2(false);
    setIsModalOpendestination1(false) */
  },[])



  const getcontryfromlocation1=()=>{
    console.log(origin_type);

    axios.get(`https://api.opencagedata.com/geocode/v1/json?key=11b0d7e434434701b8abbd35932bdd69&q=${origincodemap.lat},${origincodemap.lng}&pretty=1&no_annotations=1`)
    .then((res)=>{
    console.log(origin_code);
      //console.log(res.data)
      //console.log(res.data.results[0].formatted);
      setcountery_code_origin(res.data.results[0].components.country_code)
      console.log(res.data.results[0].components.country_code)
      setorigin_location_name(res.data.results[0].geometry)
      setcountry_name1(res.data.results[0].components.country);
      setorigin_location_name(res.data.results[0].formatted)
      //console.log(res.data.results[0].components.country)
    })
  }
  useEffect(()=>{
    getcontryfromlocation1();
  },[origincodemap])

  const getcontryfromlocation2=()=>{
    //console.log(destination_code);
    //console.log(origin_type);

    axios.get(`https://api.opencagedata.com/geocode/v1/json?key=11b0d7e434434701b8abbd35932bdd69&q=${destinationcodemap.lat},${destinationcodemap.lng}&pretty=1&no_annotations=1`)
    .then((res)=>{
      setdestination_location_name(res.data.results[0].formatted);
      //console.log(res.data.results[0].components.country_code);
      //console.log(res.data.results[0].geometry);
      setcountery_code_destination(res.data.results[0].components.country_code);
      setdestination_location_name(res.data.results[0].formatted)
      setcountry_name2(res.data.results[0].components.country);
    })
  }
  useEffect(()=>{
    getcontryfromlocation2();
  },[destinationcodemap])
  return (
    <React.Fragment>
      <div className="container_search">
        <div className="sar">
          <p>sea freight</p>
          <p>air freight</p>
          <p>road freight</p>
        </div>
        <h3>
          welcome to <br /> oceanburg
        </h3>
        <p>
          We are freight forwarding experts, provide high-performance logistics
          and supply chain management <br />
          solutions to customers from a diverse range of industries throughout
          the world.
        </p>

        <div className="container">
          <div className="buttons">
            <button
              onClick={() => {
                setshowway("oc");
                setOrigin("");
                setDestination("");
                //setshipping_type("ocean");
                setshowfcllcl(false);
                setshowcontries(false);
                setshowcontries2(false);
                setshipping_type("ocean")
                setcargo("fcl")
              }}
              className={`${showway == "oc" ? "active" : ""}`}
            >
              Ocean Freight
            </button>
            <button
              onClick={() => {
                setshowway("af");
                setOrigin("");
                setDestination("");
                //setshipping_type("air");
                setshowfcllcl(false);
                setshowcontries(false);
                setshowcontries2(false);
                setshipping_type("air")
                setcargo("lcl");
              }}
              style={{borderRadius:'0px'}}
              className={`${showway == "af" ? "active" : ""}`}
            >
              Air Freight
            </button>
            <button
              onClick={() => {
                setshowway("ro");
                setOrigin("");
                setDestination("");
                //setshipping_type("air");
                setshowfcllcl(false);
                setshowcontries(false);
                setshowcontries2(false);
                setshipping_type("local")
                setcargo("lcl")
              }}
              className={`${showway == "ro" ? "active" : ""}`}
            >
              road freight
            </button>
            {/* <button
              onClick={() => {
                setshowway2(false);
                setshowway(false);
                setshipping_type("local");
              }}
              className={`${showway2 ? "active" : ""}`}
            >
              Location
            </button> */}
          </div>

          {showway == "oc" ? (
            <React.Fragment>
              <div className="search_categories">
                <div className="row g-0">
                  {showplane ? (
                    <React.Fragment>
                      <div className="col-lg-4">
                        <div className="row w-100 g-0">
                          <p className="way-air w-100 bg-white p-0 m-0 text-center pb-1">
                            <IoEarth />
                            Origin
                          </p>
                          <div className="col-md-6">
                            <div
                              className="origin position-relative"
                              onClick={() => {
                                setshowcontries(true);
                                setshowfcllcl(false);
                                setshowcontries2(false);
                                setOriginType("code");
                                setorigin_type("code");
                              }}
                            >
                              <Modal className="modalcontries" title="Basic Modal" open={isModalOpencontries1} onOk={handleOkcontries1} onCancel={handleCancelcontries1}>
                              <input
                                onClick={()=>{
                                  setIsModalOpencontries1(true);
                                }}
                                className="value2"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                }}
                                type="text"
                                placeholder="SeaPort, city "
                                onChange={(event) => {
                                  const inputValue = event.target.value;
                                  //console.log(inputValue);
                                  setOriginType("origin");

                                  setOrigin(inputValue);
                                  getimagesrc(event.target.value);
                                  setorigin_code(event.target.value);
                                  setorigin(event.target.value)
                                }}
                                value={
                                  origin_type == "location"
                                    ? country_name1
                                    : origin
                                }
                              />
                                <p className="ports">
                                  {arr
                                    .filter((data) => {
                                      const titleLower =
                                        data.city.toLowerCase();
                                      const inputLower =
                                        OriginName.toLowerCase();
                                      return titleLower.includes(inputLower);
                                    })
                                    .map((item, index, id) =>{
                                      return (
                                        <div className="port"
                                          onClick={()=>{
                                            console.log(item);
                                            setIsModalOpencontries1(false);
                                            setorigin(item.name);
                                            setOrigin(item.name);
                                            //setcountery_code_origin(item.code);
                                            setorigin_code(item.name)
                                            setcountery_code_origin(item.code);
                                          }}
                                        >
                                        <div className="port_left">
                                          <BiAnchor />
                                          <div
                                            className="port_contry"
                                            onClick={() => {
                                              setOrigin(item.name);
                                              //setcountery_code_origin(item.code);
                                              setshowcontries(false);
                                              setorigin_code(item.name);
                                              setorigin(item.name);
                                              setcountery_code_origin(item.code);
                                            }}
                                          >
                                            <span>{item.name}</span>
                                            <span>{item.country}</span>
                                          </div>
                                        </div>
                                        <div className="port_right">
                                          <img
                                            src={getimagesrc(item.country)}
                                            style={{
                                              width: "20px",
                                              height: "20px",
                                            }}
                                          />
                                        </div>
                                      </div>
                                      )
                                    }
                      /*                 index <= 5 ? (
                                        <div className="port">
                                          <div className="port_left">
                                            <FaPlane />
                                            <div
                                              className="port_contry"
                                              onClick={() => {
                                                setOrigin(item.name);
                                                setcountery_code_origin(item.code);
                                                setshowcontries(false);
                                              }}
                                            >
                                              <span>{item.name}</span>
                                              <span>{item.country}</span>
                                            </div>
                                          </div>
                                          <div className="port_right">
                                            <img
                                              src={getimagesrc(item.country)}
                                              style={{
                                                width: "20px",
                                                height: "20px",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      ) : null */
                                    )}
                                </p>
                              </Modal>
{/*                               {showcontries === true ? (

                              ) : null} */}

                              <div

                                style={{
                                  width:'100%'
                                }}
                                className="org_text"
                                onClick={() => {
                                  //setshowcontries(true);
                                  setIsModalOpencontries1(true);
                                  setshowfcllcl(false);
                                  setshowcontries2(false);
                                }}
                              >
                                <span
                                  className={`${showcontries ? "active" : ""}`}
                                >
                                  {" "}
                                  <IoEarth />
                                  origin
                                </span>
                              </div>

                              <input
                              onClick={()=>{
                                showModalcontries1();
                                setorigin_type("code");
                              }}
                                className="value2"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                }}
                                type="text"
                                placeholder="SeaPort, city "
                                onChange={(event) => {
                                  const inputValue = event.target.value;
                                  //console.log(inputValue);
                                  setOrigin(inputValue);
                                  setOriginType("code");
                                  getimagesrc(event.target.value);
                                }}
                                value={
                                  origin_type == "location"
                                    ? country_name1
                                    : origin
                                }
                              />
                            </div>
                          </div>
                          <div
                            className="col-md-6"
                            onClick={() => {
                              setshowcontries(false);
                              setshowfcllcl(false);
                              setshowcontries2(false);
                            }}
                          >
                            <button
                              onClick={() => {
                                setshowcontries(false);
                                showModal();
                                setOriginType("location");
                                setWhichModal("1");
                                setorigin_type("location");
                              }}
                              className={`btn w-100 h-100 ${
                                isModalOpen ? "activee" : ""
                              }`}
                            >
                              Location
                            </button>
                            <Modal
                              open={isModalOpen}
                              onOk={() => {
                                handleOk();
                              }}
                              onCancel={handleCancel}
                            >
                              <Map
                                onPress={(psData) => {
                                  console.log(psData)
                                  if (whichModal == "1") {
                                    setpsfromdata(psData);
                                    setorigincodemap({lat:psData.lat,lng:psData.lng})
                                    setorigin_code(`${psData.lng}-${psData.lat}`);
                                  } else {
                                    setpstodata(psData);
                                    setdestinationcodemap({
                                      lat:psData.lat,
                                      lng:psData.lng
                                    })
                                    setdestination_code(`${psData.lng}-${psData.lat}`);
                                  }
                                  console.log(psData);
                                }}
                              />
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}

                  {showstate2 ? (
                    <React.Fragment>
                      <div className="col-md-4">
                        <div className="row w-100 g-0">
                          <p className="way-air2 w-100 bg-white p-0 m-0 text-center pb-1">
                            <IoEarth />
                            Destination
                          </p>
                          <div
                            onClick={()=>{
                              setshowcontries2(true);
                              showModalcontries2();
                            }}
                          className="col-md-6">
                            <div
                              className="destination"
                              onClick={() => {
                                //setIsModalOpendestination1(true);
                                //setIsModalOpencontries2(true);
                                //setshowcontries(false);
                                showModalcontries2();

                                setshowfcllcl(false);
                                setshowcontries2(true);
                                setOriginType("code");
                              }}
                            >
                              {/* hir1 */}

                                  {
                                    showfirstdismodal?(
                                      <Modal
                                      title=""
                                      open={true}
                                      onOk={()=>{
                                        handleOkdestination1();
                                        setshowfirstdismodal(false);
                                      }}
                                      onCancel={()=>{
                                        handleCanceldestination1();
                                        setshowfirstdismodal(false);

                                      }}
                                    >
                                    <input
                                      style={{
                                        width:'90%',
                                        height:'30px',
                                        borderRadius:"10px",
                                        padding:'10px',
                                        border:'1px solid #ccc'
                                      }}
                                      value={
                                        destination_type == "location"
                                          ? country_name2
                                          /* `${pstodata.lng + "-" + pstodata.lat}` */
                                          : destination_code
                                      }
                                      onChange={(e) => {
                                        //setDestinationType("location");
                                        setDestination(e.target.value)
                                        setdestination(e.target.value);
                                        setdestination_code(e.target.value);
                                        //setDestination(e.target.value);
                                      }}
                                      type="text"
                                      placeholder="SeaPort, city "
                                    />
                                      <p style={{}} className="ports">
                                        {arr
                                          .filter((data) => {
                                            const titleLower =
                                              data.country.toLowerCase();
                                            const inputLower =
                                              DestinationName.toLowerCase();
                                            return titleLower.includes(inputLower);
                                          })
                                          .map((item, index) =>{
                                            return(
                                              <div className="port"
                                                onClick={()=>{
                                                  console.log(item);
                                                  setDestination(item.name);
                                                  setcountery_code_destination(item.code);
                                                  setshowfirstdismodal(false);
                                                  setdestination(item.name);
                                                  setdestination_code(item.name);
                                                  //setcountery_code_destination(item.code);
                                                }}
                                              >
                                              <div className="port_left">
                                                <BiAnchor />
                                                <div
                                                  className="port_contry"
                                                  onClick={() => {
                                                    setIsModalOpencontries1(false);
                                                    //setIsModalOpencontries2(false);
                                                    //setisModalOpendestination2(false);
                                                    //setIsModalOpendestination1(false);
                                                    setDestination(item.name);
                                                    setcountery_code_destination(item.code);
                                                    setshowcontries2(false);
                                                    setdestination(item.name);
                                                    setdestination_code(item.code);
                                                  }}
                                                >
                                                  <span>{item.name}</span>
                                                  <span>{item.country}</span>
                                                </div>
                                              </div>
                                              <div className="port_right">
                                                <img
                                                  src={getimagesrc(item.country)}
                                                  style={{
                                                    width: "20px",
                                                    height: "20px",
                                                  }}
                                                />
                                              </div>
                                            </div>
                                            )
                                          }

                                          )}
                                      </p>
                                    </Modal>
                                    ):(
                                      null
                                    )
                                  }
                              <div className="des_text">
                                <span
                                  className={`${showcontries2 ? "active" : ""}`}
                                >
                                  <IoEarth />
                                  destination
                                </span>
                              </div>

                              <input
                              onClick={()=>{
                                setshowfirstdismodal(true);
                                setdestination_type("code");
                                //showdestination1();
                                //setIsModalOpendestination1(true);
                                // setIsModalOpenhir1(true);
                              }}
                                value={
                                  destination_type== "location"
                                    ? country_name2
                                    //`${pstodata.lng + "-" + pstodata.lat}`
                                    : destination
                                }
                                onChange={(e) => {
                                  setdestination_type("code");
                                  setDestination(e.target.value);
                                }}
                                type="text"
                                placeholder="SeaPort, city "
                              />
                            </div>
                          </div>
                          <div
                            className="col-md-6"
                            onClick={() => {
                              setshowcontries(false);
                              setshowfcllcl(false);
                              setshowcontries2(false);
                            }}
                          >
                            <button
                              className="btn w-100 h-100"
                              onClick={() => {
                                setshowcontries2(false);
                                showModal();
                                //setDestinationType("location");
                                setWhichModal("2");
                                //setdestination_type("location")
                                setdestination_type("location");
                              }}
                            >
                              Location
                            </button>
                            <Modal
                              open={isModalOpen}
                              onOk={handleOk}
                              onCancel={handleCancel}
                            >
                              <Map
                                onPress={(psData) => {
                                  console.log(psData)
                                  if (whichModal == "1") {
                                    setorigincodemap({
                                      lat:psData.lat,
                                      lng:psData.lng,
                                    })
                                    setpsfromdata(psData);
                                    setorigin_code(`${psData.lng}-${psData.lat}`);
                                  } else {
                                    setpstodata(psData);
                                    setdestinationcodemap({
                                      lat:psData.lat,
                                      lng:psData.lng
                                    })
                                    setdestination_code(`${psData.lng}-${psData.lat}`);
                                  }
                                  //console.log(psData);
                                }}
                              />
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                  <div className="col-md-3">
                    <div
                      className="cargo"
                      onClick={() => {
                        setshowfcllcl(true);
                        setshowcontries(false);
                        setshowcontries2(false);
                      }}
                    >
                      {showfcllcl ? (
                        <p
                          className="cargo_show"
                          style={{
                            backgroundColor: "orange",
                          }}
                        >
                          <div className="cargo_type">
                            <div
                              onClick={() => {
                                setshowfcl(true);
                              }}
                              className={showfcl ? "active fcl" : "fcl"}
                            >
                              <BsBox />
                              <div
                                className="fcl_text"
                                onClick={() => {
                                  setCargoType("fcl");
                                  setcargo("fcl");
                                }}
                              >
                                <h3>FCL</h3>
                                <h4>FULL Container</h4>
                              </div>
                            </div>
                            <div
                              onClick={() => {
                                setshowfcl(false);
                              }}
                              className={!showfcl ? "active tcl" : "tcl"}
                            >
                              <HiOutlineInboxStack />
                              <div
                                className="lcl_text"
                                onClick={() => {
                                  setCargoType("lcl");
                                  setcargo("lcl");
                                }}
                              >
                                <h3>LcL</h3>
                                <h4>shared Container</h4>
                              </div>
                            </div>
                          </div>
                          <div>
                            {showfcl ? (
                              <React.Fragment>
                                {inputList.map((x, i) => {
                                  return (
                                    <div className="fcl_cont">
                                      <div className="select_cont">
                                        <span>container type</span>
                                        {/*                                        <CFormSelect
                                          name="container"
                                           value={DataFcl.container}  onChange={(
                                            e
                                          ) => {
                                            const newarr = [...selectedarr];
                                            newarr.filter(
                                              (item) => item.id === i
                                            );
                                            setselectedarr(newarr);
                                            console.log(i);
                                            //setDataFcl({...DataFcl ,container:e.target.value})
                                            handleinputchange(e, i);
                                          }}
                                          aria-label="Default select example"
                                          options={selectedarr.map(
                                            (it, ind) => {
                                              return {
                                                label: it.label,
                                                value: it.value,
                                              };
                                            }
                                          )}
                                        /> */}
                                        <select
                                          onChange={(e) => {
                                            //console.log(e.target);
                                            //alert(e.target.value);
                                            setinputList(
                                              inputList.map((_, innerIndex) => {
                                                return innerIndex == i
                                                  ? {
                                                      ..._,
                                                      val: e.target.value,
                                                    }
                                                  : _;
                                              })
                                            );
                                            if (x.val == "") {
                                              setselectedarr(
                                                selectedarr.map((ite) => {
                                                  if (
                                                    ite.value == e.target.value
                                                  ) {
                                                    return { ...ite, di: true };
                                                  } else return { ...ite };
                                                })
                                              );
                                            } else {
                                              let pastvalue = x.val;
                                              let newval = e.target.value;
                                              setselectedarr(
                                                selectedarr.map((myitem) => {
                                                  if (
                                                    pastvalue == myitem.value
                                                  ) {
                                                    return {
                                                      ...myitem,
                                                      di: false,
                                                    };
                                                  } else {
                                                    if (
                                                      newval == myitem.value
                                                    ) {
                                                      return {
                                                        ...myitem,
                                                        di: true,
                                                      };
                                                    }
                                                    return { ...myitem };
                                                  }
                                                })
                                              );
                                              /* setselectedarr(
                                                selectedarr.map((allitems) => {
                                                  if (
                                                    allitems.value ==
                                                    e.target.value
                                                  ) {
                                                    return {
                                                      ...allitems,
                                                      di: true,
                                                    };
                                                  } else return { ...allitems };
                                                })
                                              ); */
                                            }
                                          }}
                                          className="form-control"
                                        >
                                          {selectedarr.map((it) => (
                                            <option

                                              value={it.value}
                                              disabled={it.di}
                                            >
                                              {it.value}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                      <div
                                        className={
                                          showfcl ? "fcl_qty" : "fcl_qty"
                                        }
                                      >
                                        <span>Qty</span>
                                        <input
                                          /* value={DataFcl.Qty} */ onChange={(
                                            e
                                          ) => {
                                            //setDataFcl({...DataFcl ,Qty:e.target.value})
                                            handleinputchange(e, i);
                                          }}
                                          name="Qty"
                                          type="text"
                                        />
                                      </div>
                                      {inputList.length !== 1 && (
                                        <button
                                          className="btn btn-danger mx-1"
                                          onClick={() => handleremove(i)}
                                        >
                                          Remove
                                        </button>
                                      )}
                                    </div>
                                  );
                                })}
                                {inputList.length < 3 ? (
                                  <span
                                    className="btn btn-success"
                                    onClick={() => {
                                      handleaddclick();
                                    }}
                                  >
                                    add more
                                  </span>
                                ) : null}
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <div className="lcl_cont">
                                  <div className="lcl_container_cont">
                                    <div className="total_weight">
                                      <label htmlFor="" className="w-100">
                                        Total Length
                                      </label>
                                      <div className="position-relative">
                                        <input
                                          onChange={(e) => {
                                            setDataLcl({
                                              ...DataLcl,
                                              length: e.target.value,
                                            });
                                          }}
                                          className="bg-white"
                                          type="number"
                                        />
                                        {/*                                   <select name="weight" id="weight">
                                    <option value="KG">KG</option>
                                    <option value="LB">LB</option>
                                  </select> */}
                                      </div>
                                    </div>
                                    <div className="total_volum">
                                      <label htmlFor="" className="w-100">
                                        Total width
                                      </label>
                                      <div className="position-relative">
                                        <input
                                          onChange={(e) => {
                                            setDataLcl({
                                              ...DataLcl,
                                              width: e.target.value,
                                            });
                                          }}
                                          className="bg-white"
                                          type="number"
                                        />
                                        {/*               <select name="weight" id="weight">
                                    <option value="CMB">CMB</option>
                                    <option value="CIN">CIN</option>
                                    <option value="CFT">CFT</option>
                                  </select> */}
                                      </div>
                                    </div>
                                    <div className="total_volum">
                                      <label htmlFor="" className="w-100">
                                        Total height
                                      </label>

                                      <div className="position-relative">
                                        <input
                                          onChange={(e) => {
                                            setDataLcl({
                                              ...DataLcl,
                                              height: e.target.value,
                                            });
                                          }}
                                          className="bg-white"
                                          type="number"
                                        />
                                        {/*                                    <select name="weight" id="weight">
                                    <option value="CMB">CMB</option>
                                    <option value="CIN">CIN</option>
                                    <option value="CFT">CFT</option>
                                   </select> */}
                                      </div>
                                    </div>
                                    <div className="total_volum">
                                      <label htmlFor="" className="w-100">
                                        Total weight
                                      </label>

                                      <div className="position-relative">
                                        <input
                                          onChange={(e) => {
                                            setDataLcl({
                                              ...DataLcl,
                                              weight: e.target.value,
                                            });
                                          }}
                                          className="bg-white"
                                          type="number"
                                        />
                                        {/*                                    <select name="weight" id="weight">
                                    <option value="CMB">CMB</option>
                                    <option value="CIN">CIN</option>
                                    <option value="CFT">CFT</option>
                                   </select> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </React.Fragment>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              //console.log(222)
                              getimagesrc();
                            }}
                          >
                            Search rate
                          </button>
                        </p>
                      ) : null}
                      <div className="car_text">
                        <GiBoxUnpacking />
                        <span>cargo</span>
                      </div>
                      <input type="text" placeholder="cargo details" />
                    </div>
                  </div>
                  <div className="col-md-1">
                    <button
                      className="main-button"
                      onClick={() => {
                        DataSend();
                        //log()
                      }}
                    >
                      search rates
                    </button>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ) : showway == "af" ? (
            <React.Fragment>
              <div className="search_categories">
                <div className="row g-0">
                  {showplane ? (
                    <React.Fragment>
                      <div className="col-lg-4">
                        <div className="row w-100 g-0">
                          <p className="way-air w-100 bg-white p-0 m-0 text-center pb-1">
                            <IoEarth />
                            Origin
                          </p>
                          <div
                            onClick={()=>{
                              setIsModalOpencontries1(true);
                            }}
                          className="col-md-6">
                            <div
                              className="origin"
                              onClick={() => {
                                //setshowcontries(true);

                                //setIsModalOpencontries2(true);
                                setshowfcllcl(false);
                                setshowcontries2(false);
                                setOriginType("code");
                              }}
                            >
                              {
                                showsecondorigin?(
                                  <Modal
                                title="airports"
                                open={true}
                                onOk={()=>{
                                //handleOkcontries2();
                                setshowsecondorigin(false);
                              }} onCancel={()=>{
                                //handleCancelcontries2();
                                setshowsecondorigin(false);
                              }}>
                              <input
                              onClick={()=>{

                              }}
                                className="value2"
                                style={{
                                  width: "90%",
                                  height:'40px',
                                  borderRadius:'10px',
                                  border:"1px solid #ccc",
                                  padding:'10px'
                                }}
                                type="text"
                                placeholder="AirPort, city "
                                onChange={(event) => {
                                  const inputValue = event.target.value;
                                  //console.log(inputValue);
                                  setOrigin(inputValue);
                                  getimagesrc(event.target.value);
                                }}
                                value={
                                  OriginType == "location"
                                    ? origin_location_name
                                    //`${psfromdata.lng + "-" + psfromdata.lat}`
                                    : OriginName
                                }
                                //value={OriginName}
                              />
                              <p className="ports">
                                  {air
                                    .filter((data) => {
                                      const titleLower =
                                        data.country.toLowerCase();
                                      const inputLower =
                                        OriginName.toLowerCase();
                                      return titleLower.includes(inputLower);
                                    })
                                    .map((item, index, id) =>{
                                      return(
                                        <div onClick={()=>{
                                          // handleCancelcontries2();
                                          // setIsModalOpencontries2(false);
                                          setshowsecondorigin(false);
                                          setOrigin(item.name);
                                          //setcountery_code_origin(item.code);
                                          setorigin(item.name);
                                          setorigin_code(item.name);
                                          setcountery_code_origin(item.code);
                                          //setdestination_code(item.code);
                                        }} className="port">
                                        <div className="port_left">
                                          <FaPlane />
                                          <div
                                            className="port_contry"
                                            onClick={() => {
                                              setOrigin(item.name);
                                              setcountery_code_origin(item.code);
                                              setshowcontries(false);
                                              setshowsecondorigin(false);
                                              setorigin(item.name);
                                              setorigin_code(item.name);
                                              //setcountery_code_origin(item.code);
                                            }}
                                          >
                                            <span>{item.name}</span>
                                            <span>{item.country}</span>
                                          </div>
                                        </div>
                                        <div className="port_right">
                                          <img
                                            src={getimagesrc(item.country)}
                                            style={{
                                              width: "20px",
                                              height: "20px",
                                            }}
                                          />
                                        </div>
                                      </div>
                                      )
                                    }
                                    /*   index <= 5 ? (
                                        <div className="port">
                                          <div className="port_left">
                                            <FaPlane />
                                            <div
                                              className="port_contry"
                                              onClick={() => {
                                                setOrigin(item.name);
                                                setcountery_code_origin(item.code);
                                                setshowcontries(false);
                                              }}
                                            >
                                              <span>{item.name}</span>
                                              <span>{item.country}</span>
                                            </div>
                                          </div>
                                          <div className="port_right">
                                            <img
                                              src={getimagesrc(item.country)}
                                              style={{
                                                width: "20px",
                                                height: "20px",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      ) : null */
                                    )}
                                </p>
                              </Modal>
                                ):(
                                  null
                                )
                              }
                              <div
                                className="org_text"
                                onClick={() => {
                                  setshowcontries(true);
                                  setshowfcllcl(false);
                                  setshowcontries2(false);
                                }}
                              >
                                <span
                                  className={`${showcontries ? "active" : ""}`}
                                >
                                  {" "}
                                  <IoEarth />
                                  origin
                                </span>
                              </div>

                              <input
                                onClick={()=>{
                                  setshowsecondorigin(true);
                                  setorigin_type("code");
                                }}
                                className="value2"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                }}
                                type="text"
                                placeholder="AirPort, city "
                                onChange={(event) => {
                                  const inputValue = event.target.value;
                                  //console.log(inputValue);
                                  setOrigin(inputValue);
                                  getimagesrc(event.target.value);
                                  setOriginType("code");
                                }}
                                value={
                                  origin_type == "location"
                                    ? country_name1
                                    //`${psfromdata.lng + "-" + psfromdata.lat}`
                                    : origin
                                }
                                //value={OriginName}
                              />
                            </div>
                          </div>
                          <div
                            className="col-md-6"
                            onClick={() => {
                              setshowcontries(false);
                              setshowfcllcl(false);
                              setshowcontries2(false);
                            }}
                          >
                            <button
                              className="btn w-100 h-100"
                              onClick={() => {
                                setshowcontries(false);
                                showModal();
                                setOrigin("");
                                setOriginType("location");
                                setWhichModal("1");
                                setorigin_type("location");
                              }}
                            >
                              Location
                            </button>
                            <Modal
                              open={isModalOpen}
                              onOk={handleOk}
                              onCancel={handleCancel}
                            >
                              <Map
                                onPress={(psData) => {
                                  console.log(psData);
                                  if (whichModal == "1") {
                                    setorigincodemap({
                                      lat:psData.lat,
                                      lng:psData.lng
                                    })
                                    setpsfromdata(psData);
                                    setorigin_code(`${psData.lng}-${psData.lat}`);
                                  } else {
                                    setdestinationcodemap({
                                      lat:psData.lat,
                                      lng:psData.lng
                                    })
                                    setpstodata(psData);
                                    setdestination_code(`${psData.lng}-${psData.lat}`);
                                  }
                                }}
                              />
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}

                  {showstate2 ? (
                    <React.Fragment>
                      <div className="col-md-4">
                        <div className="row w-100 g-0">
                          <p className="way-air2 w-100 bg-white p-0 m-0 text-center pb-1">
                            <IoEarth />
                            Destination
                          </p>
                          <div className="col-md-6">
                            <div
                              className="destination"
                              onClick={() => {
                                //setisModalOpendestination2(true)
                                setshowcontries(false);
                                setshowfcllcl(false);
                                setshowcontries2(true);
                                setDestinationType("code");
                              }}
                            >
                                {
                                  showseconddismodal?(
                                    <Modal title="aiports" open={true} onOk={()=>{
                                      //handleOkdestination2();
                                      setshowseconddismodal(false);
                                    }} onCancel={()=>{
                                      //handleCanceldestination2();
                                      setshowseconddismodal(false);
                                    }}>
                                      <input
                                      style={{
                                        width:'100%',
                                        height:'30px',
                                        borderRadius:'10px',
                                        border:'1px solid #ccc',
                                        padding:'10px'
                                      }}
                                  onClick={()=>{
                                    //setisModalOpendestination2(true)
                                  }}
                                    value={
                                      DestinationType == "location"
                                        ? `${pstodata.lng + "-" + pstodata.lat}`
                                        : DestinationName
                                    }
                                    //value={DestinationName}
                                    onChange={(e) => {
                                      setDestination(e.target.value);
                                    }}
                                    type="text"
                                    placeholder="AirPort, city "
                                  />
                                    <p style={{}} className="ports">
                                      {air
                                        .filter((data) => {
                                          const titleLower =
                                            data.country.toLowerCase();
                                          const inputLower =
                                            DestinationName.toLowerCase();
                                          return titleLower.includes(inputLower);
                                        })
                                        .map((item, index) =>{
                                          return(
                                            <div className="port"
                                              onClick={()=>{
                                                setDestination(item.name);
                                                setcountery_code_destination(item.code);
                                                setshowcontries2(false);
                                                setshowseconddismodal(false);
                                                setdestination(item.name);
                                                setdestination_code(item.code);
                                                setcountery_code_destination(item.code);
                                              }}
                                            >
                                              <div className="port_left">
                                                <BiAnchor />
                                                <div
                                                  className="port_contry"
                                                  onClick={() => {
                                                    setDestination(item.name);
                                                    setcountery_code_destination(item.code);
                                                    setshowcontries2(false);
                                                    setshowseconddismodal(false);
                                                    setdestination(item.name);
                                                    setdestination_code(item.code);
                                                  }}
                                                >
                                                  <span>{item.name}</span>
                                                  <span>{item.country}</span>
                                                </div>
                                              </div>
                                              <div className="port_right">
                                                <img
                                                  src={getimagesrc(item.country)}
                                                  style={{
                                                    width: "20px",
                                                    height: "20px",
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          )
                                        }
                                        )}
                                    </p>
                                    </Modal>
                                  ):(
                                    null
                                  )
                                }
                              <div className="des_text">
                                <span
                                  className={`${showcontries2 ? "active" : ""}`}
                                >
                                  <IoEarth />
                                  destination
                                </span>
                              </div>

                              <input
                              onClick={()=>{
                                setshowseconddismodal(true);
                                setdestination_type("code");
                                //setisModalOpendestination2(true)
                              }}
                                value={
                                  destination_type == "location"
                                    ? country_name2
                                    //`${pstodata.lng + "-" + pstodata.lat}`
                                    : destination
                                }
                                //value={DestinationName}
                                onChange={(e) => {
                                  setDestination(e.target.value);
                                }}
                                type="text"
                                placeholder="AirPort, city "
                              />
                            </div>
                          </div>
                          <div
                            className="col-md-6"
                            onClick={() => {
                              setshowcontries(false);
                              setshowfcllcl(false);
                              setshowcontries2(false);
                            }}
                          >
                            <button
                              className="btn w-100 h-100"
                              onClick={() => {
                                setshowcontries2(false);
                                showModal();
                                setDestination("");
                                setDestinationType("location");
                                setWhichModal("2");
                                setdestination_type("location");
                              }}
                            >
                              Location
                            </button>
                            <Modal
                              open={isModalOpen}
                              onOk={handleOk}
                              onCancel={handleCancel}
                            >
                              <Map
                                onPress={(psData) => {
                                  console.log(psData);
                                  if (whichModal == "1") {
                                    setorigincodemap({
                                      lat:psData.lat,
                                      lng:psData.lng
                                    })
                                    setpsfromdata(psData);
                                    setorigin_code(`${psData.lng}-${psData.lat}`);
                                  } else {
                                    setdestinationcodemap({
                                      lat:psData.lat,
                                      lng:psData.lng
                                    })
                                    setpstodata(psData);
                                    setdestination_code(`${psData.lng}-${psData.lat}`);
                                  }
                                }}
                              />
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                  <div className="col-md-3">
                    <div
                      className="cargo"
                      onClick={() => {
                        setshowfcllcl(true);
                        setshowcontries(false);
                        setshowcontries2(false);
                      }}
                    >
                      {showfcllcl ? (
                        <p
                          className="cargo_show"
                          style={{
                            backgroundColor: "orange",
                          }}
                        >
                          <div className="cargo_type">
                            <div
                              onClick={() => {
                                setshowfcl(true);
                              }}
                              className={showfcl ? "active tcl" : "tcl"}
                            >
                              <HiOutlineInboxStack />
                              <div
                                className="lcl_text"
                                onClick={() => {
                                  setCargoType("lcl");
                                  setcargo("lcl");
                                }}
                              >
                                <h3>LcL</h3>
                                <h4>shared Container</h4>
                              </div>
                            </div>
                          </div>
                          <div>
                            {showfcl ? (
                              <React.Fragment>
                                <div className="lcl_cont">
                                  <div className="lcl_container_cont">
                                    {CargoType ? (
                                      <React.Fragment>
                                        <div className="total_weight">
                                          <label htmlFor="" className="w-100">
                                            Total Length
                                          </label>
                                          <div className="position-relative">
                                            <input
                                            onChange={(e) => {
                                              setDataLcl({
                                                ...DataLcl,
                                                length: e.target.value,
                                              });
                                            }}
                                              className="bg-white"
                                              type="number"
                                            />
                                            {/*                                    <select name="weight" id="weight">
                                  <option value="KG">KG</option>
                                  <option value="LB">LB</option>
                                 </select> */}
                                          </div>
                                        </div>
                                        <div className="total_volum">
                                          <label htmlFor="" className="w-100">
                                            Total width
                                          </label>
                                          <div className="position-relative">
                                            <input
                                            onChange={(e) => {
                                              setDataLcl({
                                                ...DataLcl,
                                                width: e.target.value,
                                              });
                                            }}
                                              className="bg-white"
                                              type="number"
                                            />
                                            {/*                                    <select name="weight" id="weight">
                                  <option value="CMB">CMB</option>
                                  <option value="CIN">CIN</option>
                                  <option value="CFT">CFT</option>
                                 </select> */}
                                          </div>
                                        </div>
                                        <div className="total_volum">
                                          <label htmlFor="" className="w-100">
                                            Total height
                                          </label>

                                          <div className="position-relative">
                                            <input
                                            onChange={(e) => {
                                              setDataLcl({
                                                ...DataLcl,
                                                height: e.target.value,
                                              });
                                            }}
                                              className="bg-white"
                                              type="number"
                                            />
                                            {/*                                    <select name="weight" id="weight">
                                  <option value="CMB">CMB</option>
                                  <option value="CIN">CIN</option>
                                  <option value="CFT">CFT</option>
                                 </select> */}
                                          </div>
                                        </div>
                                        <div className="total_volum">
                                          <label htmlFor="" className="w-100">
                                            Total weight
                                          </label>

                                          <div className="position-relative">
                                            <input
                                            onChange={(e) => {
                                              setDataLcl({
                                                ...DataLcl,
                                                weight: e.target.value,
                                              });
                                            }}
                                              className="bg-white"
                                              type="number"
                                            />
                                            {/*                                    <select name="weight" id="weight">
                                  <option value="CMB">CMB</option>
                                  <option value="CIN">CIN</option>
                                  <option value="CFT">CFT</option>
                                 </select> */}
                                          </div>
                                        </div>
                                      </React.Fragment>
                                    ) : null}
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : null}
                          </div>
                          <button
                            onClick={() => {
                              //console.log(222)
                              getimagesrc();
                              setDataLcl();
                            }}
                          >
                            Search rate
                          </button>
                        </p>
                      ) : null}
                      <div className="car_text">
                        <GiBoxUnpacking />
                        <span>cargo</span>
                      </div>
                      <input type="text" placeholder="cargo details" />
                    </div>
                  </div>
                  <div className="col-md-1">
                    <button
                      onClick={() => {
                        DataSend();
                      }}
                      className="main-button"
                    >
                      search rates
                    </button>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="search_categories">
                <div
                  className="row g-0"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showplane ? (
                    <React.Fragment>
                      <div
                        style={{
                          height: "100%",
                          backgroundColor: "white",
                        }}
                        className="col-md-4"
                        onClick={() => {
                          setshowcontries(false);
                          setshowfcllcl(false);
                          setshowcontries2(false);
                        }}
                      >
                        <h3>from</h3>
                        <input
                          type="text"
                          value={
                            origin_type=="location"?
                            country_name1
                            :
                            country_name1
                          }
                        />
                        <button
                          style={{
                            width: "fitContent",
                          }}
                          className="btn w-100 h-100 btn2"
                          onClick={() => {
                            setshowcontries(false);
                            showModal();
                            setOriginType("location");
                            setWhichModal("1");
                            setorigin_type("location");
                            // console.log("djkkjds")
                          }}
                        >
                          Location
                        </button>
                      </div>
                      {/*                       <div className="col-lg-4">
                        <div className="row w-100 g-0">
                          <p className="way-air w-100 bg-white p-0 m-0 text-center pb-1">
                            <IoEarth />
                            Origin
                          </p>
                          <div className="col-md-6">
                            <div
                              className="origin"
                              onClick={() => {
                                setshowcontries(true);
                                setshowfcllcl(false);
                                setshowcontries2(false);
                                setOriginType("code");
                              }}
                            >
                              {showcontries === true ? (
                                <p className="ports">
                                  {air
                                    .filter((data) => {
                                      const titleLower =
                                        data.country.toLowerCase();
                                      const inputLower = OriginName.toLowerCase();
                                      return titleLower.includes(inputLower);
                                    })
                                    .map((item, index, id) =>
                                      index <= 5 ? (
                                        <div className="port">
                                          <div className="port_left">
                                            <FaPlane />
                                            <div
                                              className="port_contry"
                                              onClick={() => {
                                                setOrigin(item.name);
                                                setcountery_code_origin(item.code);
                                                setshowcontries(false);
                                              }}
                                            >
                                              <span>{item.name}</span>
                                              <span>{item.country}</span>
                                            </div>
                                          </div>
                                          <div className="port_right">
                                            <img
                                              src={getimagesrc(item.country)}
                                              style={{
                                                width: "20px",
                                                height: "20px",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      ) : null
                                    )}
                                </p>
                              ) : null}

                              <div
                                className="org_text"
                                onClick={() => {
                                  setshowcontries(true);
                                  setshowfcllcl(false);
                                  setshowcontries2(false);
                                }}
                              >
                                <span
                                  className={`${showcontries ? "active" : ""}`}
                                >
                                  {" "}
                                  <IoEarth />
                                  origin
                                </span>
                              </div>

                              <input
                                className="value2"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                }}
                                type="text"
                                placeholder="AirPort, city "
                                onChange={(event) => {
                                  const inputValue = event.target.value;
                                  //console.log(inputValue);
                                  setOrigin(inputValue);
                                  getimagesrc(event.target.value);
                                }}
                                value={OriginName}
                              />
                            </div>
                          </div>

                        </div>
                      </div> */}
                    </React.Fragment>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}

                  {showstate2 ? (
                    <React.Fragment>
                      <div
                        style={{
                          height: "100%",
                          backgroundColor: "white",
                        }}
                        className="col-md-4"
                        onClick={() => {
                          setshowcontries(false);
                          setshowfcllcl(false);
                          setshowcontries2(false);
                        }}
                      >
                        <h3>to</h3>
                        <input
                          type="text"
                          value={country_name2}
                        />
                        {/* <input type="text" /> */}
                        <button
                          style={{
                            width: "fitContent",
                            height: "30px",
                          }}
                          className="btn w-100 h-100 btn2"
                          onClick={() => {
                            setshowcontries2(false);
                            showModal();
                            setDestinationType("location");
                            setWhichModal("2");
                            setdestination_type("location");
                          }}
                        >
                          Location
                        </button>
                      </div>
                      {/*                       <div className="col-md-4">
                        <div className="row w-100 g-0">
                          <p className="way-air2 w-100 bg-white p-0 m-0 text-center pb-1">
                            <IoEarth />
                            Destination
                          </p>
                          <div className="col-md-6">
                            <div
                              className="destination"
                              onClick={() => {
                                setshowcontries(false);
                                setshowfcllcl(false);
                                setshowcontries2(true);
                                setDestinationType("code");
                              }}
                            >
                              {showcontries2 === true ? (
                                <p style={{}} className="ports">
                                  {air
                                    .filter((data) => {
                                      const titleLower =
                                        data.country.toLowerCase();
                                      const inputLower =
                                        DestinationName.toLowerCase();
                                      return titleLower.includes(inputLower);
                                    })
                                    .map((item, index) =>
                                      index <= 5 ? (
                                        <div className="port">
                                          <div className="port_left">
                                            <BiAnchor />
                                            <div
                                              className="port_contry"
                                              onClick={() => {
                                                setDestination(item.name);
                                                setcountery_code_destination(item.code);
                                                setshowcontries2(false);
                                              }}
                                            >
                                              <span>{item.name}</span>
                                              <span>{item.country}</span>
                                            </div>
                                          </div>
                                          <div className="port_right">
                                            <img
                                              src={getimagesrc(item.country)}
                                              style={{
                                                width: "20px",
                                                height: "20px",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      ) : null
                                    )}
                                </p>
                              ) : null}
                              <div className="des_text">
                                <span
                                  className={`${showcontries2 ? "active" : ""}`}
                                >
                                  <IoEarth />
                                  destination
                                </span>
                              </div>

                              <input
                                value={DestinationName}
                                onChange={(e) => {
                                  setDestination(e.target.value);
                                }}
                                type="text"
                                placeholder="AirPort, city "
                              />
                            </div>
                          </div>

                        </div>
                      </div> */}
                    </React.Fragment>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                  <div className="col-md-3">
                    <div
                      className="cargo"
                      onClick={() => {
                        setshowfcllcl(true);
                        setshowcontries(false);
                        setshowcontries2(false);
                      }}
                    >
                      {showfcllcl ? (
                        <p
                          className="cargo_show"
                          style={{
                            backgroundColor: "orange",
                          }}
                        >
                          <div className="cargo_type">
                            <div
                              onClick={() => {
                                setshowfcl(true);
                              }}
                              className={showfcl ? "active tcl" : "tcl"}
                            >
                              <HiOutlineInboxStack />
                              <div
                                className="lcl_text"
                                onClick={() => {
                                  setCargoType("lcl");
                                  setcargo("lcl");
                                }}
                              >
                                <h3>LcL</h3>
                                <h4>shared Container</h4>
                              </div>
                            </div>
                          </div>
                          <div>
                            {showfcl ? (
                              <React.Fragment>
                                <div className="lcl_cont">
                                  <div className="lcl_container_cont">
                                    {CargoType ? (
                                      <React.Fragment>
                                        <div className="total_weight">
                                          <label htmlFor="" className="w-100">
                                            Total Length
                                          </label>
                                          <div className="position-relative">
                                            <input
                                            onChange={(e) => {
                                              setDataLcl({
                                                ...DataLcl,
                                                length: e.target.value,
                                              });
                                            }}
                                              className="bg-white"
                                              type="number"
                                            />
                                            {/*                                    <select name="weight" id="weight">
                                    <option value="KG">KG</option>
                                    <option value="LB">LB</option>
                                   </select> */}
                                          </div>
                                        </div>
                                        <div className="total_volum">
                                          <label htmlFor="" className="w-100">
                                            Total width
                                          </label>
                                          <div className="position-relative">
                                            <input
                                            onChange={(e) => {
                                              setDataLcl({
                                                ...DataLcl,
                                                width: e.target.value,
                                              });
                                            }}
                                              className="bg-white"
                                              type="number"
                                            />
                                            {/*                                    <select name="weight" id="weight">
                                    <option value="CMB">CMB</option>
                                    <option value="CIN">CIN</option>
                                    <option value="CFT">CFT</option>
                                   </select> */}
                                          </div>
                                        </div>
                                        <div className="total_volum">
                                          <label htmlFor="" className="w-100">
                                            Total height
                                          </label>

                                          <div className="position-relative">
                                            <input
                                            onChange={(e) => {
                                              setDataLcl({
                                                ...DataLcl,
                                                height: e.target.value,
                                              });
                                            }}
                                              className="bg-white"
                                              type="number"
                                            />
                                            {/*                                    <select name="weight" id="weight">
                                    <option value="CMB">CMB</option>
                                    <option value="CIN">CIN</option>
                                    <option value="CFT">CFT</option>
                                   </select> */}
                                          </div>
                                        </div>
                                        <div className="total_volum">
                                          <label htmlFor="" className="w-100">
                                            Total weight
                                          </label>

                                          <div className="position-relative">
                                            <input
                                            onChange={(e) => {
                                              setDataLcl({
                                                ...DataLcl,
                                                weight: e.target.value,
                                              });
                                            }}
                                              className="bg-white"
                                              type="number"
                                            />
                                            {/*                                    <select name="weight" id="weight">
                                    <option value="CMB">CMB</option>
                                    <option value="CIN">CIN</option>
                                    <option value="CFT">CFT</option>
                                   </select> */}
                                          </div>
                                        </div>
                                      </React.Fragment>
                                    ) : null}
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : null}
                          </div>
                          <button
                            onClick={() => {
                              //console.log(222)
                              getimagesrc();
                              setDataLcl();
                            }}
                          >
                            Search rate
                          </button>
                        </p>
                      ) : null}
                      <div className="car_text">
                        <GiBoxUnpacking />
                        <span>cargo</span>
                      </div>
                      <input type="text" placeholder="cargo details" />
                    </div>
                  </div>
                  <div className="col-md-1">
                    <button
                      onClick={() => {
                        DataSend();
                      }}
                      className="main-button"
                    >
                      search rates
                    </button>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>

      <div className="services">
        <div className="service">
          <BiCoinStack />
          <span>Transparent Pricing</span>
        </div>
        <div className="service">
          <GoLocation />
          <span>Real-time Shipment Visibility</span>
        </div>
        <div className="service">
          <BiPhoneCall />
          <span>Personal Account Manager</span>
        </div>
      </div>

      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Map
          onPress={(psData) => {
            console.log(psData)
            if (whichModal == "1") {
              setorigincodemap({
                lat:psData.lat,
                lng:psData.lng
              })
              setpsfromdata(psData);
              setorigin_code(`${psData.lng}-${psData.lat}`);
            } else {
              setdestinationcodemap({
                lat:psData.lat,
                lng:psData.lng
              })
              setpstodata(psData);
              setdestination_code(`${psData.lng}-${psData.lat}`);
            }
          }}
        />
      </Modal>
      {showlogstatus ? (
        <div className="logsignshow">
          <Modal
            title="Basic Modal"
            open={showlogstatus}
            onOk={handleOk2}
            onCancel={handleCancel3}
          >
            <h5>you must have accountlogin if you have an account</h5>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                gap: "5px",
              }}
            >
              <button
                style={{
                  width: "200px",
                  maxWidth: "50%",
                  border: "none",
                  borderRadius: "10px",
                  height: "30px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/login", {
                    state: { alldata: getdatasend },
                  });
                }}
              >
                login
              </button>
              <button
                style={{
                  width: "200px",
                  maxWidth: "50%",
                  border: "none",
                  borderRadius: "10px",
                  height: "30px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/regist", {
                    state: { alldata: getdatasend },
                  });
                }}
              >
                sign up
              </button>
            </div>
          </Modal>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Search;
