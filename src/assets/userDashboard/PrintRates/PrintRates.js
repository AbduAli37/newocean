import React, { useEffect, useState } from 'react'
import './printrates.css'
import { useLocation, useNavigate } from 'react-router-dom'
const PrintRates = () => {
  const location=useLocation();
  const navigate=useNavigate();
  const [rates,setRates]=useState([]);
  console.log(location.state)

  const eqData=()=>{
    if(!location.state){
      navigate(-1)
    }
    setRates(location?.state?.selectedRates)
  }
  useEffect(()=>{
    eqData();
  },[])
  if(!location.state){
    navigate(-1)
  }
  return (
    <div className='printpage'>
      PrintRates
    </div>
  )
}

export default PrintRates
