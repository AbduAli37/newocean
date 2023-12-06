import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import "./login.css";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContextProvider";
import { Spin } from "antd";
import { login as logged } from "../../../functions/add_cotation";
const Login = () => {
  const location = useLocation();
  const { alldata = null } = location.state ? location.state : {};
  // console.log(location);
  const { login = null } = useContext(AppContext) || {};
  const navigate = useNavigate();
  // console.log(navigate);

  const [logdata, setlogdata] = useState({
    user_email: "",
    user_password: "",
  });
  const [showpass, setshowpass] = useState(false);
  const [loading, setloading] = useState(false);
  const handlesub = () => {
    if (logdata.user_email == "") {
      toast.error("enter your email");
      return;
    }
    if (logdata.user_password == "") {
      toast.error("enter your password");
      return;
    }
    const data_send = {
      ...logdata,
    };

    setloading(true);
    // console.log(data_send)
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/user/user_login.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        // console.log(res.data.message.user_id);
        // console.log(res.data);
        if (res.data.status == "success") {
          localStorage.setItem("login", true);
          localStorage.setItem("token", res.data.message.user_id);
          localStorage.setItem("myaccount", JSON.stringify(res.data.message));
          setloading(false);
          toast.success("Logged in succesfully");
          window.location.href =
            res.data.message.type == "admin" ? "/dashboard" : "/userdashboard";
          // console.log(alldata);
          if (alldata !== undefined || alldata !== null) {
            // axios
            //   .post(
            //     "https://camp-coding.tech/ocean_burg/user/add_cotation.php",
            //     JSON.stringify(alldata)
            //   )
            //   .then((reso) => {
            //     if (res.data.message == "success") {
            //     toast.success(res.data.message);
            //       window.location.href = (
            //         res.data.message.type == "admin" ? "/dashboard/quotes" : "/userdashboard/userquotes"
            //       );
            //       localStorage.setItem(
            //         "myaccount",
            //         JSON.stringify(res.data.message)
            //       );
            //       setloading(false);
            //     } else {
            //       setloading(false);
            //       toast.error(reso.data.message);
            //     }
            //   });
          } else {
            login(res.data.message);
            setloading(false);
            <Navigate
              to={
                res.data.message.type == "admin"
                  ? "/dashboard"
                  : "/userdashboard"
              }
            />;
          }
        } else if (res.data.status === "error") {
          setloading(false);
          toast.error(res.data.message);
        } else {
          setloading(false);
          toast.error("something is error try in another time");
        }
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
        <div className="login">
          <div className="login_img">
            <p>
              Oceanburg platform is very user-friendly and provides us with the
              ease of mind with their automated pre-alerts. We highly recommend
              their services and diligent follow-up on rates and shipment
              status.
            </p>
            <div className="logper">
              <img src={require("../../img/avtar.jpg")} alt="" />
              <div className="logper_details">
                <h4>Mohamed Salah</h4>
                <p>Sales Executive at Transworld GLS</p>
              </div>
            </div>
          </div>
          <div className="login_form">
            <h3>Welcome to Ocean Burg</h3>
            <p>
              <span>Don’t have an account?</span>
              <Link to="/regist" className="">
                Register Here
              </Link>
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlesub();
              }}
            >
              <div className="logemail">
                <span>Work Email*</span>
                <input
                  type="email"
                  value={logdata.user_email}
                  onChange={(e) => {
                    setlogdata({ ...logdata, user_email: e.target.value });
                  }}
                />
              </div>
              <div className="logpass">
                <span>password*</span>
                <input
                  value={logdata.user_password}
                  onChange={(e) => {
                    setlogdata({ ...logdata, user_password: e.target.value });
                  }}
                  type={`${showpass ? "text" : "password"}`}
                />
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
              </div>
              {loading ? (
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Spin />
                </div>
              ) : (
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Login
                </button>
              )}
              <div className="logfor">
                <Link>Forgot Password</Link>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={false}
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

export default Login;
