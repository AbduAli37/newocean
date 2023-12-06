import React, { useEffect, useState } from "react";
import "./booking.css";
import { useLocation } from "react-router";
import { BsArrowRight } from "react-icons/bs";
import { AiFillPhone, AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import PhoneInput from "react-phone-number-input";
import { CiUser } from "react-icons/ci";
import { MdWork } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Spin } from "antd";
import { login } from "../../../functions/add_cotation";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
export const Booking = () => {
  const location = useLocation();
  const { data } = location.state;
  const navigate=useNavigate()
  const [selectedshipper,setselectedshipper]=useState('');
  const [deliselectedshipper,setdeliselectedshipper]=useState("");
  const [selCon,setSelCon]=useState("");
  const [deliselCon,setDeliselCon]=useState("");
  const [selpick,setselpick]=useState("");
  const [deliselpick,setdeliselpick]=useState("");
  const [seladd,setseladd]=useState('')
  const [deliseladd,setdeliseladd]=useState('')
  const [selnoti,setSelNoti]=useState('');
  const [deliselnoti,setdeliSelNoti]=useState('');
  const user = login.user;
  const [updateloading, setupdateloading] = useState(false);
  const [alladdress, setalladdress] = useState([]);
  const [addressType, setaddressType] = useState("");
  const [type, settype] = useState("");
  const [loading, setloading] = useState(false);
  const [oldid, setoldid] = useState("");
  const [docuploadloading, setdocuploadloading] = useState(false);
  const [documentfile, setdocumentfile] = useState(null);
  const [documenttitle, setdocumenttitle] = useState(null);
  // setdocumenttitle
  const [addedaddress, setaddedaddress] = useState({
    full_name: "",
    company_name: "",
    tax_id: "",
    email: "",
    phone_num: "",
    countery: "",
    city: "",
    zip_code: "",
    address: "",
    type: "",
    user_id: user.user_id,
    order_id: data.order_id,
  });
  const [addressid, setaddressid] = useState("");
  const [addloading, setaddloading] = useState(false);
  const [pend_action1, setpend_action1] = useState(false);
  const [pend_actionall1, setpend_actionall1] = useState(false);
  const [pend_actionall2, setpend_actionall2] = useState(false);
  const [pend_actionall3, setpend_actionall3] = useState(false);
  const [pend_actionall4, setpend_actionall4] = useState(false);
  const [pend_actionall5, setpend_actionall5] = useState(false);

  const [showdocument, setshowdocument] = useState(false);
  const [adddocument, setadddocument] = useState(false);
  const [mydocument, setdocument] = useState([]);
  const [updatedocument, setshowupdatemydocument] = useState(false);
  const getalldocuments = () => {
    const data_send = {
      order_id: data.order_id,
    };
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/admin/select_order_docement.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        setdocument(res.data.message);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const pend_func1 = () => {

    return (
      <div className="pending_div">
        <div className="pending">
          <h5>
            <span style={{ cursor:'pointer',color:'#0b5ed7',fontSize:'22px' }}>
              {
                addressType=='shipper'?
                'Add Shipper Details'
                :
                addressType=='pickup'?
                'Add pickup Details'
                :
                addressType=='delivery'?
                'Add delivary Details'
                :
                addressType=='notify_party'?
                'Add Notify Details':
                'Add Consignee Details'

              }
            </span>
            <span
              onClick={() => {
                setpend_action1(false);
              }}
            >
              <AiOutlineClose style={{ cursor:'pointer',color:'#d05115',fontSize:'22px' }} />
            </span>
          </h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleaddaddress();
            }}
          >
            <div>
              <input
                onChange={(e) => {
                  setaddedaddress({
                    ...addedaddress,
                    full_name: e.target.value,
                  });
                }}
                type="text"
                placeholder="enter your full name"
              />
              <input
                onChange={(e) => {
                  setaddedaddress({
                    ...addedaddress,
                    company_name: e.target.value,
                  });
                }}
                type="text"
                placeholder="enter company name"
              />
            </div>
            <div>
              <input
                onChange={(e) => {
                  setaddedaddress({ ...addedaddress, tax_id: e.target.value });
                }}
                type="text"
                placeholder="enter your tax id"
              />
              <input
                onChange={(e) => {
                  setaddedaddress({ ...addedaddress, email: e.target.value });
                }}
                type="email"
                placeholder="enter company email"
              />
            </div>
            <div className="phonecom">
              <PhoneInput
                onChange={(e) => {
                  setaddedaddress({ ...addedaddress, phone_num: e });
                }}
                placeholder="Enter phone number"
              />
              <input
                onChange={(e) => {
                  setaddedaddress({
                    ...addedaddress,
                    countery: e.target.value,
                  });
                }}
                type="text"
                placeholder="enter company contry"
              />
            </div>
            <div>
              <input
                onChange={(e) => {
                  setaddedaddress({ ...addedaddress, city: e.target.value });
                }}
                type="text"
                placeholder="enter your city"
              />
              <input
                onChange={(e) => {
                  setaddedaddress({
                    ...addedaddress,
                    zip_code: e.target.value,
                  });
                }}
                type="text"
                placeholder="enter zip code"
              />
            </div>
            <input
              onChange={(e) => {
                setaddedaddress({ ...addedaddress, address: e.target.value });
              }}
              type="text"
              placeholder="enter your address"
            />
            <button
              style={{
                width: "100%",
              }}
              className="addbtn"
            >
              {addloading ? <Spin /> : "add"}
            </button>
          </form>
        </div>
      </div>
    );
  };

  const pend_funcall1 = () => {
    return (
      <div className="pendingall_div">
        <div className="pending_all">
          <div style={{marginBottom:'10px'}}>
            <h4>Add Shipper Details</h4>
            <span>
              <AiOutlineClose
                onClick={() => {
                  setpend_actionall1(false);
                }}
              />
            </span>
          </div>
          <div className="addresses">
            {alladdress
              .filter((sh) => sh.type == "shipper")
              .map((item, index) => {
                return (
                  <div className="address">
                    <div className="address_person_details">
                      <div>
                        <div>
                          <CiUser />
                          <span>{item.full_name}</span>
                        </div>
                        <div>
                          <AiFillPhone />
                          <span>{item.phone_num}</span>
                        </div>
                        <div>
                          <img
                            style={{
                              width: "30px",
                            }}
                            src={require("../../img/usa.jpg")}
                            alt=""
                          />
                          <span>{item.countery}</span>
                        </div>
                      </div>
                      <div>
                        <div>
                          <MdWork />
                          <span>{item.company_name}</span>
                        </div>
                        <div>
                          <AiOutlineMail />
                          <span>{item.email}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {item.selected ? (
                        <img
                          style={{
                            width: "30px",
                          }}
                          src={require("../../img/check.png")}
                          alt=""
                        />
                      ) : (
                        <button
                          style={{cursor:'pointer'}}
                          onClick={() => {
                            // setaddressid(item.address_id);
                            setselectedshipper(item.address_id);
                            let allData = [...alladdress];
                            setalladdress(
                              allData.map((innerItem) => {
                                return item.address_id == innerItem.address_id
                                  ? { ...innerItem, selected: true }
                                  : { ...innerItem, selected: false };
                              })
                            );
                          }}
                        >
                          Select
                        </button>
                      )}
                      {/* <button
                        onClick={() => {
                          setaddressid(item.address_id);
                          let allData = [...alladdress];
                          console.log(allData[0].address_id, item.address_id);
                          setalladdress(
                            allData.map((innerItem) => {
                              return item.address_id == innerItem.address_id
                                ? { ...innerItem, selected: true }
                                : { ...innerItem, selected: false };
                            })
                          );
                        }}
                      >
                        Select
                      </button> */}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <button
          disabled={updateloading}
          style={{ cursor:updateloading?'no-drop':'pointer' }}
          onClick={() => {
            setupdateshipper();
          }}
          className="save_btn"
        >
          {updateloading ? <Spin style={{ color: "white" }} /> : "save"}
        </button>
      </div>
    );
  };
  const pend_funcall2 = () => {
    return (
      <div className="pendingall_div">
        <div className="pending_all">
          <h6
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{
                cursor: "pointer",
                fontSize:'22px',
                color:'#0b5ed7',
              }}>Add Consignee Details</span>
            <AiOutlineClose

              style={{
                cursor: "pointer",
                fontSize:'22px',
                color:'#d05115',
              }}
              onClick={() => {
                setpend_actionall2(false);
              }}
            />
          </h6>
          <div style={{ width: "100%" }}>
            <div className="addresses" style={{ width: "100%" ,flexWrap:'wrap'}}>
              {alladdress
                .filter((con) => (con.type = "consignee"))
                .map((item, index) => {
                  return (
                    <div style={{ width:'100%' }} className="address">
                      <div className="address_person_details">
                        <div>
                          <div>
                            <CiUser />
                            <span>{item.full_name}</span>
                          </div>
                          <div>
                            <AiFillPhone />
                            <span>{item.phone_num}</span>
                          </div>
                          <div>
                            <img
                              style={{
                                width: "30px",
                              }}
                              src={require("../../img/usa.jpg")}
                              alt=""
                            />
                            <span>{item.countery}</span>
                          </div>
                        </div>
                        <div>
                          <div>
                            <MdWork />
                            <span>{item.company_name}</span>
                          </div>
                          <div>
                            <AiOutlineMail />
                            <span>{item.email}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        {item.selected ? (
                          <img
                            style={{
                              width: "30px",
                            }}
                            src={require("../../img/check.png")}
                            alt=""
                          />
                        ) : (
                          <button
                          style={{cursor:'pointer'}}
                            onClick={() => {
                              setSelCon(item.address_id);
                              // console.log(item.address_id);
                              // setaddressid(item.address_id);
                              let allData = [...alladdress];
                              setalladdress(
                                allData.map((innerItem) => {
                                  return item.address_id == innerItem.address_id
                                    ? { ...innerItem, selected: true }
                                    : { ...innerItem, selected: false };
                                })
                              );
                            }}
                          >
                            Select
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              <button
                        disabled={updateloading}
                        style={{ cursor:updateloading?'no-drop':'pointer' }}
                onClick={() => {
                  updateconsignee();
                }}
                className="save_btn"
              >
                {updateloading ? <Spin style={{ color: "white" }} /> : "save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const pend_funcall3 = () => {
    return (
      <div className="pendingall_div">
        <div className="pending_all">
          <h6
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{
                cursor: "pointer",
                fontSize:'22px',
                color:'#0b5ed7',
              }}>Add pickup Details</span>
            <AiOutlineClose
              style={{
                cursor: "pointer",
                color:'#d05115',
                fontSize:'22px',
              }}
              onClick={() => {
                setpend_actionall3(false);
              }}
            />
          </h6>
          <div style={{ width: "100%" ,flexWrap:'wrap'}}>
            <div className="addresses" style={{ width: "100%",flexWrap:'wrap' }}>
              {alladdress
                .filter((pi) => (pi.type = "pickup"))
                .map((item, index) => {
                  return (
                    <div className="address" style={{ width:'100%' }}>
                      <div className="address_person_details">
                        <div>
                          <div>
                            <CiUser />
                            <span>{item.full_name}</span>
                          </div>
                          <div>
                            <AiFillPhone />
                            <span>{item.phone_num}</span>
                          </div>
                          <div>
                            <img
                              style={{
                                width: "30px",
                              }}
                              src={require("../../img/usa.jpg")}
                              alt=""
                            />
                            <span>{item.countery}</span>
                          </div>
                        </div>
                        <div>
                          <div>
                            <MdWork />
                            <span>{item.company_name}</span>
                          </div>
                          <div>
                            <AiOutlineMail />
                            <span>{item.email}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        {item.selected ? (
                          <img
                            style={{
                              width: "30px",
                            }}
                            src={require("../../img/check.png")}
                            alt=""
                          />
                        ) : (
                          <button
                          style={{cursor:'pointer'}}
                            onClick={() => {
                              setselpick(item.address_id);
                              // setaddressid(item.address_id);
                              // setaddressid(item.address_id);
                              // console.log(item.address_id);
                              let allData = [...alladdress];
                              setalladdress(
                                allData.map((innerItem) => {
                                  return item.address_id == innerItem.address_id
                                    ? { ...innerItem, selected: true }
                                    : { ...innerItem, selected: false };
                                })
                              );
                            }}
                          >
                            Select
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              <button
                        disabled={updateloading}
                        style={{ cursor:updateloading?'no-drop':'pointer' }}
                onClick={() => {
                  updatepickup();
                }}
                className="save_btn"
              >
                {updateloading ? <Spin style={{ color: "white" }} /> : "save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const pend_funcall4 = () => {
    return (
      <div className="pendingall_div">
        <div className="pending_all">
          <h6
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ color:'#0b5ed7',fontSize:'22px' }}>Add delivary Details</span>
            <AiOutlineClose
              style={{
                cursor: "pointer",
                fontSize:'22px',
                color:'#d05115'
              }}
              onClick={() => {
                setpend_actionall4(false);
              }}
            />
          </h6>
          <div style={{ width: "100%",flexWrap:'wrap' }}>
            <div className="addresses" style={{ width: "100%",flexWrap:'wrap' }}>
              {alladdress
                .filter((de) => de.type == "delivery")
                .map((item, index) => {
                  return (
                    <div className="address" style={{ width:'100%' }}>
                      <div className="address_person_details">
                        <div>
                          <div>
                            <CiUser />
                            <span>{item.full_name}</span>
                          </div>
                          <div>
                            <AiFillPhone />
                            <span>{item.phone_num}</span>
                          </div>
                          <div>
                            <img
                              style={{
                                width: "30px",
                              }}
                              src={require("../../img/usa.jpg")}
                              alt=""
                            />
                            <span>{item.countery}</span>
                          </div>
                        </div>
                        <div>
                          <div>
                            <MdWork />
                            <span>{item.company_name}</span>
                          </div>
                          <div>
                            <AiOutlineMail />
                            <span>{item.email}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        {item.selected ? (
                          <img
                            style={{
                              width: "30px",
                            }}
                            src={require("../../img/check.png")}
                            alt=""
                          />
                        ) : (
                          <button
                          style={{cursor:'pointer'}}
                            onClick={() => {
                              setseladd(item.address_id)
                              console.log(item.address_id)
                              // setaddressid(item.address_id);
                              let allData = [...alladdress];
                              setalladdress(
                                allData.map((innerItem) => {
                                  return item.address_id == innerItem.address_id
                                    ? { ...innerItem, selected: true }
                                    : { ...innerItem, selected: false };
                                })
                              );
                            }}
                          >
                            Select
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              <button
                        disabled={updateloading}
                        style={{ cursor:updateloading?'no-drop':'pointer' }}
                onClick={() => {
                  updatedelivary();
                }}
                className="save_btn"
              >
                {updateloading ? <Spin style={{ color: "white" }} /> : "save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const pend_funcall5 = () => {
    return (
      <div className="pendingall_div">
        <div className="pending_all">
          <h6
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ color:'#0b5ed7',fontSize:'22px' }}>Add notify Details</span>
            <AiOutlineClose
              style={{
                cursor: "pointer",
                fontSize:'22px',
                color:'#d05115'
              }}
              onClick={() => {
                setpend_actionall5(false);
              }}
            />
          </h6>
          <div style={{ width: "100%" }}>
            <div className="addresses" style={{ width: "100%",flexWrap:'wrap' }}>
              {alladdress
                .filter((gg) => gg.type == "notify_party")
                .map((item, index) => {
                  return (
                    <div className="address" style={{ width:'100%' }}>
                      <div className="address_person_details">
                        <div>
                          <div>
                            <CiUser />
                            <span>{item.full_name}</span>
                          </div>
                          <div>
                            <AiFillPhone />
                            <span>{item.phone_num}</span>
                          </div>
                          <div>
                            <img
                              style={{
                                width: "30px",
                              }}
                              src={require("../../img/usa.jpg")}
                              alt=""
                            />
                            <span>{item.countery}</span>
                          </div>
                        </div>
                        <div>
                          <div>
                            <MdWork />
                            <span>{item.company_name}</span>
                          </div>
                          <div>
                            <AiOutlineMail />
                            <span>{item.email}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        {item.selected ? (
                          <img
                            style={{
                              width: "30px",
                            }}
                            src={require("../../img/check.png")}
                            alt=""
                          />
                        ) : (
                          <button
                          style={{cursor:'pointer'}}
                            onClick={() => {
                              setSelNoti(item.address_id);
                              // setaddressid(item.address_id);
                              let allData = [...alladdress];
                              setalladdress(
                                allData.map((innerItem) => {
                                  return item.address_id == innerItem.address_id
                                    ? { ...innerItem, selected: true }
                                    : { ...innerItem, selected: false };
                                })
                              );
                            }}
                          >
                            Select
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              <button
                        disabled={updateloading}
                        style={{ cursor:updateloading?'no-drop':'pointer' }}
                onClick={() => {
                  updatenot();
                }}
                className="save_btn"
              >
                {updateloading ? <Spin style={{ color: "white" }} /> : "save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const pend_show_document = () => {
    return (
      <div className="pendingall_div">
        <div className="pending_all">
          <h6
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ color:'#0b5ed7',fontSize:'22px' }}>Show Document Details</span>
            <AiOutlineClose
              style={{
                cursor: "pointer",
                fontSize:'22px',
                color:'#d05115'
              }}
              onClick={() => {
                setshowdocument(false);
              }}
            />
          </h6>

          {mydocument.length ? (
            mydocument.map((item, index) => {
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
                      <AiOutlineClose
                        onClick={() => {
                          handledeletemydocument(item.shippng_id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <React.Fragment />
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleadddocument();
            }}
            style={{
              width: "400px",
              maxWidth: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "300px",
              maxHeight: "100%",
              flexDirection: "column",
              gap: "10px",
              padding: "10px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              margin: "auto",
            }}
          >
            <label style={{ width:'100%' }} htmlFor="">Enter Document File</label>
            <input
              onChange={(e) => {
                setdocumentfile(e.target.files[0]);
              }}
              type="file"
              style={{
                width: "100%",
                // height: "40px",
                fontSize: "14px",
                borderRadius: "3px",
                border: "1px solid #ccc",
                outline: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // padding: "10px",
                lineHeight: "40px",
                padding: "10px 16px",
              }}
            />
            <label style={{ width:'100%' }} htmlFor="">Enter Document Title</label>
            <input
              onChange={(e) => {
                setdocumenttitle(e.currentTarget.value);
              }}
              type="text"
              style={{
                width: "100%",
                // height: "40px",
                fontSize: "14px",
                borderRadius: "3px",
                border: "1px solid #ccc",
                outline: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // padding: "10px",
                lineHeight: "40px",
                padding: "10px 16px",
              }}
            />
            {docuploadloading ? (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                <Spin />
              </div>
            ) : (
              <button
                style={{
                  width: "200px",
                  maxWidth: "100%",
                  // height: "30px",
                  color: "white",
                  backgroundColor: "#0b5ed7",
                  border: "none",
                  borderRadius: "3px",
                  padding: "10px 16px",
                  cursor: "pointer",
                }}
                className="btn btn-primary"
              >
                Upload
              </button>
            )}
          </form>
        </div>
      </div>
    );
  };

  function renderall() {
    if (pend_action1) {
      return pend_func1();
    }
    // if (adddocument) {
    //   return pend_add_document();
    // }
  }
  function renderallall() {
    if (pend_actionall1) {
      return pend_funcall1();
    }
    if (pend_actionall2) {
      return pend_funcall2();
    }
    if (pend_actionall3) {
      return pend_funcall3();
    }
    if (pend_actionall4) {
      return pend_funcall4();
    }
    if (pend_actionall5) {
      return pend_funcall5();
    }
    if (showdocument == true) {
      return pend_show_document();
    }
  }
  const handleaddaddress = () => {
    if (addedaddress.full_name == "") {
      toast.warn("enter full name");
      return;
    }
    if (addedaddress.company_name == "") {
      toast.warn("enter company name");
      return;
    }
    if (addedaddress.tax_id == "") {
      toast.warn("enter tax id");
      return;
    }
    if (addedaddress.email == "") {
      toast.warn("enter email");
      return;
    }
    if (addedaddress.phone_num == "") {
      toast.warn("enter phone number");
      return;
    }
    if (addedaddress.countery == "") {
      toast.warn("enter country");
      return;
    }
    if (addedaddress.city == "") {
      toast.warn("enter city");
      return;
    }
    if (addedaddress.zip_code == "") {
      toast.warn("enter zip code");
      return;
    }
    if (addedaddress.address == "") {
      toast.warn("enter address");
      return;
    }

    const data_send = {
      order_id: data.order_id,
      ...addedaddress,
    };
    console.log(data_send)
    setaddloading(true);
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/admin/add_address.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        if(res.data.status === "success") {
          getaddresses(data_send.type);
          setpend_action1(false);
          toast.success(res.data.message);
        }
        else if(res.data.status === "error") {
          toast.error(res.data.message);
        }
        else{
          toast.error("something went error");
        }
      })
      .finally(() => {
        setaddloading(false);
      });
  };
  const getaddresses = (mytype) => {
    const data_send = {
      order_id: data.order_id,
      type: mytype,
    };
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/admin/get_all_addresses.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        // console.log(res);
        // console.log(res.data.message);
        const alldata = [...res.data.message];
        const afetrloading = alldata.map((item, index) => {
          if (item.used == "0") {
            return { ...item, loading: false, selected: false };
          } else {
            setoldid(item.address_id);
            return { ...item, loading: true, selected: true };
          }
        });
        setalladdress(afetrloading);
      });
  };

  const setupdateshipper = () => {
    const data_send = {
      order_id: data.order_id,
      shipper_details_id: selectedshipper,
      old_address: oldid || "new",
    };
    setupdateloading(true);
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/admin/update_shipper_address.php",
        JSON.stringify(data_send)
      )
      .then((res) => {

        if (res.data.status == "success") {
          setdeliselectedshipper(selectedshipper);
          getaddresses("shipper");
          toast.success(res.data.message);
        } else if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.error("something went error");
        }
      })
      .finally(() => {
        setupdateloading(false);
      });
  };
  const updateconsignee = () => {
    const data_send = {
      order_id: data.order_id,
      consignee_details_id: selCon,
    };
    // console.log(data_send);
    setupdateloading(true);
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/admin/update_consignee_address.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        if (res.data.status == "success") {
          setDeliselCon(selCon);
          toast.success(res.data.message);
        } else if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.error("something went error");
        }
      })
      .finally(() => {
        setupdateloading(false);
      });
  };
  const updatepickup = () => {
    const data_send = {
      order_id: data.order_id,
      pickup_address_id: selpick,
    };
    setupdateloading(true);
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/admin/update_pickup_address.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setdeliselpick(selpick);
        } else if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.error("something went error");
        }
      })
      .finally(() => {
        setupdateloading(false);
      });
  };
  const updatedelivary = () => {
    const data_send = {
      order_id: data.order_id,
      delivery_address_id: seladd,
    };
    setupdateloading(true);
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/admin/update_delivery_address.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setdeliseladd(seladd);
        } else if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.error("something went error");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setupdateloading(false);
      });
  };
  const updatenot = () => {
    const data_send = {
      order_id: data.order_id,
      notify_party_details_id: selnoti,
    };
    setupdateloading(true);
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/admin/update_notify_party.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setdeliSelNoti(selnoti)
        } else if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.error("something went error");
        }
      })
      .finally(() => {
        setupdateloading(false);
      });
  };

  const handleupdatedocument = () => {
    const formdata = new FormData();
    formdata.append("order_id", data.order_id);
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/admin/delete_document.php",
        formdata
      )
      .then((res) => {
        toast.success(res.data);
      });
  };

  const handleadddocument = () => {
    if (documentfile == null || documentfile == "") {
      toast.warn("enter file");
      return;
    }
    const formdata = new FormData();
    formdata.append("file_attachment", documentfile);
    formdata.append("order_id", data.order_id);
    formdata.append("title", documenttitle);
    // documenttitle
    setdocuploadloading(true);
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/admin/upload_shipping_docoment.php",
        formdata
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          getalldocuments()
          // setshowdocument(false)
        } else if (res.data.status === "error") {
          toast.error(res.data.message);
        } else {
          toast.error("something is error");
        }
      })
      .finally(() => {
        setdocuploadloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handledeletemydocument = (id) => {
    const data_send = {
      shippng_id: id,
    };
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/admin/delete_document.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        toast.success(res.data);
        getalldocuments();
      });
  };
  return (
    <div
      className="container"
      style={{
        padding: "20px",
      }}
    >
      <div className="pend_actions">
        <div className="pend_action">
          <div>
            <span>1.</span>
            <h5>Add Shipper Details</h5>
          </div>
          <h6
            id="shipper"
            onClick={(e) => {
              setaddressType("shipper");
              setaddedaddress({ ...addedaddress, type: "shipper" });
              settype("shipper");
              getaddresses("shipper");
              setpend_action1(true);
              setpend_actionall1(true);
            }}
          >
            <span>ADD</span>
            <BsArrowRight />
          </h6>
        </div>
        <div className="pend_action">
          <div>
            <span>2.</span>
            <h5> Add Consignee Details</h5>
          </div>
          <h6>
            <span
              id="consignee"
              onClick={(e) => {
                setaddressType("consignee");
                setaddedaddress({ ...addedaddress, type: "consignee" });
                getaddresses("consignee");
                // settype('consign')
                setpend_actionall2(true);
                setpend_action1(true);
              }}
            >
              ADD
            </span>
            <BsArrowRight />
          </h6>
        </div>
        <div className="pend_action">
          <div>
            <span>3.</span>
            <h5>Add Pickup Address</h5>
          </div>
          <h6>
            <span
              id="pickup"
              onClick={(e) => {
                settype("pickup");
                getaddresses("pickup");

                setaddressType("pickup");
                setaddedaddress({ ...addedaddress, type: "pickup" });

                setpend_actionall3(true);
                setpend_action1(true);
              }}
            >
              ADD
            </span>
            <BsArrowRight />
          </h6>
        </div>
        <div className="pend_action">
          <div>
            <span>4.</span>
            <h5>Add Delivery Address</h5>
          </div>
          <h6>
            <span
              id="delivery"
              onClick={(e) => {
                setaddressType("delivery");
                settype("delivery");
                getaddresses("delivery");

                setaddedaddress({ ...addedaddress, type: "delivery" });
                setpend_actionall4(true);
                setpend_action1(true);
              }}
            >
              ADD
            </span>
            <BsArrowRight />
          </h6>
        </div>
        <div className="pend_action">
          <div>
            <span>5.</span>
            <h5>Add Notify Party Details</h5>
          </div>
          <h6>
            <span
              role="button"
              id="notify_party"
              onClick={(e) => {
                setaddressType(e.currentTarget.id);
                setaddedaddress({ ...addedaddress, type: "notify_party" });
                settype("notify_party");
                getaddresses("notify_party");

                setpend_actionall5(true);
                setpend_action1(true);
              }}
            >
              ADD
            </span>
            <BsArrowRight />
          </h6>
        </div>
        <div className="pend_action">
          <div>
            <span>6.</span>
            <h5>Upload Documents</h5>
          </div>
          <h6
            onClick={(e) => {
              // setaddressType(e.currentTarget.id);
              // setaddedaddress({ ...addedaddress, type: "notify_party" });
              // settype("notify_party");
              // getaddresses("notify_party");
              getalldocuments();
              setshowdocument(true);
              setadddocument(true);
              // setpend_actionall5=(true);
              // setpend_action1(true);
            }}
          >
            <span>ADD</span>
            <BsArrowRight />
          </h6>
        </div>
        <div className="pend_action">
          <button
            style={{
              backgroundColor: "#0d6efd",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
            className="confirm_request dilevery_status"
            onClick={async () => {
              if(deliselectedshipper==''||deliselCon==''||deliselpick==''||deliseladd==''||deliselnoti==''||documentfile==''||mydocument.length==0){
                console.log(mydocument)
                console.log(documentfile)
                console.log(deliselnoti)
                console.log(deliseladd)
                console.log(deliselpick)
                console.log(deliselCon)
                console.log(deliselectedshipper)
                toast.warn('Complete Data');
                return;
              }
              //console.log(moredetails.order_id);
              const confirmOrder = await axios.post(
                "https://camp-coding.tech/ocean_burg/admin/update_order_status.php",
                JSON.stringify({
                  order_id: data.order_id,
                  status: "delivery_request",
                })
              );
              confirmOrder.data.status == "success"
                ? toast.success("Order Completed Successfully")
                : toast.error(confirmOrder.data.message);
                if(confirmOrder.data.status == "success"){
                  navigate("/userdashboard/userdash",{replace:true});
                }
            }}
          >
            complete order
          </button>
        </div>
      </div>
      {renderall()}
      {renderallall()}
    </div>
  );
};

//export default Booking
