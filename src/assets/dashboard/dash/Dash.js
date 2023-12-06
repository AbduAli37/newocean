import { Button, Card, Col, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineLoading } from 'react-icons/ai';
import { BsChevronRight, BsFillFileEarmarkPdfFill } from 'react-icons/bs';
import "./dash.css"
import axios from 'axios';
import { Icon } from "@iconify/react";
import { arr } from '../../search/getdata';
import { air } from '../../../airports';
import { flagdata } from '../../../flagdata';
import { toast } from 'react-toastify';
const Dash = () => {
  const [confloading,setconfloading]=useState(false)
  const [showModel,setShowModel]=useState(false);
  const [recordData,setRecordData]=useState({})
  const user_id = JSON.parse(localStorage.getItem("myaccount"))?.user_id;
  const [showrates,setshowrates]=useState(false);
  const [showdetails,setshowdetails]=useState(false);
  const [pageLoading,setPageLoading]=useState(true);
  const [allDashData,setAllDashData]=useState([]);
  const [totalmoney, setmoneyvalue] = useState(0);
  const [getenmoney, setgetenmoney] = useState([]);
  const [showtype, setshowtype] = useState("break");
  const [getdetails, setgetdetails] = useState({});
  const [rowdata, setrowdata] = useState({});

  const [makeresponse, setmakeresponse] = useState(false);
  const [inputList, setinputList] = useState([{ title: "", value: "" }]);

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
      key: "cargo",
      render:(_,record)=>{
        return (
          <span>{record.quotation_data.cargo}</span>
        )
      }
    },
    {
      title: "type",
      key: "shipping_type",
      render: (_, record) => (
        <Space>
          {/* {console.log(record)} */}
          {record.quotation_data.shipping_type == "air" ? (
            <React.Fragment>
              <img
                style={{
                  width: "30px",
                }}
                src={require("../../../../src/assets/img/airport.png")}
                alt=""
              />
            </React.Fragment>
          ) : record.quotation_data.shipping_type == "ocean" ? (
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
                  {/* {console.log(record.quotation_data.shipping_type)} */}

          {
            <span>
              {/* {console.log(record)} */}
              {record.quotation_data.origin_type === "location" ? (
                <a href={record.link_origin_map} target="_blank">
                  <span className="loc_dest_org">
                    <span> {record.origin_location_name} ({record.quotation_data.origin_code}) </span>
                    <span>
                      {record.quotation_data.origin_type == "location" ? (
                        <Icon icon="fluent:location-16-regular" />
                      ) : record.quotation_data.origin_type != "ocean" ? (
                        <Icon icon="guidance:arrival" />
                      ) : record.quotation_data.origin_type != "local" ? (
                        <Icon icon="guidance:port" />
                      ) : (
                        <Icon icon="material-symbols:local-taxi-outline" />
                      )}
                    </span>{" "}
                  </span>
                </a>
              ) : record.quotation_data.origin_type === "code" ? (
                <span className="loc_dest_org">
                  {/* {console.log("Code")} */}
                  <span>
                    {" "}
                    {record.quotation_data.ports_origin_data[0]
                      ? record.quotation_data.ports_origin_data[0].name
                      : record.quotation_data.ports_origin_data.name}{" "}
                  </span>
                  <span>{`(${record.quotation_data.origin_code})`}</span>
                  <span>
                    {record.quotation_data.origin_type == "code" ? (
                      record.quotation_data.shipping_type == "air" ? (
                        <Icon icon="guidance:arrival" />
                      ) : record.quotation_data.shipping_type != "local" ? (
                        <Icon icon="guidance:port" />
                      ) : (
                        <Icon icon="material-symbols:local-taxi-outline" />
                      )
                    ) : (
                      <Icon icon="fluent:location-16-regular" />
                    )}
                  </span>{" "}
                </span>
              ) : record.quotation_data.shipping_type === "ocean" ? (
                <React.Fragment>
                  {arr
                    .filter((item) => item.code === record.quotation_data.countery_code_origin)
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
                            {record.quotation_data.ports_origin_data.name}
                          </div>
                        );
                      }
                    })}
                </React.Fragment>
              ) : record.quotation_data.shipping_type == "air" ? (
                <React.Fragment>
                  {air
                    .filter(
                      (item) =>
                        item.code.toLowerCase() ===
                        record.quotation_data.countery_code_origin.toLowerCase()
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
                          {record.quotation_data.ports_origin_data.name}
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
          {/* {console.log(record)} */}
          {
            <span id="countery_code_origin">
              {
                // <img
                //   src={require("../../../assets/img/flags/" +
                //     flagdata.filter(
                //       (item) => item.name == record.quotation_data.countery_code_origin
                //     )[0].code +
                //     ".svg")}
                //   alt=""
                // />
              }
              {record.quotation_data.countery_code_origin}
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
              {record.quotation_data.destination_type === "location" ? (
                <a href={record.link_destination_map} target="_blank">
                  <span className="loc_dest_org">
                    <span>{record.destination_location_name}</span>
                    <span>
                      {record.quotation_data.destination_type == "location" ? (
                        <Icon icon="fluent:location-16-regular" />
                      ) : record.quotation_data.shipping_type != "ocean" ? (
                        <Icon icon="guidance:arrival" />
                      ) : record.quotation_data.shipping_type != "local" ? (
                        <Icon icon="guidance:port" />
                      ) : (
                        <Icon icon="material-symbols:local-taxi-outline" />
                      )}
                    </span>
                  </span>
                </a>
              ) : record.quotation_data.destination_type === "code" ? (
                <span className="loc_dest_org">
                  {/* {console.log("Code")} */}
                  <span>
                    {" "}
                    {record.quotation_data.ports_destination_data[0]
                      ? record.quotation_data.ports_destination_data[0].name
                      : record.quotation_data.ports_destination_data.name}{" "}
                  </span>
                  <span>{`(${record.quotation_data.destination_code})`}</span>
                  <span>
                    {record.quotation_data.destination_type == "code" ? (
                      record.quotation_data.shipping_type == "air" ? (
                        <Icon icon="guidance:arrival" />
                      ) : record.quotation_data.shipping_type != "local" ? (
                        <Icon icon="guidance:port" />
                      ) : (
                        <Icon icon="material-symbols:local-taxi-outline" />
                      )
                    ) : (
                      <Icon icon="fluent:location-16-regular" />
                    )}
                  </span>{" "}
                </span>
              ) : record.quotation_data.shipping_type == "ocean" ? (
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
                            {record.quotation_data.ports_destination_data.name}
                            <h6>{item.country}</h6>
                          </div>
                        );
                      }
                    })}
                </React.Fragment>
              ) : record.quotation_data.shipping_type == "air" ? (
                <React.Fragment>
                  {air
                    .filter(
                      (item) =>
                        item.code.toLowerCase() ===
                        record.quotation_data.destination_code.toLowerCase()
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
                          {record.quotation_data.ports_destination_data.name}
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
          {/* {console.log(record)} */}
          {
            <span id="countery_code_destination">
              {
                // <img
                //   src={require("../../../assets/img/flags/" +
                //     flagdata.filter(
                //       (item) => item.name == record.quotation_data.countery_code_destination
                //     )[0].code +
                //     ".svg")}
                //   alt=""
                // />
              }
              {record.quotation_data.countery_code_destination}
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
      title: "status",
      key: "status",
      render:(_,record)=>{
        return (
          <span>{record.status}</span>
        )
      }
    },
    {
      title: "Change Status",
      key: "ch_sta",
      render:(_,record)=>{
        return (
          <div>
            <button disabled={record.status=='cancle'||record.status=='in_shipping'} onClick={()=>{
              setShowModel(true)
              setrowdata(record)
              setRecordData(record)
            }} style={{
              cursor:record.status=='cancle'||record.status=='in_shipping'?'no-drop':'pointer',
              color:'white',
              padding:'10px',
              backgroundColor:'#0d6efd',
              border:'none',
              borderRadius:'4px',
              fontSize:'19px'
            }}>Change</button>
          </div>
        )
      }
    },
    // {
    //   title: "action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space>
    //       <span
    //         onClick={async () => {
    //           // let obj= await _getNearestLocation(record)

    //           // console.log(obj)

    //           setshowrates(true);
    //           setrowdata(record);
    //           handlegetrate(record.cotation_id);

    //           //console.log(record.cotation_id)
    //         }}
    //         style={{
    //           color: "blue",
    //           cursor: "pointer",
    //         }}
    //       >
    //         view reats
    //       </span>
    //     </Space>
    //   ),
    // },
  ];
  const handleaddclick = () => {
    setinputList([...inputList, { title: "", value: "" }]);
  };
  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
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
  const getAllorders=()=>{
    setPageLoading(true)
    const data_send={
      user_id
    }
    axios.post("https://camp-coding.tech/ocean_burg/admin/select_order_deatils.php",JSON.stringify(data_send))
    .then((res)=>{
      // console.log(res)
      if(Array.isArray(res.data.message)){
        setAllDashData(res.data.message)
        // console.log(res.data.message[0].quotation_data)
      }
    }).catch(err=>console.log(err))
    .finally(()=>{
      setPageLoading(false)
    })
  }
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
    // console.log(data_send);
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
  const handleconfirm=(id)=>{
    setconfloading(true)
    const data_send={
      order_id: id,
      status: "in_shipping",
    }
    axios.post("https://camp-coding.tech/ocean_burg/admin/update_order_status.php",JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message);
        getAllorders()
        setShowModel(false)
      }
      else if(res.data.status=='error'){
        toast.error(res.data.message);
      }
      else {
        toast.error("Something Went Error")
      }
    }).catch(err=>console.log(err))
    .finally(()=>{
    setconfloading(false)
    })
  }
  const handlecancle=(id)=>{
    setconfloading(true)
    const data_send={
      order_id: id,
      status: "cancle",
    }
    axios.post("https://camp-coding.tech/ocean_burg/admin/update_order_status.php",JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message);
        getAllorders()
        setShowModel(false)
      }
      else if(res.data.status=='error'){
        toast.error(res.data.message);
      }
      else {
        toast.error("Something Went Error")
      }
    }).catch(err=>console.log(err))
    .finally(()=>{
    setconfloading(false)
    })
  }

  const [ratedata, setratedata] = useState({
    num_day: "",
    reat_title_money: "",
    cotation_id: "",
  });
  const handlepdfdownload=()=>{
    const data_send={
      cotation_id:rowdata?.cotation_id,
    }
    // console.log(data_send);
    axios.post("https://camp-coding.tech/ocean_burg/user/pdf_data/rates_pdf.php",JSON.stringify(data_send))
    .then((res)=>{
    // console.log(res.data)
    })
  }

  useEffect(()=>{
    getAllorders()
  },[])
  function funcshowdetails(details){
    return <div className='rate_details'
      style={{
        backgroundColor:'red',
        height:'100vh',
      }}
    >
      <h3>{details.to}</h3>
    </div>
  }
  return (
    <div>
      {
        pageLoading?(
          [1, 2, 3].map(x => (
            <Col xs={24} md={12} lg={24} key={x}>
              <Card loading minHeight={200} />
            </Col>
          ))
        ):(
          <div className='shipments_page'>
      <div className="shipments_filters">
        <h3>filters</h3>
        <div className="filters">
          <div className='mode_select'>
            <span>mode</span>
            <select>
              <option value="volvo">all</option>
              <option value="saab">some</option>
              <option value="mercedes">many</option>
            </select>
          </div>
          <input type="text" placeholder='Origin City/Port'/>
          <input type="text" placeholder='Destination City/Port'/>
        </div>
      </div>
        <div className="shipments_page_table">
          <Table columns={datacoulmn} dataSource={allDashData}/>
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
                        <p>{item.reat_money}</p> {/* hire */}
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
                          // console.log(item);
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
                  <input
                    onChange={(e) => {
                      setratedata({ ...ratedata, num_day: e.target.value });
                    }}
                    type="input"
                    placeholder="enter number of day"
                  />
                  {inputList.map((x, i) => {
                    return (
                      <div className="row mb-3" key={i}>
                        <div className="div_input col-md-6">
                          <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Enter money title"
                            onChange={(e) => handleinputchange(e, i)}
                          />
                        </div>
                        <div className="div_input col-md-6">
                          <input
                            type="text"
                            name="value"
                            className="form-control"
                            placeholder="Enter money value"
                            onChange={(e) => handleinputchange(e, i)}
                          />
                        </div>
                        <div className="div_input col-md-12 mt-12">
                          {inputList.length - 1 === i && (
                            <button
                              className="btn btn-success"
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
      </div>
        )
      }
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
                              {it.reat_money}
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
      {
        showModel?(
          <div className="show_change_status_div">
            <div className="change_status_div">
              <div className="svg">
                {console.log(rowdata)}
              <AiOutlineClose
                onClick={()=>{
                  setShowModel(false)
                }}
              />
              </div>
              <h4>Documents</h4>
            {rowdata.shippng_document.length ? (
            rowdata.shippng_document.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      margin: "10px 0px",
                      padding: "10px",
                      width: "100%",
                    }}
                  >
                    <a
                      target="_blank"
                      href={item.document}
                      style={{ color: "red" }}
                    >
                      <BsFillFileEarmarkPdfFill />
                      <em>{item.title}</em>
                    </a>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                    </div>
                  </div>
                </div>
              );
            })
              ) : (
                <React.Fragment />
              )
            }
            <div>
              <div className="pickup_add">
                <h3>pick up address</h3>
                <p>{rowdata.quotation_data.pickup_address.address}(rowdata.quotation_data.pickup_address.email)</p>
              </div>
              <div className="pickup_add">
                <h3>Consignee details</h3>
                <p>{rowdata.quotation_data.consignee_details.address}({rowdata.quotation_data.consignee_details.email})</p>
              </div>
              <div className="pickup_add">
                <h3>delivary address</h3>
                <p>{rowdata.quotation_data.delivery_address.address}({rowdata.quotation_data.delivery_address.email})</p>
              </div>
              <div className="pickup_add">
                <h3>notify party details</h3>
                <p>{rowdata.quotation_data.notify_party_details.address}({rowdata.quotation_data.notify_party_details.email})</p>
              </div>
              <div className="pickup_add">
                <h3>Shipper details</h3>
                <p>{rowdata.quotation_data.shipper_details.address}({rowdata.quotation_data.shipper_details.email})</p>
              </div>
              <div className="actions">
                <button
                  disabled={confloading}
                  style={{cursor:confloading?'no-drop':'pointer'  }}
                  onClick={()=>{
                    handleconfirm(rowdata.order_id)
                  }}
                >
                  {
                    confloading?<AiOutlineLoading/>:"confirm"
                  }
                </button>
                <button
                  onClick={()=>{
                    handlecancle(rowdata.order_id)
                  }}
                >
                  {
                    confloading?<AiOutlineLoading/>:"cancel"
                  }
                </button>
              </div>
            </div>
            </div>
          </div>
        ):(null)
      }
    </div>
  )
}

export default Dash
