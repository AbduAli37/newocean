import React, { useEffect, useState } from "react";
import "./quoteorder.css";
import { useLocation, useNavigate } from "react-router";
import { SlCallOut } from "react-icons/sl";
import {
  RiBuildingFill,
  RiMoneyEuroCircleLine,
  RiPaypalLine,
} from "react-icons/ri";
import { GiWireframeGlobe } from "react-icons/gi";
import { Select } from "antd";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
const QuoteOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state;
  //console.log(item)
  const [mynext, setmynext] = useState("shidet");
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
  });
  const createorder = () => {
    const data_Send = {
      ...myalldata,
    };
    console.log(data_Send);
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/admin/create_order.php",
        JSON.stringify(data_Send)
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "success") {
          toast.success("added successfully");
          navigate("/dashboard/booking", {
            state: { data: { ...item, order_id: res.data.message } },
          });
        } else if (res.data.message) {
          toast.error(res.data.message);
        } else {
          toast.error("somthing went error");
        }
      });
  };
  return (
    <div className="quote_order">
      <div className="quote_order_details_div">
        <div className="quote_order_details">
          <div className="quote_order_left">
            <div>
              <div className="quote_order_left_from_1">
                <h4>
                  {item.from} {`${"<"}`}{" "}
                </h4>
                <h4>{item.to}</h4>
              </div>
              <div className="quote_order_left_from_1">
                <h4>
                  <img
                    style={{
                      width: "20px",
                    }}
                    src={require("../../../../assets/img/usa.jpg")}
                    alt=""
                  />
                  <span>{item.fromcount}</span>
                </h4>
                <h4>
                  <img
                    style={{
                      width: "20px",
                    }}
                    src={require("../../../../assets/img/egypt.jpg")}
                    alt=""
                  />
                  <span>{item.tocount}</span>
                </h4>
              </div>
            </div>
          </div>
          <div className="quote_order_right">
            <div className="quote_order_time">
              <div>
                <span>Valid Until:</span>
                <span>{item.valun}</span>
              </div>
              <div>
                <span>Estd.Transit Time:</span>
                <span>{item.estt}</span>
              </div>
            </div>
            <div className="quote_order_money">USD{item.total_money}</div>
          </div>
        </div>
        <div className="quote_last_div">
          <div className="last_div_left">
            <h5>FCL</h5>
            <h5>Fastest</h5>
            <h5>Cheapest</h5>
            <h5>direct</h5>
          </div>
          <div className="last_div_right">show detils & charegs</div>
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
                  </div>
                </form>
                <button
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
          ) : /*   <React.Fragment>
            <div className='adding_done'>
              <h3>Additional Services</h3>
              <img src={require("../../../../assets/img/blue.png")} alt="" />
            </div>
            <div className='adding_done'>
              <h3>Shipment Details</h3>
              <img src={require("../../../../assets/img/blue.png")} alt="" />
            </div>
            <div className='adding_done'>
              <h3>Billing Details</h3>
              <img src={require("../../../../assets/img/blue.png")} alt="" />
            </div>
            <div className="payment_options">
              <h3>Payment Options</h3>
              <p>Select your preferred payment option</p>
              <div className="payment_methods">
                <div className="payment_method">
                  <RiPaypalLine/>
                  <div className="payment_method_text">
                    <h5>Pay now using credit card / PayPal - Transaction </h5>
                    <h6>Fee: USD 124.99</h6>
                    <p>You will be redirected to PayPal to complete the payment using credit card or debit card. There is an additional fee of USD 124.99 for this mode of payment.</p>
                  </div>
                  {
                    selected1?(
                      <img
                      onClick={()=>{
                        setselected1(false);
                        setmyalldata({...myalldata,pay_methode:''})
                      }}
                        style={{
                          cursor:'pointer',
                        width:'30px'
                      }}  src={require("../../../../assets/img/blue.png")}/>
                    ):(
                      <button
                      onClick={(e)=>{
                        setselected1(true)
                        setmyalldata({...myalldata,pay_methode:"paypal"})
                      }}
                    >
                      select
                    </button>
                    )
                  }
                </div>
                <div className="payment_method">
                  <GiWireframeGlobe/>
                  <div className="payment_method_text">
                    <h5>Pay now using credit card / PayPal - Transaction </h5>
                    <h6>Fee: USD 124.99</h6>
                    <p>You will be redirected to PayPal to complete the payment using credit card or debit card. There is an additional fee of USD 124.99 for this mode of payment.</p>
                  </div>
                  {
                    selected2?(
                      <img
                      onClick={()=>{
                        setselected2(false);
                        setmyalldata({...myalldata,pay_methode:''})
                      }}
                      style={{
                        cursor:'pointer',
                        width:'30px'
                      }} src={require("../../../../assets/img/blue.png")}/>
                    ):(
                      <button
                      onClick={(e)=>{
                        setselected2(true)
                        setmyalldata({...myalldata,pay_methode:"latter"})
                      }}
                    >
                      select
                    </button>
                    )
                  }
                </div>
              </div>
            </div>
            <div className='checkbox'>
              <input
                onClick={()=>{
                  setpaystatus(!paystatus)
                }}
              type="checkbox" name="" id="" />
              <p>I have read, I understand and accept the following quote under our terms and conditions. Service provided pursuant to this NRA is subject to Carriers governing rules tariff 025028-001, which is accessible at www.dpiusa.com in compliance with FMC Regulations as provided in 46 CFR 532.7.</p>
            </div>
            <button
              style={{
                cursor:!paystatus ? 'no-drop':'pointer',
                backgroundColor:!paystatus?'#dfe4ed':'rgb(11, 93, 151)'
              }}
            disabled={!paystatus} className='lastpay'>pay usd {item.total_money}</button>
          </React.Fragment> */
          null}
        </div>
        <div className="quote_order_service_right">
          <div>
            <div className="quote_order_service_right_title">
              Charge Summary (USD)
            </div>
            <div className="quote_order_service_origin">
              <h4>origin</h4>
              <h4>{item.total_money}</h4>
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
            <Link to="/contactus">Contact US</Link>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default QuoteOrder;
