import { Table } from "antd";
import { Space, Tag } from "antd/es";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { flagdata } from "../../../flagdata";
import { arr } from "../../search/getdata";
import { air } from "../../../airports"; 
import "../shipments/shipments.css";
import "./delivaryreq.css";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
const Pending = () => {
  const [delivarydata, setdelivarydata] = useState([]);
  const [moredetails, setmoredetails] = useState({});
  const [showmore, setshowmore] = useState(false);
  const datacoulmn = [
    {
      title: "id",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "status",
      key: "status",
      dataIndex: "status",
    },
    // {
    //   title: "name",
    //   key: "user_name",
    //   render: (_, record) => (
    //     <Space>
    //       <div>{record?.quotation_data.user_data?.user_name}</div>
    //     </Space>
    //   ),
    // },
    {
      title: "type",
      key: "shipping_type",
      render: (_, record) => (
        <Space>
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
          {
            <span>
              {record.quotation_data.origin_type === "location" ? (
                <a href={record.quotation_data.link_origin_map} target="_blank">
                  <span className="loc_dest_org">
                    <span> {record.quotation_data.origin_location_name} </span>
                    <span>
                      {record.quotation_data.origin_type == "location" ? (
                        <Icon icon="fluent:location-16-regular" />
                      ) : record.quotation_data.shipping_type != "ocean" ? (
                        <Icon icon="guidance:arrival" />
                      ) : record.quotation_data.shipping_type != "local" ? (
                        <Icon icon="guidance:port" />
                      ) : (
                        <Icon icon="material-symbols:local-taxi-outline" />
                      )}
                    </span>{" "}
                  </span>
                </a>
                ) : record.quotation_data.origin_type === "code" ? (
                  <span className="loc_dest_org">
                    <span>
                      {" "}
                      {record.quotation_data.ports_origin_data[0]
                        ? record.quotation_data.ports_origin_data[0].name
                        : record.quotation_data.ports_origin_data.name}{" "}
                    </span>
                    <span>
                      {record.quotation_data.origin_type == "code" ? record.quotation_data.shipping_type == "air" ? (
                        <Icon icon="guidance:arrival" />
                      // console.log("ocean")
                      ) : record.quotation_data.shipping_type != "local" ? (
                        <Icon icon="guidance:port" />
                      // console.log("local")
                      ) : (
                        // <Icon icon="material-symbols:local-taxi-outline" />
                      console.log("code-d")
                      ): <Icon icon="fluent:location-16-regular" />
                    }
                    </span>{" "}
                  </span>
                ) : record.quotation_data.shipping_type === "ocean" ? (
                <React.Fragment>
                  {arr
                    .filter(
                      (item) =>
                        item.code === record.quotation_data.countery_code_origin
                    )
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
              ) : null}
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
          {console.log(record.quotation_data)}
          {
            <span id="countery_code_origin">
              {
                <img
                  src={
                    record.quotation_data.countery_code_origin
                      ? require("../../../../src/assets/img/flags/" +
                          flagdata.filter(
                            (item) =>
                              item.name ==
                              record.quotation_data.countery_code_origin
                          )[0].code +
                          ".svg")
                      : require("../../../../src/assets/img/flags/US.svg")
                          .default
                  }
                  alt=""
                />
              }
              {record.quotation_data.countery_code_origin}
            </span>
          }
        </Space>
      ),
    },

    {
      title: "Destination",
      key: "Destination",
      render: (_, record) => (
        <Space>
          {
            <span>
              {record.quotation_data.destination_type === "location" ? (
                <a href={record.quotation_data.link_destination_map} target="_blank">
                  <span className="loc_dest_org">
                    <span> {record.quotation_data.destination_location_name} </span>
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
                    </span>{" "}
                  </span>
                </a>
                ) : record.quotation_data.destination_type === "code" ? (
                  <span className="loc_dest_org">
                    <span>
                      {" "}
                      {record.quotation_data.ports_destination_data[0]
                        ? record.quotation_data.ports_destination_data[0].name
                        : record.quotation_data.ports_destination_data.name}{" "}
                    </span>
                    <span>
                      {record.quotation_data.destination_type == "code" ? record.quotation_data.shipping_type == "air" ? (
                        <Icon icon="guidance:arrival" />
                      // console.log("ocean")
                      ) : record.quotation_data.shipping_type != "local" ? (
                        <Icon icon="guidance:port" />
                      // console.log("local")
                      ) : (
                        // <Icon icon="material-symbols:local-taxi-outline" />
                      console.log("code-d")
                      ): <Icon icon="fluent:location-16-regular" />
                    }
                    </span>{" "}
                  </span>
                ) : record.quotation_data.shipping_type === "ocean" ? (
                <React.Fragment>
                  {arr
                    .filter(
                      (item) =>
                        item.code === record.quotation_data.countery_code_destination
                    )
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
                            {record.quotation_data.ports_destination_data.name}
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
                        record.quotation_data.countery_code_destination.toLowerCase()
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
                          {record.quotation_data.ports_destination_data.name}
                        </div>
                      );
                    })}
                </React.Fragment>
              ) : null}
            </span>
          }
        </Space>
      ),
    },

    {
      title: "Destination Country",
      key: "origin",
      render: (_, record) => (
        <Space>
          {console.log(record)}
          {
            <span id="countery_code_destination">
              {
                <img
                  src={
                    record.quotation_data.countery_code_destination
                      ? require("../../../../src/assets/img/flags/" +
                          flagdata.filter(
                            (item) =>
                              item.name ==
                              record.quotation_data.countery_code_destination
                          )[0].code +
                          ".svg")
                      : require("../../../../src/assets/img/flags/US.svg")
                          .default
                  }
                  alt=""
                />
              }
              {record.quotation_data.countery_code_destination}
            </span>
          }
        </Space>
      ),
    },
    {
      title: "Ready Date",
      key: "ready_date",
      dataIndex: "ready_date",
    },

    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space>
          <a
            onClick={() => {
              if (record.status != "cancle") {
                setmoredetails(record);
                setshowmore(true);
              } else {
                return null;
              }
            }}
            style={{ cursor: "pointer" }}
          >
            more details
          </a>
        </Space>
      ),
    },
    // {
    //   title: "country",
    //   key: "countery",
    //   dataIndex: "countery",
    // },
    // {
    //   title: "phone",
    //   key: "phone_num",
    //   dataIndex: "phone_num",
    // },
    // {
    //   title: "commodity",
    //   key: "commodity",
    //   dataIndex: "commodity",
    // },
  ];
  const getdelivarydata = () => {
    axios
      .post("https://camp-coding.tech/ocean_burg/admin/select_all_order.php", JSON.stringify({status : "pending"}))
      .then((res) => {
          setdelivarydata(res?.data?.message);
      });
  };
  const getport = (code, type) => {
    let portname = "";
    if (type == "ocean") {
      let portdata = arr.filter((item) => item.unlocs[0] == code);
      portname = portdata[0]?.name;
    } else {
      let portdata = air.filter((item) => item.code == code);
      portname = portdata[0]?.name;
    }
    return portname;
  };

  const getimagesrc = (c_name) => {
    let src = "";
    for (let i = 0; i < flagdata.length; i++) {
      if (c_name == flagdata[i].name) {
        src += "../../../assets/img/flags/" + flagdata[i].code + ".svg";
        // src = require("../../../assets/img/flags/" + flagdata[i].code + ".svg");
      }
    }
    //console.log(src);
    return src;
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <space>{record.quotation_data.user_data.user_name}</space>
      ),
    },
    {
      title: "email",
      key: "email",
      render: (_, record) => <space>{record.email}</space>,
    },
    {
      title: "country",
      key: "country",
      render: (_, record) => <space>{record.countery}</space>,
    },
    {
      title: "company",
      key: "company",
      render: (_, record) => (
        <space>{record.quotation_data.user_data.user_combany}</space>
      ),
    },
    {
      title: "phone",
      key: "phone",
      render: (_, record) => <space>{record.phone_num}</space>,
    },
  ];
  const columns2 = [
    {
      title: "commod",
      key: "commod",
      render: (_, record) => <Space>{record.commodity}</Space>,
    },
  ];
  const columns3 = [
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
    },
    {
      title: "Address ID",
      key: "address_id",
      dataIndex: "address_id",
    },
    {
      title: "Full Name",
      key: "full_name",
      dataIndex: "full_name",
    },
    {
      title: "Company Name",
      key: "company_name",
      dataIndex: "company_name",
    },
    {
      title: "Tax ID",
      key: "tax_id",
      dataIndex: "tax_id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      key: "phone_num",
      dataIndex: "phone_num",
    },
    {
      title: "Country",
      key: "countery      ",
      dataIndex: "countery ",
    },
    {
      title: "City",
      key: "city",
      dataIndex: "city",
    },
    {
      title: "Zip Code",
      key: "zip_code",
      dataIndex: "zip_code",
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
    },
  ];
  const showmorefuncs = () => {
    return (
      <div className="showmore_func">
        <div style={{ width: "100px", height: "fitContent" }}>
          <AiOutlineClose
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
            }}
          />
        </div>
        <div className="showmore_div">
          <button onClick={() => setshowmore(false)}>Close</button>
          <Table columns={columns} dataSource={[moredetails]} />
          <Table columns={columns2} dataSource={[moredetails]} />
          <div>
            {moredetails.quotation_data.cargo == "fcl" ? (
              <table className="Charge_Breakdown">
                <thead>
                  <tr>
                    <th>Container Type</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                {moredetails.quotation_data?.fcl_data?.map((item, index) => {
                  return (
                    <tr>
                      <td key={index}>{item.container_type}</td>
                      <td key={index}>{item.qty} </td>
                    </tr>
                  );
                })}
              </table>
            ) : (
              moredetails.quotation_data?.lcl_data?.map((item, index) => {
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
          <div className="addressesDetails">
            {moredetails.quotation_data.shipper_details ? (
              <div className="addressDetails">
                <h4>Shipper Details</h4>
                <Table
                  columns={columns3}
                  dataSource={[moredetails.quotation_data.shipper_details]}
                />
              </div>
            ) : null}
            {moredetails.quotation_data.pickup_address ? (
              <div className="addressDetails">
                <h4>Pickup Details</h4>
                <Table
                  columns={columns3}
                  dataSource={[moredetails.quotation_data.pickup_address]}
                />
              </div>
            ) : null}{" "}
            {moredetails.quotation_data.consignee_details ? (
              <div className="addressDetails">
                <h4>Consignee Details</h4>
                <Table
                  columns={columns3}
                  dataSource={[moredetails.quotation_data.consignee_details]}
                />
              </div>
            ) : null}
            {moredetails.quotation_data.delivery_address ? (
              <div className="addressDetails">
                <h4>Delivery Details</h4>
                <Table
                  columns={columns3}
                  dataSource={[moredetails.quotation_data.delivery_address]}
                />
              </div>
            ) : null}
            {moredetails.quotation_data.notify_party_details ? (
              <div className="addressDetails">
                <h4>Notify Party Details</h4>
                <Table
                  columns={columns3}
                  dataSource={[moredetails.quotation_data.notify_party_details]}
                />
              </div>
            ) : null}
          </div>
          <button
            className="confirm_request dilevery_status"
            onClick={async () => {
              const confirmOrder = await axios.post(
                "https://camp-coding.tech/ocean_burg/admin/update_order_status.php",
                JSON.stringify({
                  order_id: moredetails.order_id,
                  status: "delivery_request",
                })
              );
              if (confirmOrder.data.status == "success") {
                setshowmore(false)
                setmoredetails({})
                toast.success("Order Transferred to shipping successfully");
                getdelivarydata();
              } else {
                toast.error(confirmOrder.data.message);
              }
            }}
          >
            Confirm
          </button>
          <button
            className="cancel_request dilevery_status"
            onClick={async () => {
              const confirmOrder = await axios.post(
                "https://camp-coding.tech/ocean_burg/admin/update_order_status.php",
                JSON.stringify({
                  order_id: moredetails.order_id,
                  status: "cancle",
                })
              );
              // cancle
              if (confirmOrder.data.status == "success") {
                setshowmore(false);
                setmoredetails({})
                toast.success("Order canceled successfully");
                getdelivarydata();
              } else {
                toast.error(confirmOrder.data.message);
              }
              getdelivarydata();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };
  function rendershow() {
    if (showmore) {
      return showmorefuncs();
    }
  }
  useEffect(() => {
    getdelivarydata();
  }, []);
  return (
    <div className="delreq">
      <div className="shipments_page">
        <div className="shipments_page_table">
          <Table columns={datacoulmn} dataSource={delivarydata} />
          {rendershow()}
        </div>
      </div>
    </div>
  );
};

export default Pending;
