import React, { useEffect, useState } from "react";
import "./quotedetails.css";
import { useLocation, useNavigate } from "react-router";
import lodash from "lodash/lodash";
import "./quotedetails.css";
import { Spin } from "antd";
// import TransportationMethods from '../../../Screens/Home/Transportation Methods/TransportationMethods';
import { AiOutlineCheck } from "react-icons/ai";
import { BsQuestion } from "react-icons/bs";
import axios from "axios";
const QuoteDetail = () => {
  const location = useLocation();
  const { item } = location.state;
  console.log(item);
  const [itemdata, setitemdata] = useState({});
  const [ratedata, setratedata] = useState([]);
  const [allrates, setallrates] = useState([]);
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
  const [rates, setrates] = useState([
    {
      from: "USOAK, Oakland",
      to: "EGEDK, El Dekheila",
      fromcount: "UNITED STATES",
      tocount: "EGYPT",
      num_day: "11",
      cotation_id: "12",
      valun: "08 jun 2023",
      estt: "36 days",
      total_money: "550",
      reats_data: [
        {
          reat_title: "ooo",
          reat_money: "2332",
        },
        {
          reat_title: "ooo",
          reat_money: "2332",
        },
        {
          reat_title: "ooo",
          reat_money: "2332",
        },
      ],
    },
    {
      from: "USOAK, Oakland",
      to: "EGEDK, El Dekheila",
      fromcount: "UNITED STATES",
      tocount: "EGYPT",
      num_day: "11",
      cotation_id: "12",
      valun: "08 jun 2023",
      estt: "36 days",
      total_money: "550",
      reats_data: [
        {
          reat_title: "ooo",
          reat_money: "2332",
        },
        {
          reat_title: "ooo",
          reat_money: "2332",
        },
        {
          reat_title: "ooo",
          reat_money: "2332",
        },
      ],
    },
    {
      from: "USOAK, Oakland",
      to: "EGEDK, El Dekheila",
      fromcount: "UNITED STATES",
      tocount: "EGYPT",
      num_day: "11",
      cotation_id: "12",
      valun: "08 jun 2023",
      estt: "36 days",
      total_money: "550",
      reats_data: [
        {
          reat_title: "ooo",
          reat_money: "2332",
        },
        {
          reat_title: "ooo",
          reat_money: "2332",
        },
        {
          reat_title: "ooo",
          reat_money: "2332",
        },
      ],
    },
    {
      from: "USOAK, Oakland",
      to: "EGEDK, El Dekheila",
      fromcount: "UNITED STATES",
      tocount: "EGYPT",
      num_day: "11",
      cotation_id: "12",
      valun: "08 jun 2023",
      estt: "36 days",
      total_money: "550",
      reats_data: [
        {
          reat_title: "ooo",
          reat_money: "2332",
        },
        {
          reat_title: "ooo",
          reat_money: "2332",
        },
        {
          reat_title: "ooo",
          reat_money: "2332",
        },
      ],
    },
    {
      from: "USOAK, Oakland",
      to: "EGEDK, El Dekheila",
      fromcount: "UNITED STATES",
      tocount: "EGYPT",
      num_day: "11",
      cotation_id: "12",
      valun: "08 jun 2023",
      estt: "36 days",
      total_money: "550",
      reats_data: [
        {
          reat_title: "ooo",
          reat_money: "2332",
        },
        {
          reat_title: "ooo",
          reat_money: "2332",
        },
        {
          reat_title: "ooo",
          reat_money: "2332",
        },
      ],
    },
  ]);
  const handleselect = (item) => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
      navigate("/dashboard/quoteorder", { state: { item: item } });
    }, 3000);
  };
  const handlegetrate = (id) => {
    const data_send = {
      cotation_id: item.cotation_id,
    };
    //console.log(data_send);
    axios
      .post(
        "https://camp-coding.tech/ocean_burg/user/select_container_reats.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        console.log(res.data.message);
        //console.log(res.data.message);
        setallrates(res.data.message);
      });
  };
  useEffect(() => {
    handlegetrate();
  }, []);
  return (
    <div className="quotedetials">
      <div className="quotedetials_filters">
        <select
          onChange={(e) => {
            searchType1(e.target.value);
          }}
        >
          <option value="volvo">lower price</option>
          <option value="lcl">fastest route</option>
        </select>
      </div>
      {/*<TransportationMethods />*/}
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
            {/*           {
            rates.map((item,index)=>{
              return(
                <div className='quotdet_rate' key={index}>
                  <div className='first_div'>
                    <div>
                      <h4>{item.from} {`${"<"}`} </h4>
                      <h4>{item.to}</h4>
                    </div>
                    <div>
                      <h4>valied untile</h4>
                      <h5>{item.valun}</h5>
                    </div>
                  </div>
                  <div className='second_div'>
                    <h4>
                      <img style={{
                        width:'20px'
                      }} src={require("../../../../assets/usa.jpg")} alt="" />
                      <span>{item.fromcount}</span>
                    </h4>
                    <h4>
                      <img  style={{
                        width:'20px'
                      }} src={require("../../../../assets/egypt.jpg")} alt="" />
                      <span>{item.tocount}</span>
                    </h4>
                  </div>
                  <h4>
                    USD{item.total_money}
                  </h4>
                  <div className='last_div'>
                    <div className="last_div_left">
                      <h5>FCL</h5>
                      <h5>Fastest</h5>
                      <h5>Cheapest</h5>
                      <h5>direct</h5>
                    </div>
                    <div className="last_div_right">
                      {
                        loading?(
                          <Spin/>
                        ):(
                          <button
                          onClick={()=>{
                            handleselect(item)
                          }}
                          >Select</button>
                        )
                      }
                    </div>
                  </div>
                </div>
              )
            })
          } */}
            {allrates.map((item, index) => {
              console.log(item);
              return (
                <div className="quotdet_rate" key={index}>
                  <div className="first_div">
                    <div>
                      <h4>{item.from} </h4>
                      <h4>{item.to}</h4>
                    </div>
                    <div>
                      <h4>valied untile</h4>
                      <h5>{item.valun}</h5>
                    </div>
                  </div>
                  <div className="second_div">
                    <h4>
                      <img
                        style={{
                          width: "20px",
                        }}
                        src={require("../../../img/usa.jpg")}
                        alt=""
                      />
                      <span>{item.fromcount}</span>
                    </h4>
                    <h4>
                      <img
                        style={{
                          width: "20px",
                        }}
                        src={require("../../../img/egypt.jpg")}
                        alt=""
                      />
                      <span>{item.tocount}</span>
                    </h4>
                  </div>
                  <h4>USD{item.total_money}</h4>
                  <div className="last_div">
                    <div className="last_div_left">
                      <h5>FCL</h5>
                      <h5>Fastest</h5>
                      <h5>Cheapest</h5>
                      <h5>direct</h5>
                    </div>
                    <div className="last_div_right">
                      {loading ? (
                        <Spin />
                      ) : (
                        <button
                          onClick={() => {
                            handleselect(item);
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

export default QuoteDetail;
