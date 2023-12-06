import React, { useContext, useState } from "react";
import "./regist.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { login as logged } from "../../../functions/add_cotation";

import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { CFormSelect } from "@coreui/react";
import { Select, Spin } from "antd";
import { AppContext } from "../context/AppContextProvider";
const Regist = () => {
  const location = useLocation();
  const { alldata = null } = location.state ? location.state : {};
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const [showpass, setshowpass] = useState(false);
  const [loading, setloading] = useState(false);
  const { login = null } = useContext(AppContext) || {};
  const [registdata, setregistdata] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_combany: "",
    phone: "",
    profile_identfy: "",
    shipments_last_year: "",
    next_shipments: "",
  });

  const handlesub = () => {
    if (registdata.profile_identfy == "") {
      toast("enter your profile identify");
      return;
    }
    if (registdata.user_name == "") {
      toast("enter your name");
      return;
    }
    if (registdata.user_password == "") {
      toast("enter your password");
      return;
    }
    if (registdata.user_email == "") {
      toast("enter your email");
      return;
    }
    if (registdata.phone == "") {
      toast("enter your phone");
      return;
    }
    if (registdata.shipments_last_year == "") {
      toast("enter your shipments last year");
      return;
    }
    if (registdata.next_shipments == "") {
      toast("enter your next shipments");
      return;
    }
    setloading(true);
    const data_send = {
      ...registdata,
    };
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/user/user_sign_up.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        //console.log(res)
        if (res.data.status === "success") {
          toast.success("SuccessFully Registeration");
          if (alldata !== undefined || alldata !== null) {
            axios
              .post(
                "https://camp-coding.tech/ocean_burg/user/add_cotation.php",
                JSON.stringify(alldata)
              )
              .then((reso) => {
                if (reso.data.status === "success") {
                  localStorage.setItem(
                    "myaccount",
                    JSON.stringify(res.data.message)
                  );
                  toast.success(reso.data.message);
                  window.location.href =
                    res.data.message.type == "admin"
                      ? "/dashboard"
                      : "/userdashboard";
                }
              });
          } else {
            localStorage.setItem("myaccount", JSON.stringify(res.data.message));
            window.location.href =
              res.data.message.type == "admin"
                ? "/dashboard"
                : "/userdashboard";
            toast.success(res.data.message);
            login(res.data.message);
          }
        } else if (res.data.status === "error") {
          toast.error(res.data.message);
        } else {
          toast.error("something is error try in another time");
        }
      })
      .finally(() => {
        setloading(false);
      });
  };
  const loggedIn = logged;
  return (
    <React.Fragment>
      {loggedIn.login ? (
        <Navigate
          to={loggedIn.user.type == "admin" ? "/dashboard" : "/userdashboard"}
        />
      ) : (
        <div className="search_page">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlesub();
            }}
          >
            <h3
              style={{
                color: "white",
              }}
            >
              Register with Ocean Burg
            </h3>
            <div className="log">
              <span>Already have an account?</span>
              <Link
                style={{
                  color: "white",
                }}
                to="/login"
              >
                Login here
              </Link>
            </div>
            <Select
              //value={registdata.profile_identfy}
              style={{
                width: "100%",
                marginBottom: 8,
                textAlign: "right",
              }}
              //placeholder="md"
              placeholder="enter your profile identify"
              onChange={(e) => {
                //console.log(e);
                setregistdata({ ...registdata, profile_identfy: e });
              }}
              options={[
                {
                  label: "business: import/export",
                  value: "business: import/export",
                },
                {
                  label: "international moving",
                  value: "international moving",
                },
                {
                  label: "i`m a Freight forward / cargo agent",
                  value: "i`m a Freight forward / cargo agent",
                },
              ]}
            />

            <div className="names">
              <input
                value={registdata.user_name}
                onChange={(e) => {
                  setregistdata({ ...registdata, user_name: e.target.value });
                }}
                type="text"
                placeholder="Full Name*"
              />
              <input
                value={registdata.user_combany}
                onChange={(e) => {
                  setregistdata({
                    ...registdata,
                    user_combany: e.target.value,
                  });
                }}
                type="text"
                placeholder="Company Name*"
              />
            </div>
            <div className="em_pass">
              <input
                value={registdata.user_email}
                onChange={(e) => {
                  setregistdata({ ...registdata, user_email: e.target.value });
                }}
                type="email"
                placeholder="work Email*"
              />
              <div className="password">
                <input
                  value={registdata.user_password}
                  onChange={(e) => {
                    setregistdata({
                      ...registdata,
                      user_password: e.target.value,
                    });
                  }}
                  type={`${showpass ? "text" : "password"}`}
                  placeholder="Password"
                />
                <span>
                  {showpass ? (
                    <AiFillEye
                      onClick={() => {
                        setshowpass(false);
                      }}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      onClick={() => {
                        setshowpass(true);
                      }}
                    />
                  )}
                </span>
              </div>
            </div>
            <span>A verification code will be sent to this email</span>
            <PhoneInput
              placeholder="Enter phone number"
              value={registdata.phone}
              onChange={(e) => {
                //console.log(e);
                setregistdata({ ...registdata, phone: e });
              }}
            />
            <Select
              //value={registdata.profile_identfy}
              style={{
                width: "100%",
                marginBottom: 8,
                textAlign: "right",
              }}
              //placeholder="md"
              placeholder="enter your last shipments"
              onChange={(e) => {
                //console.log(e);
                setregistdata({ ...registdata, shipments_last_year: e });
              }}
              options={[
                {
                  label: "it is my first import/export",
                  value: "it is my first import/export",
                },
                { label: "2 to 5", value: "2 to 5" },
                { label: "6 to 10", value: "6 to 10" },
                { label: "11 or more", value: "11 or more" },
              ]}
            />
            <Select
              placement="enter next shipment"
              style={{
                width: "100%",
                marginBottom: 8,
                textAlign: "right",
              }}
              //placeholder="md"
              placeholder="enter your next shipments"
              onChange={(e) => {
                //console.log(e);
                setregistdata({ ...registdata, next_shipments: e });
              }}
              options={[
                { label: "Ready Now", value: "Ready Now" },
                { label: "Ready in 2 weeks", value: "Ready in 2 weeks" },
                { label: "Ready after 2 weeks", value: "Ready after 2 weeks" },
              ]}
            />
            {/*       <div className="checkbox">
        <input type="checkbox"/>
        <span>Email me offers, pricing alerts & industry insights</span>
      </div>
      <div className="privacy">
      <h2>By submitting the form, you accept our
        <Link>
          Privacy Policy
        </Link>
      </h2>
      </div> */}
            {loading ? (
              <div style={{ textAlign: "center" }}>
                <Spin
                  style={{
                    color: "red",
                  }}
                />
              </div>
            ) : (
              <button>Create Free Account</button>
            )}
          </form>
        </div>
      )}
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
    </React.Fragment>
  );
};

export default Regist;
