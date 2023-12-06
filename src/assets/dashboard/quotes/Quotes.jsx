import { Button, Popconfirm, Space, Table } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./quotes.css";
import { ToastContainer, toast } from "react-toastify";
import { HiOutlineXMark } from "react-icons/hi2";
import axios from "axios";
import { flagdata } from "../../../flagdata";
import { air } from "../../../airports";
import { arr } from "../../search/getdata";
import lodash from "lodash/lodash";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import { ContainersData } from "../../../ContainersData";

const Quotes = () => {
  const navigate = useNavigate();
  const [inputList, setinputList] = useState([{ title: "", value: "" }]);

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([...inputList, { title: "", value: "" }]);
  };

  const [rowdata, setrowdata] = useState({});
  const [getdetails, setgetdetails] = useState({});
  const [getenmoney, setgetenmoney] = useState([]);
  const [showrates, setshowrates] = useState(false);
  const [showdetails, setshowdetails] = useState(false);

  const [showtype, setshowtype] = useState("break");
  const [showreasponeinput, setshowreasoninput] = useState(false);
  const [disreponsetxt, setdisreponsetxt] = useState("");

  const [makeresponse, setmakeresponse] = useState(false);
  const [ratedata, setratedata] = useState({
    num_day: "",
    reat_title_money: "",
    cotation_id: "",
  });
  const [titles, settitles] = useState("");
  const [values, setvalues] = useState("");
  const [quotedata, setquotedata] = useState([]);
  const [originquotedata, setoriginquotedata] = useState([]);
  const [moneyvalue, setmonyvalue] = useState(0);
  const [totalmoney, setmoneyvalue] = useState(0);

  // let totalmoney=0;
  const getquotedata = () => {
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/admin/select_continer_data.php"
      )
      .then((res) => {
        console.log(res.data)
        setquotedata(res.data.message);
        setoriginquotedata(res.data.message);
      });
  };

  const getimagesrc = (c_name) => {
    // c_name="Spain"
    let src = "";
    for (let i = 0; i < flagdata.length; i++) {
      if (c_name == flagdata[i].name) {
        const src = require("../../../../src/assets/img/flags/" +
          flagdata[i].code +
          ".svg");
      }
    }
    return src;
  };

  const handlegetrate = (id) => {
    const data_send = {
      cotation_id: id,
    };
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/user/select_container_reats.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        setgetenmoney(res.data.message);
        const alldata = [...res.data.message];
        let total_money = 0;
        let data = res.data.message;
        for (let i = 0; i < data?.reats_data?.length; i++) {
          total_money = total_money + parseFloat(data[i].reat_money);
        }

        setmoneyvalue(total_money);
      });
  };

  useEffect(() => {
    getquotedata();
  }, []);

  function findNearestLocation(locations, latitude, longitude, type) {
    let bestLocation = null;
    let bestDistance = Infinity;

    for (let i = 0; i < locations.length; i++) {
      let dLat = "";
      let dLon = "";
      if (type == "air") {
        dLat = locations[i].lat;
        dLon = locations[i].lon;
      } else {
        dLat = locations[i].coordinates[0];
        dLon = locations[i].coordinates[1];
      }
      let distance = calculateDistance(dLat, dLon, latitude, longitude, type);

      if (distance < bestDistance) {
        bestLocation = locations[i];
        bestDistance = distance;
      }
    }

    return bestLocation;
  }

  function calculateDistance(
    latitude1,
    longitude1,
    latitude2,
    longitude2,
    type
  ) {
    const R = 6371;

    const dLat = ((latitude2 - latitude1) * Math.PI) / 180;
    const dLon = ((longitude2 - longitude1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((latitude1 * Math.PI) / 180) *
        Math.cos((latitude2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
  }

  async function _getNearestLocation(psData) {
    let type = psData?.shipping_type;
    let allTransData = psData?.shipping_type == "air" ? [...air] : [...arr];

    const nearestLocation = findNearestLocation(
      allTransData,
      psData?.lat_des,
      psData?.long_des,
      type
    );

    return nearestLocation;
  }
  const datacoulmn = [
    {
      title: "id",
      dataIndex: "cotation_id",
      key: "cotation_id",
      render: (_, record) => (
        <Space>
          <span
            style={
              {
                // textDecoration: 'underline',
                // color: 'blue',
                // cursor: 'pointer'
              }
            }
            onClick={() => {
              return;
              /* navigate("/dashboard/showquotedetails", { state: { item: record } }) */
            }}
          >
            {record.cotation_id}
          </span>
        </Space>
      ),
    },
    {
      title: "mode",
      dataIndex: "cargo",
      key: "cargo",
    },
    {
      title: "type",
      key: "shipping_type",
      render: (_, record) => (
        <Space>
          {record.shipping_type == "air" ? (
            <React.Fragment>
              <img
                style={{
                  width: "30px",
                }}
                src={require("../../../../src/assets/img/airport.png")}
                alt=""
              />
            </React.Fragment>
          ) : record.shipping_type == "ocean" ? (
            <React.Fragment>
              <img
                style={{
                  width: "30px",
                }}
                src={require("../../../../src/assets/img/port.png")}
                alt=""
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <img
                style={{
                  width: "30px",
                }}
                src={require("../../../../src/assets/img/car.png")}
                alt=""
              />
            </React.Fragment>
          )}
        </Space>
      ),
    },
    {
      title: "origin",
      key: "origin",
      render: (_, record) => (
        <Space>
          {
            <span>
              {record.origin_type === "location" ? (
                <a href={record.link_origin_map} target="_blank">
                  <span className="loc_dest_org">
                    <span> {record.origin_location_name} ({record.origin_code}) </span>
                    <span>
                      {record.origin_type == "location" ? (
                        <Icon icon="fluent:location-16-regular" />
                      ) : record.shipping_type != "ocean" ? (
                        <Icon icon="guidance:arrival" />
                      ) : record.shipping_type != "local" ? (
                        <Icon icon="guidance:port" />
                      ) : (
                        <Icon icon="material-symbols:local-taxi-outline" />
                      )}
                    </span>{" "}
                  </span>
                </a>
              ) : record.origin_type === "code" ? (
                <span className="loc_dest_org">
                  {console.log("Code")}
                  <span>
                    {" "}
                    {record.ports_origin_data[0]
                      ? record.ports_origin_data[0].name
                      : record.ports_origin_data.name}{" "}
                  </span>
                  <span>{`(${record.origin_code})`}</span>
                  <span>
                    {record.origin_type == "code" ? (
                      record.shipping_type == "air" ? (
                        <Icon icon="guidance:arrival" />
                      ) : record.shipping_type != "local" ? (
                        <Icon icon="guidance:port" />
                      ) : (
                        <Icon icon="material-symbols:local-taxi-outline" />
                      )
                    ) : (
                      <Icon icon="fluent:location-16-regular" />
                    )}
                  </span>{" "}
                </span>
              ) : record.shipping_type === "ocean" ? (
                <React.Fragment>
                  {arr
                    .filter((item) => item.code === record.countery_code_origin)
                    .map((item, index) => {
                      if (index == 0) {
                        return (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            {record.ports_origin_data.name}
                          </div>
                        );
                      }
                    })}
                </React.Fragment>
              ) : record.shipping_type == "air" ? (
                <React.Fragment>
                  {air
                    .filter(
                      (item) =>
                        item.code.toLowerCase() ===
                        record.countery_code_origin.toLowerCase()
                    )
                    .map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {record.ports_origin_data.name}
                        </div>
                      );
                    })}
                </React.Fragment>
              ) : (
                <React.Fragment>no data</React.Fragment>
              )}
            </span>
          }
        </Space>
      ),
    },
    {
      title: "Origin Country",
      key: "origin",
      render: (_, record) => (
        <Space>
          {console.log(record)}
          {
            <span id="countery_code_origin">
              {
                <img
                  src={require("../../../../src/assets/img/flags/" +
                    flagdata.filter(
                      (item) => item.name == record.countery_code_origin
                    )[0].code +
                    ".svg")}
                  alt=""
                />
              }
              {record.countery_code_origin}
            </span>
          }
        </Space>
      ),
    },
    {
      title: "destination",
      key: "destination",
      render: (_, record) => (
        <Space>
          {
            <span>
              {record.destination_type === "location" ? (
                <a href={record.link_destination_map} target="_blank">
                  <span className="loc_dest_org">
                    <span>{record.destination_location_name}</span>
                    <span>
                      {record.destination_type == "location" ? (
                        <Icon icon="fluent:location-16-regular" />
                      ) : record.shipping_type != "ocean" ? (
                        <Icon icon="guidance:arrival" />
                      ) : record.shipping_type != "local" ? (
                        <Icon icon="guidance:port" />
                      ) : (
                        <Icon icon="material-symbols:local-taxi-outline" />
                      )}
                    </span>
                  </span>
                </a>
              ) : record.destination_type === "code" ? (
                <span className="loc_dest_org">
                  {console.log("Code")}
                  <span>
                    {" "}
                    {record.ports_destination_data[0]
                      ? record.ports_destination_data[0].name
                      : record.ports_destination_data.name}{" "}
                  </span>
                  <span>{`(${record.destination_code})`}</span>
                  <span>
                    {record.destination_type == "code" ? (
                      record.shipping_type == "air" ? (
                        <Icon icon="guidance:arrival" />
                      ) : record.shipping_type != "local" ? (
                        <Icon icon="guidance:port" />
                      ) : (
                        <Icon icon="material-symbols:local-taxi-outline" />
                      )
                    ) : (
                      <Icon icon="fluent:location-16-regular" />
                    )}
                  </span>{" "}
                </span>
              ) : record.shipping_type == "ocean" ? (
                <React.Fragment>
                  {arr
                    .filter(
                      (item) => item.code === record.countery_code_destination
                    )
                    .map((item, index) => {
                      if (index == 0) {
                        return (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {record.ports_destination_data.name}
                            <h6>{item.country}</h6>
                          </div>
                        );
                      }
                    })}
                </React.Fragment>
              ) : record.shipping_type == "air" ? (
                <React.Fragment>
                  {air
                    .filter(
                      (item) =>
                        item.code.toLowerCase() ===
                        record.destination_code.toLowerCase()
                    )
                    .map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {record.ports_destination_data.name}
                        </div>
                      );
                    })}
                </React.Fragment>
              ) : (
                <React.Fragment>no data</React.Fragment>
              )}
            </span>
          }

          {/* <img style={{
            width:'20px'
          }} src={require("../../../../src/assets/img/usa.jpg")} alt="" />
          <span>{record.origin}</span> */}
        </Space>
      ),
    },
    {
      title: "Destination Country",
      key: "origin",
      render: (_, record) => (
        <Space>
          {
            <span id="countery_code_destination">
              {
                <img
                  src={require("../../../../src/assets/img/flags/" +
                    flagdata.filter(
                      (item) => item.name == record.countery_code_destination
                    )[0].code +
                    ".svg")}
                  alt=""
                />
              }
              {record.countery_code_destination}
            </span>
          }
        </Space>
      ),
    },
    {
      title: "savedon",
      dataIndex: "savedon",
      key: "savedon",
    },
    {
      title: "action",
      key: "action",
      render: (_, record) => (
        <Space>
          <span
            onClick={async () => {
              // let obj= await _getNearestLocation(record)

              // console.log(obj)

              setshowrates(true);
              setrowdata(record);
              handlegetrate(record.cotation_id);

              //console.log(record.cotation_id)
            }}
            style={{
              color: "blue",
              cursor: "pointer",
            }}
          >
            view reats
          </span>
        </Space>
      ),
    },
  ];
  const [input_numbers, setinput_numbers] = useState([
    {
      id: 0,
      header: "",
      price: "",
    },
  ]);
  const handleaddrate = () => {
    const arr = [...inputList];
    let money = "";

    for (let i = 0; i < arr.length; i++) {
      if (i == 0) {
        const str = arr[i].title + "***" + arr[i].value;
        money += str;
      } else {
        const str = "***ocean***" + arr[i].title + "***" + arr[i].value;
        money += str;
      }
    }

    const data_send = {
      num_day: ratedata.num_day,
      reat_title_money: money,
      cotation_id: rowdata.cotation_id,
    };
    setinputList([{ title: "", value: "" }]);

    axios
      .post(
        "https://camp-coding.tech/ocean_burg/admin/add_reats.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        if (res.data.status === "success") {
          setmakeresponse(false);
          toast.success(res.data.message);
          handlegetrate(data_send.cotation_id);
        } else if (res.data.status === "error") {
          toast.error(res.data.message);
        } else {
          toast.error("something is error try in another time");
        }
      });
  };

  function searchType1(e) {
    if (e !== "all") {
      //setTable2SearchTxt(e);
      const formattedQuery = e.toLowerCase();
      const filteredData = lodash.filter(originquotedata, (item) => {
        return contains1(item, formattedQuery);
      });
      setquotedata(filteredData);
    } else {
      getquotedata();
    }
  }
  const contains1 = (items, query) => {
    const { cargo, origin_code, origin_type, shipping_type } = items;
    if (
      cargo?.toLowerCase().includes(query) ||
      origin_code?.toLowerCase().includes(query) ||
      origin_type?.toLowerCase().includes(query) ||
      shipping_type?.toLowerCase().includes(query)
    ) {
      return true;
    }

    return false;
  };
  function searchType2(e) {
    //setTable2SearchTxt(e);
    const formattedQuery = e.toLowerCase();
    const filteredData = lodash.filter(originquotedata, (item) => {
      return contains2(item, formattedQuery);
    });
    setquotedata(filteredData);
  }
  const contains2 = (items, query) => {
    const { origin_location_name,origin_code } = items;
    if (origin_location_name?.toLowerCase().includes(query)||
        origin_code?.toLowerCase().includes(query)) {
      return true;
    }

    return false;
  };
  function searchType3(e) {
    //setTable2SearchTxt(e);
    const formattedQuery = e.toLowerCase();
    const filteredData = lodash.filter(originquotedata, (item) => {
      return contains3(item, formattedQuery);
    });
    setquotedata(filteredData);
  }
  const contains3 = (items, query) => {
    const { destination_location_name } = items;
    if (destination_location_name?.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  };

  const handlepdfdownload=()=>{
    const data_send={
      cotation_id:rowdata?.cotation_id,
    }
    axios.post("https://camp-coding.tech/ocean_burg/user/pdf_data/rates_pdf.php",JSON.stringify(data_send))
    .then((res)=>{
    console.log(res.data)
    }).catch(e=>console.log(e))
  }

  return (
    <div>
      <div className="shipments_page">
        <div className="shipments_filters">
          <h3>filters</h3>
          <div className="filters">
            <div className="mode_select">
              <span>mode</span>
              <select
                onChange={(e) => {
                  searchType1(e.target.value);
                }}
              >
                <option value="all">all</option>
                <option value="lcl">lcl</option>
                <option value="fcl">fcl</option>
              </select>
            </div>
            <input
              onChange={(e) => {
                searchType2(e.target.value);
              }}
              type="text"
              placeholder="Origin City/Port"
            />
            <input
              onChange={(e) => {
                searchType3(e.target.value);
              }}
              type="text"
              placeholder="Destination City/Port"
            />
          </div>
        </div>
        <div className="shipments_page_table">
          <Table columns={datacoulmn} dataSource={quotedata} />
        </div>
        {showrates ? (
          <div className="showrates">
            <div className="rates">
              <div className="icontitle">
                <h1>rates</h1>
                <AiOutlineClose
                  onClick={() => {
                    setshowrates(false);
                  }}
                />
              </div>
              {getenmoney.map((item, index) => {
                return (
                  <div className="rate" key={index}>
                    <div className="contries">
                      <div className="from">
                        <div className="from">
                          <h2
                            style={{
                              fontSize: "17px",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span>
                              {air
                                .filter(
                                  (item) =>
                                    item?.lat?.slice(0, 5) ===
                                    rowdata?.lat_origin?.slice(0, 5)
                                )
                                .map((item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <h6>{item.city}</h6>
                                      <img
                                        style={{
                                          width: "30px",
                                        }}
                                        src={getimagesrc(item.country)}
                                        alt=""
                                      />
                                    </div>
                                  );
                                })}
                            </span>
                          </h2>
                        </div>
                        <h3>
                          <span></span>
                        </h3>
                      </div>
                      <div
                        className="to"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <h2
                            style={{
                              fontSize: "17px",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <span>
                              {air
                                .filter(
                                  (item) =>
                                    item.code.toLowerCase() ===
                                    rowdata?.countery_code_destination?.toLowerCase()
                                )
                                .map((item, index) => {
                                  return (
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <h6>{item.city}</h6>
                                      <img
                                        style={{
                                          width: "30px",
                                        }}
                                        src={getimagesrc(item.country)}
                                        alt=""
                                      />
                                    </div>
                                  );
                                })}
                            </span>
                          </h2>
                          <h2></h2>
                        </div>
                      </div>
                    </div>
                    <div className="rate_details">
                      <div className="valied_until">
                        <h3>Valid Until</h3>
                        <p>{item.num_day}</p> {/* hire */}
                      </div>
                      <div className="transit_time">
                        <h3>Transit Time</h3>
                        <p>{item.num_day} days</p>
                      </div>
                      <div className="price">
                        <h3>Price</h3>
                        <p>{item.total_money} USD</p>
                      </div>
                    </div>
                    <div className="view_details">
                      <span
                        style={{
                          color: "blue",
                          fontSize: "19px",
                          cursor: "pointer",
                        }}
                        /*onClick={()=>{
                              setshowdetails(true)
                              funcshowdetails(item)
                            }} */
                        onClick={() => {
                          setshowdetails(true);
                          console.log(item);
                          setgetdetails(item);
                          //console.log(item)
                        }}
                      >
                        View Details
                      </span>
                    </div>
                  </div>
                );
              })}

              <Button
                className="addrate"
                onClick={() => {
                  setmakeresponse(true);
                }}
              >
                add rate
              </Button>
              {
                getenmoney.length>0?(
                  <button className="downloadpdfbtn"
                    onClick={()=>{
                      handlepdfdownload()
                    }}
                  >download rates</button>
                ):(null)
              }
            </div>
            {makeresponse ? (
              <div className="makeresponse_div">
                <form
                  className="makerespoonse"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleaddrate();
                  }}
                >
                  <label htmlFor="num_da">Enter Number Of Dayes:</label>
                  <input
                    id="num_da"
                    onChange={(e) => {
                      setratedata({ ...ratedata, num_day: e.target.value });
                    }}
                    type="input"
                    placeholder="enter number of day"
                  />
                  {inputList.map((x, i) => {
                    return (
                      <div className="row mb-3" key={i}>
                        <div class="div_input col-md-6">
                          <label style={{ width:'100%',display:'block',textAlign:'start' }} htmlFor="ti">Momney Title</label>
                          <input
                            id="ti"
                            type="text"
                            name="title"
                            class="form-control"
                            placeholder="Enter money title"
                            onChange={(e) => handleinputchange(e, i)}
                          />
                        </div>
                        <div class="div_input col-md-6">
                          <label style={{ width:'100%',display:'block',textAlign:'start' }} htmlFor="monval">Money Value</label>
                          <input
                            id="monval"
                            type="text"
                            name="value"
                            class="form-control"
                            placeholder="Enter money value"
                            onChange={(e) => handleinputchange(e, i)}
                          />
                        </div>
                        <div class="div_input col-md-12 mt-12">
                          {inputList.length - 1 === i && (
                            <button
                              className="btn add_btn btn-success"
                              onClick={handleaddclick}
                            >
                              Add More
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/*                       {
                        input_numbers.map((item,index)=>{
                          return(
                            <div>
                              <input
                                onChange={(e)=>{

                                  //input_numbers.map(())
                                  setinput_numbers([...input_numbers,]);//titles.concat(e.target.value)
                                }}
                                type="text"
                                placeholder='enter money title'
                              />
                              <input
                                onChange={(e)=>{
                                  setvalues(...values,e.target.value);//values.concat(e.target.value)
                                }}
                                type="text"
                                placeholder='enter money value'
                              />
                            </div>
                          )
                        })
                      } */}
                  <button>add</button>
                  <AiOutlineClose
                    onClick={() => {
                      setmakeresponse(false);
                    }}
                  />
                </form>
              </div>
            ) : null}
          </div>
        ) : null}
        {
          showdetails ? (
          <div className="showdetails">
            <div className="show_details_details">
              <div className="icontitle">
                <h1>Details & Charges</h1>
                <AiOutlineClose
                  onClick={() => {
                    setshowdetails(false);
                  }}
                />
              </div>
              <div className="break_details">
                <h4
                  className={`${showtype === "break" ? "active" : ""}`}
                  onClick={() => {
                    setshowtype("break");
                  }}
                >
                  charge breakdown
                </h4>
                <h4
                  className={`${showtype === "details" ? "active" : ""}`}
                  onClick={() => {
                    setshowtype("details");
                  }}
                >
                  quote details
                </h4>
              </div>
              {showtype === "break" ? (
                <React.Fragment>
                  {getdetails.reats_data ? (
                    <table className="Charge_Breakdown">
                      <thead>
                        <tr>
                          <th>Rate Title</th>
                          <th>Rate Fee</th>
                        </tr>
                      </thead>
                      {getdetails?.reats_data?.map((it, index) => {
                        return (
                          <tr key={index}>
                            <td>{it.reat_title}</td>
                            <td>
                              {it.reat_money} {it.reat_title}
                            </td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td>Total</td>
                        <td>{getdetails.total_money} USD</td>
                      </tr>
                    </table>
                  ) : null}
                </React.Fragment>
              ) : (
                <div className="quote_details">
                  <h4
                    style={{
                      color: "#46a7dd",
                      textAlign: "start",
                      marginTop: "30px",
                    }}
                  >
                    Route Details
                  </h4>
                  <table className="Charge_Breakdown">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>
                          {rowdata.origin_type == "location"
                            ? "Origin Address"
                            : rowdata.shipping_type != "ocean"
                            ? "Origin Airport"
                            : "Origin port"}
                        </th>
                        <th>
                          {rowdata.destination_type == "location"
                            ? "Destination Address"
                            : rowdata.shipping_type == "ocean"
                            ? "Destination port"
                            : "Destination Airport"}
                        </th>
                        <th>Estimated Transit Time</th>
                      </tr>
                    </thead>
                    <tr>
                      <td>{rowdata.shipping_type}</td>
                      <td>{rowdata.origin_location_name}</td>
                      <td>{rowdata.destination_location_name}</td>
                      <td>{getdetails.num_day} days</td>
                    </tr>
                  </table>

                  <h4
                    style={{
                      color: "#46a7dd",
                      textAlign: "start",
                      marginTop: "30px",
                    }}
                  >
                    Shipment
                  </h4>
                  <div>
                    <table className="Charge_Breakdown">
                      <thead>
                        <tr>
                          <th>Shipment Type</th>
                        </tr>
                      </thead>
                      <tr>
                        <td>{rowdata.cargo}</td>
                      </tr>
                    </table>
                  </div>
                  <h4
                    style={{
                      color: "#46a7dd",
                      textAlign: "start",
                      marginTop: "30px",
                    }}
                  >
                    {rowdata.cargo == "lcl" ? "Cargo Details" : "Cargo Details"}
                  </h4>
                  <div>
                    {rowdata.cargo == "fcl" ? (
                      <table className="Charge_Breakdown">
                        <thead>
                          <tr>
                            <th>Container Type</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        {rowdata?.fcl_data?.map((item, index) => {
                          return (
                            <tr>
                              <td key={index}>{item.container_type}</td>
                              <td key={index}>{item.qty} </td>
                            </tr>
                          );
                        })}
                      </table>
                    ) : (
                      rowdata?.lcl_data?.map((item, index) => {
                        return (
                          <div key={index}>
                            <table className="Charge_Breakdown">
                              <thead>
                                <tr>
                                  <th>height</th>
                                  <th>width</th>
                                  <th>length</th>
                                  <th>weight</th>
                                </tr>
                              </thead>
                              <tr>
                                <td>{item.height}IN</td>
                                <td>{item.width}IN</td>
                                <td>{item.length}IN</td>
                                <td>{item.weight}Bound</td>
                              </tr>
                              <tr>
                                <td>CRM</td>
                                <td colspan="4">{item.height * item.width * item.length * item.weight}IN<sup>3</sup></td>
                              </tr>
                            </table>
                            {
                              //  <div className="qtyLCL">
                              //   <span className="qtyLCLtitle">height: </span>
                              //   <span className="qty">{item.height}IN</span>
                              // </div>
                              // <div className="qtyLCL">
                              //   <span className="qtyLCLtitle">width: </span>
                              //   <span className="qty">{item.width}IN</span>
                              // </div>
                              // <div className="qtyLCL">
                              //   <span className="qtyLCLtitle">length: </span>
                              //   <span className="qty">{item.length}IN</span>
                              // </div>
                              // <div className="qtyLCL">
                              //   <span className="qtyLCLtitle">weight: </span>
                              //   <span className="qty">{item.weight}Bound</span>
                              // </div>
                            }
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null
      }
      </div>
      {showreasponeinput ? (
        <form
          className="disagreeform"
          onSubmit={(e) => {
            e.preventDefault();
            //makeresponse()
          }}
        >
          <textarea
            value={disreponsetxt}
            onChange={(e) => {
              setdisreponsetxt(e.target.value);
            }}
            placeholder="enter reasone for disagree"
          ></textarea>
          <Button
            onClick={() => {
              makeresponse();
            }}
          >
            response
          </Button>
          <HiOutlineXMark
            onClick={() => {
              setshowreasoninput(false);
            }}
          />
        </form>
      ) : null}
    </div>
  );
};

export default Quotes;
