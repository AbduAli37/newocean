import React, { useEffect, useState } from "react";
import "./quoteorder.css";
import { useLocation, useNavigate } from "react-router";
import { SlCallOut } from "react-icons/sl";
import {
  RiBuildingFill,
  RiMoneyEuroCircleLine,
  RiPaypalLine,
} from "react-icons/ri";
import {AiOutlineClose} from 'react-icons/ai'
import { GiWireframeGlobe } from "react-icons/gi";
import { Select, Switch } from "antd";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { login } from "../../../../functions/add_cotation";
import { flagdata } from "../../../../flagdata";
export const QuoteOrder = () => {
  const date = new Date();
  let day = date.getDate();
  if(day<10){
    day="0"+day
  }

let month = date.getMonth() + 1;
if(month<10){
  month="0"+month
}
let year = date.getFullYear();
console.log(year+"-"+month+"-"+day)
// let date2 = new Date('2024-06-15T17:37:59.000Z');
// const result2 = subtractYears(date, 2);
//   console.log(result2)
let year2=year;
  const todate = new Date();
  console.log(todate)
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state;
  const [mynext, setmynext] = useState("shidet");
  // const date = new Date();
  // let day = date.getDate();
  // console.log(day)
  const [indcomcheck,setindcomcheck]=useState(false);

  const [selected1, setselected1] = useState(false);
  const [selected2, setselected2] = useState(false);
  const [paystatus, setpaystatus] = useState(false);
  const [myalldata, setmyalldata] = useState({
    cotation_id: item.cotation_id,
    commodity: "Dry or General Cargo",
    ready_date: "",
    full_name: "",
    company_name: "",
    tax_id: "",
    email: "",
    phone_num: "",
    countery: "",
    city: "",
    zip_code: "",
    address: "",
    user_id: login.user.user_id,
    reat_id: item.rats_day_id,
  });
  const [cargetype,setcargetype]=useState("chbrea");
  const [showDetails,setShowDetails]=useState(false)
  const [Details,setDetails]=useState({});
  const [orimgsrc,setoriimgsrc]=useState("")
  const [desimgsrc,setdesimgsrc]=useState("")
  const createorder = () => {
    const data_Send = {
      ...myalldata,
    };
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/admin/create_order.php",
        JSON.stringify(data_Send)
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success("added successfully");
          navigate("/userdashboard/userbooking", {
            state: { data: { ...item, order_id: res.data.message } },
          });
        } else if (res.data.message) {
          toast.error(res.data.message);
        } else {
          toast.error("somthing went error");
        }
      });
  };
  const getimgssrc=()=>{
    let src = "";
    for (let i = 0; i < flagdata.length; i++) {
      if ((Array.isArray(item.ports_origin_data)?item.ports_origin_data[0].country:item.ports_origin_data.country) == flagdata[i].name) {
        const src = require("../../../img/flags/" +
          flagdata[i].code +
          ".svg");
        setoriimgsrc(src);
      }
      if ((Array.isArray(item.ports_destination_data)?item.ports_destination_data[0].country:item.ports_destination_data.country) == flagdata[i].name) {
        const src2 = require("../../../img/flags/" +
          flagdata[i].code +
          ".svg");
          setdesimgsrc(src2);
      }
    }
  }
  useEffect(()=>{
    getimgssrc()
  },[])
  return (
    <div className="quote_order">
      <div className="quote_order_details_div">
        <div className="quote_order_details">
          <div className="quote_order_left">
          <div style={{ display:'flex',flexWrap:'wrap', }}>
                      <h4
                        style={{ display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'column' }}
                      >
                        <span>{Array.isArray(item.ports_origin_data)?item.ports_origin_data[0]?.country:item.ports_origin_data.country}</span>
                        <span><img style={{
                          width: "20px",
                        }} src={orimgsrc} alt="" /></span>
                        <span>{Array.isArray(item.ports_origin_data)?item.ports_origin_data[0]?.name:item.ports_origin_data.name}</span>
                      </h4>
                      <h4>{`>>`}</h4>
                      <h4
                        style={{ display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'column' }}
                      >
                        <span>{Array.isArray(item.ports_destination_data)?item.ports_destination_data[0]?.country:item.ports_destination_data.country}</span>
                        <span><img style={{
                          width: "20px",
                        }} src={desimgsrc} alt="" /></span>
                        <span>{Array.isArray(item.ports_destination_data)?item.ports_destination_data[0]?.name:item.ports_destination_data.name}</span>
                      </h4>
                    </div>
          </div>
          <div className="quote_order_right">
            <div className="quote_order_time">
              <div>
                <span>will arrive at:</span>
                <span>{item.allrates.num_day} days</span>
              </div>
              {/* <div>
                <span>Estd.Transit Time:</span>
                <span>{item.estt}</span>
              </div> */}
            </div>
            <div className="quote_order_money">{item.total_money} USD</div>
          </div>
        </div>
        <div className="quote_last_div">
          <div className="last_div_left">
            <h5>{item.cargo}</h5>
            {/* <h5>Fastest</h5>
            <h5>Cheapest</h5>
            <h5>direct</h5> */}
          </div>
          <div style={{ cursor:'pointer',color:'blue' }} onClick={()=>{
            setShowDetails(true);
          }} className="last_div_right">show detils & charegs</div>
        </div>
      </div>
      <div className="quote_order_service">
        <div className="quote_order_service_left">
          {mynext == "addi" ? (
            <div className="addition_services">
              <h4>Additional Services</h4>
              <p>
                Please select the additional services you would like to add.
              </p>
              <div className="addition_service">
                <div>
                  <img
                    src={require("../../../../assets/img/Insurance.png")}
                    alt=""
                  />
                  <div>
                    <h4>Insurance</h4>
                    <p>
                      Cargo insurance will cover the cost of damaged goods
                      should unforeseen events occur during transportation. Used
                      cargo shipments are subject to a deductible of 1500
                      EUR.Terms of Insurance
                    </p>
                  </div>
                </div>
                <button>add</button>
              </div>
              <div className="addition_service">
                <div>
                  <img
                    src={require("../../../../assets/img/Insurance.png")}
                    alt=""
                  />
                  <div>
                    <h4>Export Customs Clearance - USD 65</h4>
                    <p>
                      All goods for export require documented, formal
                      authorization to pass out of a countery{" "}
                    </p>
                  </div>
                </div>
                <button>add</button>
              </div>
              <div className="addition_service">
                <div>
                  <img
                    src={require("../../../../assets/img/scale.png")}
                    alt=""
                  />
                  <div>
                    <h4>Solas VGM Scale Fee</h4>
                    <p>
                      The SOLAS VGM (Verified Gross Mass) is the declaration of
                      the accurate gross mass of a packed container.{" "}
                    </p>
                  </div>
                </div>
                <button>add</button>
              </div>
              <div className="quote_order_service_left_btns">
                <button>skip</button>
                <button
                  style={{cursor:'pointer'}}
                  onClick={() => {
                    setmynext("shidet");
                  }}
                >
                  next
                </button>
              </div>
            </div>
          ) : mynext == "shidet" ? (
            <React.Fragment>
              <div className="adding_done">
                <h3>Additional Services</h3>
                <img src={require("../../../../assets/img/blue.png")} alt="" />
              </div>
              <div className="shipment_details">
                <h4>Shipment Details</h4>
                <p>Please select the commodity and cargo ready date.</p>
                <div>
                  <div className="shipment_details_divs">
                    <div
                      style={{
                        width: "100%",
                      }}
                      className="shipment_details_divs_left"
                    >
                      <h3>Select the commodity you are shipping</h3>
                      <p>
                        This is needed to verify compliance with the carriers.
                        There are some commodities that we do not ship.
                      </p>
                      <Select
                        style={{
                          width: "100%",
                          marginBottom: 8,
                          textAlign: "right",
                        }}
                        value={myalldata.commodity}
                        //placeholder="md"
                        placeholder="select the commodity*"
                        onChange={(e) => {
                          setmyalldata({ ...myalldata, commodity: e });
                          //console.log(e);
                          //setregistdata({...registdata,profile_identfy:e});
                        }}
                        options={[
                          {
                            label: "Dry or General Cargo",
                            value: "Dry or General Cargo",
                          },
                          {
                            label: "Personal or Household Goods(HGG)",
                            value: "Personal or Household Goods(HGG)",
                          },
                          {
                            label: "i`m a Freight forward / cargo agent",
                            value: "i`m a Freight forward / cargo agent",
                          },
                        ]}
                      />
                    </div>
                    <div
                      style={{ width: "100%" }}
                      className="shipment_details_divs_right"
                    >
                      <h3>Select the cargo ready date</h3>
                      <p>
                        We will plan the pickup and sailing schedule of your
                        cargo based on this date.
                      </p>
                      <input
                        style={{ width: "100%" }}
                        value={myalldata.ready_date}
                        min={year2+"-"+month+"-"+day}
                        onChange={(e) => {
                          setmyalldata({
                            ...myalldata,
                            ready_date: e.target.value,
                          });
                        }}
                        type="date"
                        name=""
                        id=""
                      />
                    </div>
                  </div>
                </div>
                <button
                  style={{cursor:'pointer'}}
                  onClick={() => {
                    myalldata.ready_date
                      ? setmynext("bidet")
                      : toast("Enter All Data");
                  }}
                >
                  NEXT
                </button>
              </div>
            </React.Fragment>
          ) : mynext == "bidet" ? (
            <React.Fragment>
              <div className="adding_done">
                <h3>Additional Services</h3>
                <img src={require("../../../../assets/img/blue.png")} alt="" />
              </div>
              <div className="adding_done">
                <h3>Shipment Details</h3>
                <img src={require("../../../../assets/img/blue.png")} alt="" />
              </div>
              <div className="billing_det">
                <h2>Billing Details</h2>
                <p>
                  Please provide the details of the company that will be billed
                  for this shipment.
                </p>
                <form className="billing_form">
                  <div className="name">
                    <input
                      onChange={(e) => {
                        setmyalldata({
                          ...myalldata,
                          full_name: e.target.value,
                        });
                      }}
                      type="text"
                      placeholder="full name"
                    />
                    <input
                      onChange={(e) => {
                        setmyalldata({
                          ...myalldata,
                          company_name: e.target.value,
                        });
                      }}
                      type="text"
                      placeholder="company name"
                    />
                  </div>
                  <div className="id">
                    <input
                      onChange={(e) => {
                        setmyalldata({ ...myalldata, tax_id: e.target.value });
                      }}
                      type="text"
                      placeholder="tax id"
                    />
                    <input
                      onChange={(e) => {
                        setmyalldata({ ...myalldata, email: e.target.value });
                      }}
                      type="text"
                      placeholder="email id"
                    />
                  </div>
                  <div className="fone_count">
                    <PhoneInput
                      placeholder="Enter phone number"
                      onChange={(e) => {
                        setmyalldata({ ...myalldata, phone_num: e });
                        //console.log(e);
                        //setregistdata({...registdata,phone:e})
                      }}
                    />
                    <input
                      onChange={(e) => {
                        setmyalldata({
                          ...myalldata,
                          countery: e.target.value,
                        });
                      }}
                      type="text"
                      placeholder="countery"
                    />
                  </div>
                  <div className="city_code">
                    <input
                      onChange={(e) => {
                        setmyalldata({ ...myalldata, city: e.target.value });
                      }}
                      type="text"
                      placeholder="city*"
                    />
                    <input
                      onChange={(e) => {
                        setmyalldata({
                          ...myalldata,
                          zip_code: e.target.value,
                        });
                      }}
                      type="text"
                      placeholder="zip code"
                    />
                  </div>
                  <div className="address">
                    <input
                      onChange={(e) => {
                        setmyalldata({ ...myalldata, address: e.target.value });
                      }}
                      type="text"
                      placeholder="address"
                    />
                    <div style={{
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center',
                      gap:'5px'
                    }}>
                      <span>individual</span>
                      <Switch style={{height:'22px',width:'30px',display:'flex',alignItems:'center'}} checked={indcomcheck} onChange={()=>{
                      setindcomcheck(!indcomcheck)
                      }} />
                      <span>company</span>
                    </div>
                  </div>
                </form>
                <button
                  style={{cursor:'pointer'}}
                  onClick={() => {
                    myalldata.full_name.length > 0 &&
                    myalldata.company_name.length > 0 &&
                    myalldata.tax_id.length > 0 &&
                    myalldata.email.length > 0 &&
                    myalldata.phone_num.length > 0 &&
                    myalldata.countery.length > 0 &&
                    myalldata.city.length > 0 &&
                    myalldata.zip_code.length > 0 &&
                    myalldata.address.length > 0
                      ? createorder()
                      : toast("Enter All Data");
                  }}
                >
                  NEXT
                </button>
              </div>
            </React.Fragment>
          ) :
          null}
        </div>
        <div className="quote_order_service_right">
          <div>
            <div className="quote_order_service_right_title">
              Charge Summary (USD)
            </div>
            <div className="quote_order_service_origin">
              <h4>origin</h4>
              <h4>{item.total_money} USD</h4>
            </div>
          </div>
          <div>
            <div className="quote_order_service_right_title">
              YOUR TRUSTED PARTNER
            </div>
            <div className="quote_order_service_origin">
              <h4>
                <RiMoneyEuroCircleLine />
                <span>Transparent pricing</span>
              </h4>
              <h4>
                <RiBuildingFill />
                <span>Real-time shipment visibility</span>
              </h4>
              <h4>
                <SlCallOut />
                <span>Personal account manager</span>
              </h4>
            </div>
          </div>
          <div>
            <h4>Looking for assistance?</h4>
            <p>
              You can send us a message and one of our agents will get back to
              you shortly.
            </p>
            <Link to="/contactus" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>Contact US</Link>
          </div>
        </div>
      </div>
      {
        showDetails?(
          <div className="charges_details">
            <h3>
              <span>Details & Charges</span>
              <AiOutlineClose
                onClick={()=>{
                  setShowDetails(false)
                }}
              />
            </h3>
            <div className="charges_details_type">
              <h4
                className={cargetype=='chbrea'?'active':''}
                onClick={()=>{
                  setcargetype("chbrea")
                }}
              >Charge Breakdown</h4>
              <h4
                className={cargetype=='quodet'?'active':''}
                onClick={()=>{
                  setcargetype("quodet")
                }}
              >Quote Details</h4>
            </div>
            {
              cargetype=='chbrea'?(
                <>
                  <h4 className="total_money">
                    <span>ِTotal Money</span>
                    <span>{item.total_money} USD</span>
                  </h4>
                  {
                    item.allrates.reats_data.map((item,index)=>{
                      return(
                        <h4 className="mony_ti_val">
                          <span>{item.reat_title}</span>
                          <span>{item.reat_money} USD</span>
                        </h4>
                      )
                    })
                  }
                </>
              ):(
                <div className="quotedet">
                  <h4>Route Details</h4>
                  <div>
                  <div>
                    <h4>origin port</h4>
                    <h4>
                      <img style={{ width:'20px' }} src={orimgsrc} alt="" />
                      <span>{Array.isArray(item.ports_origin_data)?item.ports_origin_data[0].country:item.ports_origin_data.country}</span>
                    </h4>
                  </div>
                  <div>
                    <h4>destination port</h4>
                    <h4>
                      <img style={{ width:'20px' }} src={desimgsrc} alt="" />
                      <span>{Array.isArray(item.ports_destination_data)?item.ports_destination_data[0].country:item.ports_destination_data.country}</span>
                    </h4>
                  </div>
                  {/* <div>
                    <h4>origin port</h4>
                    <h4>
                      <span>{item.ready_date}</span>
                    </h4>
                  </div> */}
                  </div>
                  <div className="cargo_details">
                    <h4>cargo Details</h4>
                    <div>
                    <h4>Shipment Type</h4>
                    <h4>
                      <span>{item.cargo}</span>
                    </h4>
                    </div>
                    {item.cargo=='lcl'?(
                      <div>
                        <h4>
                          Cargo Details
                        </h4>
                        <h4>
                          {item.lcl_data[0].height}*
                          {item.lcl_data[0].weight}*
                          {item.lcl_data[0].width}
                        </h4>
                      </div>
                    ):(
                      <div>
                        <h4>Shipment Type</h4>
                        <h4>
                        {item.fcl_data[0].qty}*
                        {item.fcl_data[0].container_type}
                      </h4>
                      </div>
                    )}
                  </div>
                </div>
              )
            }
          </div>
        ):(
          null
        )
      }
    </div>
  );
};

//export default QuoteOrder;
