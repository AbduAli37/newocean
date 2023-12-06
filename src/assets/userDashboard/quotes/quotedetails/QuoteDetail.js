import React, { useEffect, useState } from "react";
import "./quotedetails.css";
import { useLocation, useNavigate } from "react-router";
import lodash from "lodash/lodash";
import "./quotedetails.css";
import { Spin } from "antd";
import TransportationMethods from "../../../Screens/Home/Transportation Methods/TransportationMethods";
import { AiOutlineCheck } from "react-icons/ai";
import { BsQuestion } from "react-icons/bs";
import axios from "axios";
import { flagdata } from "../../../../flagdata";
export const QuoteDetail = () => {
  const location = useLocation();
  const { item } = location.state;
  console.log(item);
  // console.log("reer")
  const [itemdata, setitemdata] = useState({});
  const [ratedata, setratedata] = useState([]);
  const [allrates, setallrates] = useState([]);
  const [orimgsrc,setoriimgsrc]=useState("")
  const [desimgsrc,setdesimgsrc]=useState("")
  const [originratedata, setoriginratedata] = useState([]);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const eqdata = () => {
    setitemdata(item);
  };
  function searchType1(e) {
    //setTable2SearchTxt(e);
    const formattedQuery = e.toLowerCase();
    const filteredData = lodash.filter(originratedata, (item) => {
      return contains1(item, formattedQuery);
    });
    setratedata(filteredData);
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
  const handleselect = (item,total_money,allrates) => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
      navigate("/userdashboard/userquoteorder", { state: { item: {...item,total_money,allrates} } });
    }, 2000);
  };
  const handlegetrate = (id) => {
    const data_send = {
      cotation_id: item.cotation_id,
    };
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/user/select_container_reats.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        console.log(res.data.message);
        setallrates(res.data.message);
      });
  };
  const getimgssrc=()=>{
    // console.log(item)
    let src = "";
    for (let i = 0; i < flagdata.length; i++) {
      if ((Array.isArray(item.ports_origin_data)?item.ports_origin_data[0].country:item.ports_origin_data.country) == flagdata[i].name) {
        const src = require("../../../img/flags/" +
          flagdata[i].code +
          ".svg");
          // console.log(src)
        setoriimgsrc(src);
      }
      if (((Array.isArray(item.ports_destination_data)?item.ports_destination_data[0].country:item.ports_destination_data.country) == flagdata[i].name)||(item.ports_destination_data.province == flagdata[i].name)) {
        const src2 = require("../../../img/flags/" +
          flagdata[i].code +
          ".svg");
          setdesimgsrc(src2);
      }
    }
  }
  useEffect(() => {
    getimgssrc()
    handlegetrate();
  }, []);
  return (
    <div className="quotedetials changequoteheight">
      {/* <div className="quotedetials_filters">
        <select
          onChange={(e) => {
            searchType1(e.target.value);
          }}
        >
          <option value="volvo">lower price</option>
          <option value="lcl">fastest route</option>
        </select>
      </div> */}
      <TransportationMethods />
      <div className="quotedetails_div">
        <div className="quotedetials_left">
          <div>
            <h5>Services Included</h5>
            <div className="quotedetials_left_type">
              <div>
                <AiOutlineCheck
                  style={{
                    color: "rgb(20, 178, 46)",
                  }}
                />
                <span>Origin</span>
              </div>
              <BsQuestion />
            </div>
            <div className="quotedetials_left_type">
              <div>
                <AiOutlineCheck
                  style={{
                    color: "rgb(20, 178, 46)",
                  }}
                />
                <span>International Freight</span>
              </div>
              <BsQuestion />
            </div>
            <h5>Services Not Included</h5>
            <div className="serv_not_include">
              <div>
                <span></span>
                <span>pickup</span>
                <span>add</span>
              </div>
              <BsQuestion />
            </div>
            <div className="serv_not_include">
              <div>
                <span></span>
                <span>pickup</span>
                <span>add</span>
              </div>
              <BsQuestion />
            </div>
            <div className="serv_not_include">
              <div>
                <span></span>
                <span>pickup</span>
                <span>add</span>
              </div>
              <BsQuestion />
            </div>
          </div>
          <div>
            <h4>Looking for assistance?</h4>
            <p>
              You can send us a message and one of our agents will get back to
              you shortly.
            </p>
            <button>contact us</button>
          </div>
        </div>
        <div className="quotedetials_right">
          <div className="quotdet_rates">
            {allrates.map((it, index) => {
              // console.log(item);
              return (
                <div className="quotdet_rate" key={index}>
                  {/* {console.log(it)} */}
                  <div className="first_div">
                    <div>
                      {/* {console.log(item.ports_origin_data)} */}
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
                    <div>
                      {/* {console.log(it)} */}
                      <h4>will arrive within</h4>
                      <h5>{it.num_day}days</h5>
                    </div>
                  </div>
                  <div className="second_div">
                    {/* <h4>
                      <img
                        style={{
                          width: "20px",
                        }}
                        src={orimgsrc}
                        alt=""
                      />
                      <span>{it.fromcount}</span>
                    </h4> */}
                    {/* <h4>
                      <img
                        style={{
                          width: "20px",
                        }}
                        src={desimgsrc}
                        alt=""
                      />
                      <span>{it.tocount}</span>
                    </h4> */}
                  </div>
                  <h4>{it.total_money} USD</h4>
                  <div className="last_div">
                    <div className="last_div_left">
                      <h5>{item.cargo}</h5>
                      {/* <h5>Fastest</h5>
                      <h5>Cheapest</h5>
                      <h5>direct</h5> */}
                    </div>
                    <div className="last_div_right">
                      {loading ? (
                        <Spin />
                      ) : (
                        <button
                          style={{ cursor:'pointer' }}
                          onClick={() => {
                            handleselect(item,it.total_money,it);
                            // console.log(item);
                          }}
                        >
                          Select
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

//export default QuoteDetail
