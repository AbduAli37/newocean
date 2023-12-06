import React, { useEffect, useState } from 'react'
import './booking.css'
import { useLocation } from 'react-router'
import { BsArrowRight } from 'react-icons/bs';
import { AiFillPhone, AiOutlineClose, AiOutlineMail } from 'react-icons/ai';
import PhoneInput from 'react-phone-number-input';
import {CiUser} from 'react-icons/ci'
import {MdWork} from 'react-icons/md'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
const Booking = () => {
  const [alladdress,setalladdress]=useState([]);
  const [addedaddress,setaddedaddress]=useState({
    full_name:'',
    company_name:'',
    tax_id:'',
    email:'',
    phone_num:'',
    countery:'',
    city:'',
    zip_code:'',
    address:'',
  })
  const [addressid,setaddressid]=useState("");
  const [addloading,setaddloading]=useState(false);
  const [pend_action1,setpend_action1]=useState(false);
  const [pend_actionall1,setpend_actionall1]=useState(false);
  const [pend_actionall2,setpend_actionall2]=useState(false);
  const [pend_actionall3,setpend_actionall3]=useState(false);
  const [pend_actionall4,setpend_actionall4]=useState(false);
  const [pend_actionall5,setpend_actionall5]=useState(false);

  const location=useLocation();
  const {data}=location.state;
  const pend_func1=()=>{
    return(
      <div className="pending_div">
      <div className='pending'>
      <h5>
        <span>Add New Address</span>
        <span
        onClick={()=>{
          setpend_action1(false);
        }}
        ><AiOutlineClose/></span>
      </h5>
      <form
        onSubmit={(e)=>{
          e.preventDefault();
          handleaddaddress();
        }}
      >
        <div>
          <input
            onChange={(e)=>{
              setaddedaddress({...addedaddress,full_name:e.target.value})
            }}
          type="text" placeholder='enter your full name'/>
          <input
          onChange={(e)=>{
            setaddedaddress({...addedaddress,company_name:e.target.value})
          }}
          type="text" placeholder='enter company name'/>
        </div>
        <div>
          <input
          onChange={(e)=>{
            setaddedaddress({...addedaddress,tax_id:e.target.value})
          }}
          type="text" placeholder='enter your tax id'/>
          <input
          onChange={(e)=>{
            setaddedaddress({...addedaddress,email:e.target.value})
          }}
          type="email" placeholder='enter company email'/>
        </div>
        <div>
          <PhoneInput
          onChange={(e)=>{
            setaddedaddress({...addedaddress,phone_num:e})
          }}
            placeholder="Enter phone number"
          />
          <input
          onChange={(e)=>{
            setaddedaddress({...addedaddress,countery:e.target.value})
          }}
          type="text" placeholder='enter company contry'/>
        </div>
        <div>
        <input
        onChange={(e)=>{
          setaddedaddress({...addedaddress,city:e.target.value})
        }}
        type="text" placeholder='enter your city'/>
        <input
        onChange={(e)=>{
          setaddedaddress({...addedaddress,zip_code:e.target.value})
        }}
        type="text" placeholder='enter zip code'/>
        </div>
        <input
        onChange={(e)=>{
          setaddedaddress({...addedaddress,address:e.target.value})
        }}
        type="text" placeholder='enter your address'/>
        <button style={{
          width:'100%'
        }} className='addbtn'
        >
          {
            addloading?(
              <Spin/>
            ):(
              'add'
            )
          }
        </button>
      </form>
    </div>
    </div>
    )
  }
  const pend_funcall1=()=>{
    return(
      <div className='pendingall_div'>
        <div className="pending_all">
        <div>
          <h4>Add Shipper Details</h4>
          <span><AiOutlineClose
          onClick={()=>{
            setpend_actionall1(false);
          }}
          /></span>
        </div>
        <div className='addresses'>
          {
            alladdress.filter(sh=>sh.type=="shipper").map((item,index)=>{
              return(
                <div className="address">
                <div className='address_person_details'>
                  <div>
                  <div>
                    <CiUser/>
                    <span>{item.full_name}</span>
                  </div>
                  <div>
                    <AiFillPhone/>
                    <span>{item.phone_num}</span>
                  </div>
                  <div>
                    <img style={{
                      width:'30px'
                    }} src={require("../../img/usa.jpg")} alt="" />
                    <span>{item.countery}</span>
                  </div>
                  </div>
                <div>
                <div>
                    <MdWork/>
                    <span>{item.company_name}</span>
                  </div>
                  <div>
                    <AiOutlineMail/>
                    <span>{item.email}</span>
                  </div>
                </div>
                </div>
                <div style={{
                  display:'flex',
                  flexDirection:'column',
                  gap:'10px'
                }}>
                  <button>Select</button>
                </div>
              </div>
              )
            })
          }
      </div>
        </div>
        <button
          onClick={()=>{
            setupdateshipper()
          }}
        className='save_btn'>save</button>
    </div>
    )
  }
  const pend_funcall2=()=>{
    return (
      <div className='pendingall_div'>
        <div className="pending_all">
        <h6 style={{
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
        }}>
          <span>Add Consignee Details</span>
          <AiOutlineClose
          style={{
            cursor:'pointer'
          }}
          onClick={()=>{
            setpend_actionall2(false);
          }}
          />
        </h6>
        <div style={{width:'100%'}}>
        <div className='addresses' style={{width:'100%'}}>
          {
            alladdress.filter(con=>con.type="consignee").map((item,index)=>{
              return(
                <div className="address">
                <div className='address_person_details'>
                  <div>
                  <div>
                    <CiUser/>
                    <span>{item.full_name}</span>
                  </div>
                  <div>
                    <AiFillPhone/>
                    <span>{item.phone_num}</span>
                  </div>
                  <div>
                    <img style={{
                      width:'30px'
                    }} src={require("../../img/usa.jpg")} alt="" />
                    <span>{item.countery}</span>
                  </div>
                  </div>
                <div>
                <div>
                    <MdWork/>
                    <span>{item.company_name}</span>
                  </div>
                  <div>
                    <AiOutlineMail/>
                    <span>{item.email}</span>
                  </div>
                </div>
                </div>
                <div style={{
                  display:'flex',
                  flexDirection:'column',
                  gap:'10px'
                }}>
                  {
                    item.selected?(
                      <img style={{
                        width:'30px'
                      }} src={require("../../img/check.png")} alt="" />
                    ):(
                      <button
                    onClick={()=>{
                      setaddressid(item.address_id)
                      let allData=[...alladdress]
                      setalladdress(
                        allData.map((innerItem)=>{
                          return item.address_id==innerItem.address_id?  {...innerItem,selected:true}:{...innerItem,selected:false}
                        })
                      )
                    }}
                  >Select</button>
                    )
                  }
                </div>
              </div>
              )
            })
          }
          <button
          onClick={()=>{
            updateconsignee();
          }}
          className='save_btn'>save</button>

      </div>
        </div>

        </div>
      </div>
    )
  }
  const pend_funcall3=()=>{
    return (
      <div className='pendingall_div'>
        <div className="pending_all">
        <h6 style={{
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
        }}>
          <span>Add pickup Details</span>
          <AiOutlineClose
          style={{
            cursor:'pointer'
          }}
          onClick={()=>{
            setpend_actionall3(false);
          }}
          />
        </h6>
        <div style={{width:'100%'}}>
        <div className='addresses' style={{width:'100%'}}>
          {
            alladdress.filter(pi=>pi.type="pickup").map((item,index)=>{
              return(
                <div className="address">
                <div className='address_person_details'>
                  <div>
                  <div>
                    <CiUser/>
                    <span>{item.full_name}</span>
                  </div>
                  <div>
                    <AiFillPhone/>
                    <span>{item.phone_num}</span>
                  </div>
                  <div>
                    <img style={{
                      width:'30px'
                    }} src={require("../../img/usa.jpg")} alt="" />
                    <span>{item.countery}</span>
                  </div>
                  </div>
                <div>
                <div>
                    <MdWork/>
                    <span>{item.company_name}</span>
                  </div>
                  <div>
                    <AiOutlineMail/>
                    <span>{item.email}</span>
                  </div>
                </div>
                </div>
                <div style={{
                  display:'flex',
                  flexDirection:'column',
                  gap:'10px'
                }}>
                  {
                    item.selected?(
                      <img style={{
                        width:'30px'
                      }} src={require("../../img/check.png")} alt="" />
                    ):(
                      <button
                    onClick={()=>{
                      setaddressid(item.address_id)
                      let allData=[...alladdress]
                      setalladdress(
                        allData.map((innerItem)=>{
                          return item.address_id==innerItem.address_id?  {...innerItem,selected:true}:{...innerItem,selected:false}
                        })
                      )
                    }}
                  >Select</button>
                    )
                  }
                </div>
              </div>
              )
            })
          }
          <button
          onClick={()=>{
            updatepickup();
          }}
          className='save_btn'>save</button>

      </div>
        </div>

        </div>
      </div>
    )
  }
  const pend_funcall4=()=>{
    return (
      <div className='pendingall_div'>
        <div className="pending_all">
        <h6 style={{
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
        }}>
          <span>Add delivary Details</span>
          <AiOutlineClose
          style={{
            cursor:'pointer'
          }}
          onClick={()=>{
            setpend_actionall4(false);
          }}
          />
        </h6>
        <div style={{width:'100%'}}>
        <div className='addresses' style={{width:'100%'}}>
          {
            alladdress.filter(de=>de.type=="delivary").map((item,index)=>{
              return(
                <div className="address">
                <div className='address_person_details'>
                  <div>
                  <div>
                    <CiUser/>
                    <span>{item.full_name}</span>
                  </div>
                  <div>
                    <AiFillPhone/>
                    <span>{item.phone_num}</span>
                  </div>
                  <div>
                    <img style={{
                      width:'30px'
                    }} src={require("../../img/usa.jpg")} alt="" />
                    <span>{item.countery}</span>
                  </div>
                  </div>
                <div>
                <div>
                    <MdWork/>
                    <span>{item.company_name}</span>
                  </div>
                  <div>
                    <AiOutlineMail/>
                    <span>{item.email}</span>
                  </div>
                </div>
                </div>
                <div style={{
                  display:'flex',
                  flexDirection:'column',
                  gap:'10px'
                }}>
                  {
                    item.selected?(
                      <img style={{
                        width:'30px'
                      }} src={require("../../img/check.png")} alt="" />
                    ):(
                      <button
                    onClick={()=>{
                      setaddressid(item.address_id)
                      let allData=[...alladdress]
                      setalladdress(
                        allData.map((innerItem)=>{
                          return item.address_id==innerItem.address_id?  {...innerItem,selected:true}:{...innerItem,selected:false}
                        })
                      )
                    }}
                  >Select</button>
                    )
                  }
                </div>
              </div>
              )
            })
          }
          <button
          onClick={()=>{
            updatedelivary();
          }}
          className='save_btn'>save</button>

      </div>
        </div>

        </div>
      </div>
    )
  }
  const pend_funcall5=()=>{
    return (
      <div className='pendingall_div'>
        <div className="pending_all">
        <h6 style={{
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
        }}>
          <span>Add notify Details</span>
          <AiOutlineClose
          style={{
            cursor:'pointer'
          }}
          onClick={()=>{
            setpend_actionall5(false);
          }}
          />
        </h6>
        <div style={{width:'100%'}}>
        <div className='addresses' style={{width:'100%'}}>
          {
            alladdress.filter(gg=>gg.type=="notify").map((item,index)=>{
              return(
                <div className="address">
                <div className='address_person_details'>
                  <div>
                  <div>
                    <CiUser/>
                    <span>{item.full_name}</span>
                  </div>
                  <div>
                    <AiFillPhone/>
                    <span>{item.phone_num}</span>
                  </div>
                  <div>
                    <img style={{
                      width:'30px'
                    }} src={require("../../img/usa.jpg")} alt="" />
                    <span>{item.countery}</span>
                  </div>
                  </div>
                <div>
                <div>
                    <MdWork/>
                    <span>{item.company_name}</span>
                  </div>
                  <div>
                    <AiOutlineMail/>
                    <span>{item.email}</span>
                  </div>
                </div>
                </div>
                <div style={{
                  display:'flex',
                  flexDirection:'column',
                  gap:'10px'
                }}>
                  {
                    item.selected?(
                      <img style={{
                        width:'30px'
                      }} src={require("../../img/check.png")} alt="" />
                    ):(
                      <button
                    onClick={()=>{
                      setaddressid(item.address_id)
                      let allData=[...alladdress]
                      setalladdress(
                        allData.map((innerItem)=>{
                          return item.address_id==innerItem.address_id?  {...innerItem,selected:true}:{...innerItem,selected:false}
                        })
                      )
                    }}
                  >Select</button>
                    )
                  }
                </div>
              </div>
              )
            })
          }
          <button
          onClick={()=>{
            updatenot();
          }}
          className='save_btn'>save</button>

      </div>
        </div>

        </div>
      </div>
    )
  }
  function renderall(){
    if(pend_action1){
      return pend_func1();
    }
  }
  function renderallall(){
    if(pend_actionall1){
      return pend_funcall1();
    }
    if(pend_actionall2){
      return pend_funcall2();
    }
    if(pend_actionall3){
      return pend_funcall3();
    }
    if(pend_actionall4){
      return pend_funcall4();
    }
    if(pend_actionall5){
      return pend_funcall5();
    }
  }
  const handleaddaddress=()=>{
    const data_send={
      order_id:data.order_id,
      ...addedaddress
    }
    setaddloading(true);
    axios.post("https://camp-coding.tech/ocean_burg/admin/add_address.php",JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status==="success"){
        setpend_action1(false)
        toast.success(res.data.message);
      }
      else if(res.data.status==="error"){
        toast.error(res.data.message);
      }
      else{
        toast.error("something went error");
      }
    }).finally(()=>{
      setaddloading(false);
    })
  }
  const getaddresses=()=>{
    axios.get("https://camp-coding.tech/ocean_burg/admin/get_all_addresses.php")
    .then((res)=>{
      // console.log(res.data.message)
      const alldata=[...res.data.message];
      const afetrloading=alldata.map((item,index)=>{
        return {...item,loading:false,selected:false};
      })
      setalladdress(afetrloading);
    })
  }
  useEffect(()=>{
    getaddresses()
  },[])
  const updateshipper=()=>{
    const data_send={

    }
  }
  const setupdateshipper=()=>{
    const data_send={
      order_id:data.order_id,
      shipper_details_id :addressid,
    }

    axios.post("https://camp-coding.tech/ocean_burg/admin/update_consignee_address.php",JSON.stringify(data_send))
    .then((res)=>{
      // console.log(res)
      if(res.data.status=="success"){
        toast.success(res.data.message);
      }
      else if(res.data.status=="error"){
        toast.error(res.data.message);
      }
      else{
        toast.error("something went error");
      }
    })
  }
  const updateconsignee=()=>{
    const data_send={
      order_id:data.order_id,
      shipper_details_id :addressid,
    }

    axios.post("https://camp-coding.tech/ocean_burg/admin/update_consignee_address.php",JSON.stringify(data_send))
    .then((res)=>{
      // console.log(res)
      if(res.data.status=="success"){
        toast.success(res.data.message);
      }
      else if(res.data.status=="error"){
        toast.error(res.data.message);
      }
      else{
        toast.error("something went error");
      }
    })
  }
  const updatepickup=()=>{
    const data_send={
      order_id:data.order_id,
      shipper_details_id :addressid,
    }

    axios.post("https://camp-coding.tech/ocean_burg/admin/update_consignee_address.php",JSON.stringify(data_send))
    .then((res)=>{
      // console.log(res)
      if(res.data.status=="success"){
        toast.success(res.data.message);
      }
      else if(res.data.status=="error"){
        toast.error(res.data.message);
      }
      else{
        toast.error("something went error");
      }
    })
  }
  const updatedelivary=()=>{
    const data_send={
      order_id:data.order_id,
      shipper_details_id :addressid,
    }

    axios.post("https://camp-coding.tech/ocean_burg/admin/update_consignee_address.php",JSON.stringify(data_send))
    .then((res)=>{
      // console.log(res)
      if(res.data.status=="success"){
        toast.success(res.data.message);
      }
      else if(res.data.status=="error"){
        toast.error(res.data.message);
      }
      else{
        toast.error("something went error");
      }
    })
  }
  const updatenot=()=>{
    const data_send={
      order_id:data.order_id,
      shipper_details_id :addressid,
    }

    axios.post("https://camp-coding.tech/ocean_burg/admin/update_consignee_address.php",JSON.stringify(data_send))
    .then((res)=>{
      // console.log(res)
      if(res.data.status=="success"){
        toast.success(res.data.message);
      }
      else if(res.data.status=="error"){
        toast.error(res.data.message);
      }
      else{
        toast.error("something went error");
      }
    })
  }
  return (
    <div className='container' style={{
      padding:'20px'
    }}>
      <div className='pend_actions'>
        <div className='pend_action'>
          <div>
            <span>1.</span>
            <h5>Add Shipper Details</h5>
          </div>
          <h6
            onClick={()=>{
              setpend_action1(true)
              setpend_actionall1(true)
            }}
          >
            <span>ADD</span>
            <BsArrowRight/>
          </h6>
        </div>
        <div className='pend_action'>
          <div>
            <span>2.</span>
            <h5> Add Consignee Details</h5>
          </div>
          <h6>
            <span
              onClick={()=>{
                setpend_actionall2(true);
                setpend_action1(true);
              }}
            >ADD</span>
            <BsArrowRight/>
          </h6>
        </div>
        <div className='pend_action'>
          <div>
            <span>3.</span>
            <h5>Add Pickup Address</h5>
          </div>
          <h6>
            <span
              onClick={()=>{
                setpend_actionall3(true);
                setpend_action1(true);
              }}
            >ADD</span>
            <BsArrowRight/>
          </h6>
        </div>
        <div className='pend_action'>
          <div>
            <span>4.</span>
            <h5>Add Delivery Address</h5>
          </div>
          <h6>
            <span
              onClick={()=>{
                setpend_actionall4(true);
                setpend_action1(true);
              }}
            >ADD</span>
            <BsArrowRight/>
          </h6>
        </div>
        <div className='pend_action'>
          <div>
            <span>5.</span>
            <h5>Add Notify Party Details</h5>
          </div>
          <h6>
            <span
              onClick={()=>{
                setpend_actionall5(true);
                setpend_action1(true);
              }}
            >ADD</span>
            <BsArrowRight/>
          </h6>
        </div>
        <div className='pend_action'>
          <div>
            <span>6.</span>
            <h5>Upload Documents</h5>
          </div>
          <h6>
            <span>ADD</span>
            <BsArrowRight/>
          </h6>
        </div>
        <div className='pend_action'>
          <div>
            <span>7.</span>
            <h5>Complete Payment</h5>
          </div>
          <h6>
            <span>ADD</span>
            <BsArrowRight/>
          </h6>
        </div>
      </div>
      {
        renderall()
      }
      {
        renderallall()
      }
    </div>
  )
}

export default Booking
